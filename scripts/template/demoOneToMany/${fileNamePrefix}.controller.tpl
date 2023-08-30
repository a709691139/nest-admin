import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { <%= entityName  %>Service } from './<%= fileNamePrefix  %>.service';
import { <%= entityName %> } from './entity/<%= fileNamePrefix  %>.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/common/dto/ResponseWrap';
import {
  ApiPaginatedResponse,
  ApiResponseArrayWrap,
  ApiResponseWrap,
} from '@/common/decorator/swagger';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { createQueryWrapper } from '@/utils/query';
import { responseSuccess } from '@/utils/result';
import { NeedPermissions } from '@/common/decorator/NeedPermissions';

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
  @NeedPermissions('<%= tableName %>:page')
  async page(
    @Query('page') page: number,
    @Query('perPage') perPage: number, <%= isSoftDelete? "@Query('withDeleted') withDeleted: string," : '' %>
    @Query() query: <%= entityName %>,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    perPage = Number(perPage);
    const [data, total] = await this.<%= fileNamePrefix  %>Service.findAndCount(page, perPage, {
      ...createQueryWrapper(query),
      relations: ['items'],
      <%= isSoftDelete? "withDeleted: withDeleted === '1'," : "" %>
    });
    const pagination: Pagination<<%= entityName %>> = {
      data: data || [],
      page,
      perPage,
      total,
    };
    return responseSuccess(pagination);
  }

  @Post('/create')
  @NeedPermissions('<%= tableName %>:create')
  @ApiResponseWrap(<%= entityName %>)
  async create(@Body() dto: <%= entityName %>) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return responseSuccess(await this.<%= fileNamePrefix  %>Service.create(dto));
  }

  @Get('get')
  @NeedPermissions('<%= tableName %>:get')
  @ApiResponseWrap(<%= entityName %>)
  async findOne(@Query('id') id: string) {
    return responseSuccess(await this.<%= fileNamePrefix  %>Service.findOne(id));
  }

  @Post('/update')
  @NeedPermissions('<%= tableName %>:update')
  @ApiResponseWrap(<%= entityName %>)
  async update(@Body() dto: <%= entityName %>) {
    return responseSuccess(await this.<%= fileNamePrefix  %>Service.update(dto));
  }

  @Post('/remove/:id')
  @NeedPermissions('<%= tableName %>:remove')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.<%= fileNamePrefix  %>Service.remove(id));
  }

  @Post('/updateItems')
  @NeedPermissions('<%= tableName %>:update')
  @ApiResponseWrap()
  async updateItems(@Body() dto: <%= entityName %>) {
    return responseSuccess(await this.<%= fileNamePrefix  %>Service.updateItems(dto));
  }

}
