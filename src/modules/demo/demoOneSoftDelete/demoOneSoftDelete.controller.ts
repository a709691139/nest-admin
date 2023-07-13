import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Headers,
  Inject,
} from '@nestjs/common';
import { DemoOneSoftDeleteService } from './demoOneSoftDelete.service';
import { DemoOneSoftDelete } from './demoOneSoftDelete.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@/utils/swagger';
import { Pagination } from '@/dto/Pagination';
import { HttpCommonDataProvider } from '@/provider/HttpCommonDataProvider';
import { createQueryWrapper } from '@/utils/query';

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
    return pagination;
  }

  @Post('/create')
  async create(@Body() dto: DemoOneSoftDelete) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return this.demoOneSoftDeleteService.create(dto);
  }

  @Get('get')
  async findOne(@Query('id') id: string) {
    return this.demoOneSoftDeleteService.findOne(id);
  }

  @Post('/update')
  async update(@Body() dto: DemoOneSoftDelete) {
    return this.demoOneSoftDeleteService.update(dto.id, dto);
  }

  @Post('/remove/:id')
  async remove(@Param('id') id: string) {
    return this.demoOneSoftDeleteService.remove(id);
  }
}
