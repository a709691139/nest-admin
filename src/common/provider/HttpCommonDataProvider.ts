import { TokenData } from '@/common/dto/TokenData';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

/**
 * 每个http请求都有的唯一单例
 */
@Injectable({ scope: Scope.REQUEST })
export class HttpCommonDataProvider {
  public counter = 0;
  private tenantId = '';
  private tokenData = {} as TokenData;
  constructor(
    @Inject(REQUEST) private request,
    private readonly configService: ConfigService,
  ) {
    this.tenantId =
      this.request.headers.tenantid || this.request.headers.tenantId || '001';
    this.initTokenData();
    Logger.debug('HttpCommonDataProvider contructor');
  }

  setTenantId(tenantId: string) {
    // Logger.debug('setTenantId', tenantId);
    this.tenantId = tenantId;
  }

  getTenantId() {
    return this.tenantId;
  }

  incrementCounter() {
    Logger.debug('incrementCounter this.counter', this.counter);
    this.counter++;
  }

  getCounter() {
    return this.counter;
  }

  initTokenData() {
    const token = this.request.headers.token;
    if (token) {
      let tokenData = {} as TokenData;
      try {
        if (
          token === 'admin' &&
          ['development', 'test'].includes(this.configService.get('NODE_ENV'))
        ) {
          // 开发测试环境默认填admin全通过
          this.setTokenData({
            userId: 'admin',
            username: 'admin',
            roleIds: ['1', 'admin'],
          });
          return;
        }
        tokenData = jwt.verify(token, this.configService.get('appkey')) as any;
        this.setTokenData(tokenData);
        // console.log('initTokenData', tokenData);
      } catch (error) {}
    }
  }
  getTokenData() {
    return this.tokenData;
  }

  setTokenData(tokenData: TokenData) {
    this.tokenData = tokenData;
  }
}
