import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authRequired = req.route?.stack[0]?.handle?.authRequired;
    if (authRequired) {
      // 鉴权逻辑，例如验证请求中的 token 或用户权限
      //   const isAuthenticated = ...; // 鉴权逻辑判断结果
      //   if (!isAuthenticated) {
      //     throw new UnauthorizedException('Unauthorized');
      //   }
    }
    next();
  }
}
