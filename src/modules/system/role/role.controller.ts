import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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
import { PermissionService } from '../permission/permission.service';
import { In } from 'typeorm';
import { UpdateRolePermissionDto } from './role.dto';
import { NeedPermissions } from '@/common/decorator/NeedPermissions';

@ApiTags('角色表 role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
    private readonly permissionService: PermissionService,
  ) {}

  @Get('/page')
  @NeedPermissions('sys_role:page')
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
      relations: ['permissions'],
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
  @NeedPermissions('sys_role:create')
  @ApiResponseWrap(Role)
  async create(@Body() dto: Role) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    if (dto.permissions.length) {
      console.log('query', dto.permissions);
      const permissions = await this.permissionService.findAll({
        where: { id: In(dto.permissions.map((v) => v.id)) },
      });
      console.log('permissions', permissions);
      dto.permissions = permissions;
    }
    return responseSuccess(await this.roleService.create(dto));
  }

  @Get('get')
  @ApiResponseWrap(Role)
  async findOne(@Query('id') id: string) {
    return responseSuccess(await this.roleService.findOne(id));
  }

  @Post('/update')
  @NeedPermissions('sys_role:update')
  @ApiResponseWrap(Role)
  async update(@Body() dto: Role) {
    return responseSuccess(await this.roleService.update(dto.id, dto));
  }

  @Post('/updateNeedPermissions')
  @NeedPermissions('sys_role:update:permissions')
  @ApiResponseWrap(Role)
  async updateNeedPermissions(@Body() dto: UpdateRolePermissionDto) {
    const role = {
      id: dto.id,
    } as Role;
    const permissions = await this.permissionService.findAll({
      where: { id: In(dto.permissionIds) },
    });
    role.permissions = permissions;
    return responseSuccess(await this.roleService.update(dto.id, role));
  }

  @Post('/remove/:id')
  @NeedPermissions('sys_role:remove')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.roleService.remove(id));
  }
}
