import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestInterceptor implements NestInterceptor {
  constructor() {
    // console.log('RequestInterceptor constructor');
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    // const request = context.switchToHttp().getRequest();
    // 存储请求头为全局变量
    // console.log('pre header', request.headers);
    // this.httpCommonDataProvider.setTenantId(
    //   request.headers.tenantid || request.headers.tenantId || '',
    // );
    return next.handle();
  }
}
