import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

/**
 * 每个http请求都有的唯一单例
 */
@Injectable({ scope: Scope.REQUEST })
export class HttpCommonDataProvider {
  public counter = 0;
  public tenantId = '';
  constructor(@Inject(REQUEST) private request) {
    console.log('HttpCommonDataProvider instantiated');
    this.tenantId =
      this.request.headers.tenantid || this.request.headers.tenantId || '001';
  }

  setTenantId(tenantId: string) {
    console.log('setTenantId', tenantId);
    this.tenantId = tenantId;
  }

  getTenantId() {
    return this.tenantId;
  }

  incrementCounter() {
    console.log('incrementCounter this.counter', this.counter);
    this.counter++;
  }

  getCounter() {
    return this.counter;
  }
}
