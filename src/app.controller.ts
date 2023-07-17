import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination, ResponseWrap } from './dto/ResponseWrap';
import { HttpCommonDataProvider } from './provider/HttpCommonDataProvider';

@ApiTags('app')
@ApiExtraModels(Pagination, ResponseWrap)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Inject()
  private readonly httpCommonDataProvider: HttpCommonDataProvider;

  count = 0;
  @ApiOperation({ summary: '简介', description: '说明' })
  @Get('/')
  async getHello() {
    this.httpCommonDataProvider.incrementCounter();
    console.log(
      'getHelloincrementCounter',
      this.httpCommonDataProvider.getCounter(),
    );
    this.count++;
    // console.log(`index1 / 当前进程的PID为：${process.pid}`, this.count);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // console.log('index1 count', this.count);
    return this.appService.getHello();
  }

  @ApiOperation({ summary: '简介', description: '说明' })
  @Get('/2')
  async getHello2() {
    this.count++;
    console.log(`index2 / 当前进程的PID为：${process.pid}`, this.count);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('index2 count', this.count);
    return this.appService.getHello();
  }
}
