import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DictService } from '../service/dict.service';
import { Dict } from '../entity/dict.entity';
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
import { NotNeedLogin } from '@/common/decorator/NotNeedLogin';
import { ItemDto } from '@/common/dto/ItemDto';

@ApiTags('系统字典表 dict')
@Controller('sys_dict')
export class DictController {
  constructor(
    private readonly dictService: DictService,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  @Get('/getAllDict')
  @ApiResponseArrayWrap(Dict)
  @ApiOperation({
    summary: '获取全部系统字典',
  })
  @NotNeedLogin()
  async getAllDict() {
    const resp = await this.dictService.findAll({
      where: {
        tenantId: this.httpCommonDataProvider.getTenantId(),
      },
      relations: ['items'],
      select: ['code', 'name', 'items'],
    });
    return responseSuccess(resp);
  }

  @Get('/page')
  @ApiPaginatedResponse(Dict)
  @NeedPermissions('sys_dict:page')
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  async page(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query() query: Dict,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    perPage = Number(perPage);
    const [data, total] = await this.dictService.findAndCount(page, perPage, {
      ...createQueryWrapper(query),
      relations: ['items'],
    });
    const pagination: Pagination<Dict> = {
      data: data || [],
      page,
      perPage,
      total,
    };
    return responseSuccess(pagination);
  }

  @Post('/create')
  @NeedPermissions('sys_dict:create')
  @ApiResponseWrap(Dict)
  async create(@Body() dto: Dict) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return responseSuccess(await this.dictService.create(dto));
  }

  @Get('get')
  @NeedPermissions('sys_dict:get')
  @ApiResponseWrap(Dict)
  async findOne(@Query('id') id: string) {
    return responseSuccess(await this.dictService.findOne(id));
  }

  @Post('/update')
  @NeedPermissions('sys_dict:update')
  @ApiResponseWrap(Dict)
  async update(@Body() dto: Dict) {
    return responseSuccess(await this.dictService.update(dto));
  }

  @Post('/remove/:id')
  @NeedPermissions('sys_dict:remove')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.dictService.remove(id));
  }

  @Post('/updateItems')
  @NeedPermissions('sys_dict:update')
  @ApiResponseWrap()
  async updateItems(@Body() dto: Dict) {
    return responseSuccess(await this.dictService.updateItems(dto));
  }

  @Get('/getItemsByCode/:code')
  @ApiResponseArrayWrap(ItemDto)
  async getItemsByCode(@Param('code') code: string) {
    return responseSuccess(await this.dictService.getItemsByCode(code));
  }
}
