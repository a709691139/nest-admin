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
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { TaskService } from '../schedule/task.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
    private readonly taskService: TaskService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const notNeedLogin = this.reflector.get<boolean>(
      'notNeedLogin',
      context.getHandler(),
    );

    if (!this.taskService.getRoles().length) {
      throw new HttpException(
        '服务器初始化权限接口中，请耐心等待',
        HttpStatus.FORBIDDEN,
      );
    }

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
        Logger.debug('', tokenData);
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

      this.checkNeedPermission(context, tokenData);
    }

    return true;
  }

  checkNeedPermission(context: ExecutionContext, tokenData: TokenData) {
    // 获取角色判断权限
    const needPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (needPermissions?.length) {
      // 获取用户角色
      const { roleIds } = tokenData;
      if (!roleIds) {
        throw new HttpException('接口权限不足', HttpStatus.FORBIDDEN);
      }
      for (const roleId of roleIds) {
        const rolePermissions = this.taskService.getRolePermissions();
        if (rolePermissions[roleId]) {
          for (const needPermission of needPermissions) {
            if (rolePermissions[roleId][needPermission]) {
              return true;
            }
          }
        }
      }
      throw new HttpException('接口权限不足', HttpStatus.FORBIDDEN);
    }
  }
}
