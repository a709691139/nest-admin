import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import * as bcryptjs from 'bcryptjs';
import { TokenData } from '@/common/dto/TokenData';

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
      relations: ['roles'],
    });
    const seconds = 60 * 60 * 24 * 30;

    const tokenData: TokenData = {
      userId: user.id,
      username: user.username,
      roleIds: user.roles.map(role => role.id),
    };
    const token = jwt.sign(tokenData, this.configService.get('appkey'), {
      expiresIn: seconds,
    });
    await this.redis.set('userToken:' + user.id, token, 'EX', seconds);
    return {
      userId: user.id,
      token,
      userInfo: user,
    };
  }

  async logout(userId: string) {
    await this.redis.del('userToken:' + userId);
  }

  /** 密码加密 */
  encryptPassword(originPassword) {
    const salt = bcryptjs.genSaltSync(10);
    const password = bcryptjs.hashSync(originPassword, salt);
    return password;
  }

  /** 对比原加密密码 */
  validateCryptPassword(originPassword: string, password: string) {
    return bcryptjs.compareSync(originPassword, password);
  }

  async checkIsValidPassword(
    userId: string,
    originPassword: string,
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['password'],
    });
    return this.validateCryptPassword(originPassword, user.password);
  }

  async resetUserPassword(userId: string, originPassword: string) {
    return await this.userRepository.update(userId, {
      password: this.encryptPassword(originPassword),
    });
  }
}
