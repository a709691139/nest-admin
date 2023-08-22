import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    console.log('exception：', exception);
    console.log('exception msg：', exception.message || exception.msg);
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    response.status(200).json({
      status: status,
      msg: exception.message || exception.msg || 'Internal server error',
    });
  }
}
