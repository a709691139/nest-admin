import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/common/dto/ResponseWrap';
import {
  ApiPaginatedResponse,
  ApiResponseWrap,
} from '@/common/decorator/swagger';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { createQueryWrapper } from '@/utils/query';
import { responseSuccess } from '@/utils/result';

@ApiTags('角色表 role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
  ) {}

  @Get('/page')
  @ApiPaginatedResponse(Role)
  @ApiOperation({
    summary: '分页查询',
    description: '分页查询',
  })
  async page(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query() query: Role,
  ) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    page = Number(page);
    pageSize = Number(pageSize);
    const [data, total] = await this.roleService.findAndCount(page, pageSize, {
      where: createQueryWrapper(query),
    });
    const pagination: Pagination<Role> = {
      data: data || [],
      page,
      pageSize,
      total,
    };
    return responseSuccess(pagination);
  }

  @Post('/create')
  @ApiResponseWrap(Role)
  async create(@Body() dto: Role) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    return responseSuccess(await this.roleService.create(dto));
  }

  @Get('get')
  @ApiResponseWrap(Role)
  async findOne(@Query('id') id: string) {
    return responseSuccess(await this.roleService.findOne(id));
  }

  @Post('/update')
  @ApiResponseWrap(Role)
  async update(@Body() dto: Role) {
    return responseSuccess(await this.roleService.update(dto.id, dto));
  }

  @Post('/remove/:id')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.roleService.remove(id));
  }
}
