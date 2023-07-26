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
  HttpException,
  HttpStatus,
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

    if (!notNeedLogin) {
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.token;
      if (!token) {
        throw new UnauthorizedException('未登陆');
      }

      // 解密数据
      let tokenData = {} as TokenData;
      if (
        token === 'admin' &&
        ['development', 'test'].includes(this.configService.get('NODE_ENV'))
      ) {
        // 开发测试环境默认填admin全通过
        return true;
      }
      try {
        tokenData = jwt.verify(token, this.configService.get('appkey')) as any;
        // Logger.debug('', tokenData);
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

      // TODO 获取角色判断权限
      const permissions = this.reflector.get<string[]>(
        'permissions',
        context.getHandler(),
      );
      if (permissions?.length) {
        // const request = context.switchToHttp().getRequest();
        const { roleIds } = tokenData;
        // 读取系统里存储的角色列表和权限列表
        throw new HttpException('接口权限不足', HttpStatus.FORBIDDEN);
      }
    }
    return true;
  }
}
