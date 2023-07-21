import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { <%= entityName  %>Service } from './<%= fileNamePrefix  %>.service';
import { <%= entityName %> } from './<%= fileNamePrefix  %>.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/common/dto/ResponseWrap';
import {
  ApiPaginatedResponse,
  ApiResponseWrap,
} from '@/common/decorator/swagger';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { createQueryWrapper } from '@/utils/query';
import { responseSuccess } from '@/utils/result';

@ApiTags('<%= name  %> <%= fileNamePrefix  %>')
@Controller('<%= fileNamePrefix  %>')
export class <%= entityName %>Controller {
  constructor(
    private readonly <%= fileNamePrefix  %>Service: <%= entityName %>Service,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  @Get('/page')
  @ApiPaginatedResponse(<%= entityName %>)
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  async page(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number, <%= isSoftDelete? "@Query('withDeleted') withDeleted: string," : '' %>
    @Query() query: <%= entityName %>,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    pageSize = Number(pageSize);
    const [data, total] = await this.<%= fileNamePrefix  %>Service.findAndCount(
      page,
      pageSize,
      {
        where: createQueryWrapper(query),
        <%= isSoftDelete? "withDeleted: withDeleted === '1'," : "" %>
      },
    );
    const pagination: Pagination<<%= entityName %>> = {
      data: data || [],
      page,
      pageSize,
      total,
    };
    return responseSuccess(pagination);
  }

  @Post('/create')
  @ApiResponseWrap(<%= entityName %>)
  async create(@Body() dto: <%= entityName %>) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return responseSuccess(await this.<%= fileNamePrefix  %>Service.create(dto));
  }

  @Get('get')
  @ApiResponseWrap(<%= entityName %>)
  async findOne(@Query('id') id: string) {
    return responseSuccess(await this.<%= fileNamePrefix  %>Service.findOne(id));
  }

  @Post('/update')
  @ApiResponseWrap(<%= entityName %>)
  async update(@Body() dto: <%= entityName %>) {
    return responseSuccess(await this.<%= fileNamePrefix  %>Service.update(dto.id, dto));
  }

  @Post('/remove/:id')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.<%= fileNamePrefix  %>Service.remove(id));
  }
}
