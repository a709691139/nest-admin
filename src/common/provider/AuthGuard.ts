import { TokenData } from '@/common/dto/TokenData';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
  Inject,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const notNeedLogin = this.reflector.get<boolean>(
      'notNeedLogin',
      context.getHandler(),
    );
    // TODO 获取角色判断权限
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // const request = context.switchToHttp().getRequest();
    // throw new UnauthorizedException();
    if (!notNeedLogin) {
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.token;
      if (!token) {
        throw new UnauthorizedException('未登陆');
      }
      // 解密数据
      let tokenData = {} as TokenData;
      try {
        tokenData = jwt.verify(token, this.configService.get('appkey')) as any;
        Logger.debug('tokenData', tokenData);
      } catch (error) {
        Logger.debug(error.message);
        throw new UnauthorizedException('token失效');
      }
      const { userId } = tokenData;
      if (!userId) {
        throw new UnauthorizedException('Unauthorized');
      }
      const sessionToken = await this.redis.get('userToken:' + userId);
      if (token !== sessionToken) {
        throw new UnauthorizedException('token失效');
      }
    }
    return true;
  }
}
