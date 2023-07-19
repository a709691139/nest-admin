import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async loginSuccess(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      withDeleted: false,
    });
    console.log('configService', this.configService.get('appkey'));
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      this.configService.get('appkey'),
      {
        expiresIn: '30 days',
      },
    );
    await this.redis.set(
      'userToken:' + user.id,
      token,
      'EX',
      60 * 60 * 24 * 30,
    );
    return {
      userId: user.id,
      token,
      userInfo: user,
    };
  }
}
