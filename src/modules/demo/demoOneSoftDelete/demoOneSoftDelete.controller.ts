import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DemoOneSoftDeleteService } from './demoOneSoftDelete.service';
import { DemoOneSoftDelete } from './demoOneSoftDelete.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiPaginatedResponse,
  ApiResponseWrap,
} from '@/common/decorator/swagger';
import { Pagination } from '@/common/dto/ResponseWrap';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { createQueryWrapper } from '@/utils/query';
import { responseSuccess } from '@/utils/result';

@ApiTags('demoOneSoftDelete')
@Controller('demoOneSoftDelete')
export class DemoOneSoftDeleteController {
  constructor(
    private readonly demoOneSoftDeleteService: DemoOneSoftDeleteService,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  @Get('/page')
  @ApiPaginatedResponse(DemoOneSoftDelete)
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  async page(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query() query: DemoOneSoftDelete,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    pageSize = Number(pageSize);
    const [data, total] = await this.demoOneSoftDeleteService.findAndCount(
      page,
      pageSize,
      {
        where: createQueryWrapper(query),
      },
    );
    const pagination: Pagination<DemoOneSoftDelete> = {
      data: data || [],
      page,
      pageSize,
      total,
    };
    return responseSuccess(pagination);
  }

  @Post('/create')
  @ApiResponseWrap(DemoOneSoftDelete)
  async create(@Body() dto: DemoOneSoftDelete) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return responseSuccess(this.demoOneSoftDeleteService.create(dto));
  }

  @Get('get')
  @ApiResponseWrap(DemoOneSoftDelete)
  async findOne(@Query('id') id: string) {
    return responseSuccess(this.demoOneSoftDeleteService.findOne(id));
  }

  @Post('/update')
  @ApiResponseWrap(DemoOneSoftDelete)
  async update(@Body() dto: DemoOneSoftDelete) {
    return responseSuccess(this.demoOneSoftDeleteService.update(dto.id, dto));
  }

  @Post('/remove/:id')
  async remove(@Param('id') id: string) {
    return responseSuccess(this.demoOneSoftDeleteService.remove(id));
  }
}
