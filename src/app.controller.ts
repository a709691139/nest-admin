import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from './dto/Pagination';

@ApiTags('app')
@ApiExtraModels(Pagination)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '简介', description: '说明' })
  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
}
