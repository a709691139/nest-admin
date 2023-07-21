import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/common/dto/ResponseWrap';
import {
  ApiPaginatedResponse,
  ApiResponseWrap,
} from '@/common/decorator/swagger';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { createQueryWrapper } from '@/utils/query';
import { responseSuccess } from '@/utils/result';

@ApiTags('菜单权限表 permission')
@Controller('permission')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  @Get('/page')
  @ApiPaginatedResponse(Permission)
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  async page(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query() query: Permission,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    pageSize = Number(pageSize);
    const [data, total] = await this.permissionService.findAndCount(
      page,
      pageSize,
      {
        where: createQueryWrapper(query),
      },
    );
    const pagination: Pagination<Permission> = {
      data: data || [],
      page,
      pageSize,
      total,
    };
    return responseSuccess(pagination);
  }

  @Post('/create')
  @ApiResponseWrap(Permission)
  async create(@Body() dto: Permission) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return responseSuccess(await this.permissionService.create(dto));
  }

  @Get('get')
  @ApiResponseWrap(Permission)
  async findOne(@Query('id') id: string) {
    return responseSuccess(await this.permissionService.findOne(id));
  }

  @Post('/update')
  @ApiResponseWrap(Permission)
  async update(@Body() dto: Permission) {
    return responseSuccess(await this.permissionService.update(dto.id, dto));
  }

  @Post('/remove/:id')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.permissionService.remove(id));
  }
}
