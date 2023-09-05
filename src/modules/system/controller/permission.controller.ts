import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PermissionService } from '../service/permission.service';
import { Permission } from '../entity/permission.entity';
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
import { TaskService } from '@/common/schedule/task.service';
import { uniqBy } from 'lodash';
import { NotNeedLogin } from '@/common/decorator/NotNeedLogin';
import { NeedPermissions } from '@/common/decorator/NeedPermissions';
import { CreateButtonsReq } from '../dto/permission.dto';

@ApiTags('菜单权限表 sys_permission')
@Controller('sys_permission')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly httpCommonDataProvider: HttpCommonDataProvider,
    private readonly taskService: TaskService,
  ) {}

  @Get('/page')
  @ApiOperation({ summary: '获取系统默认菜单列表' })
  @ApiResponseArrayWrap(Permission)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @NotNeedLogin()
  async page(@Query() query: Permission) {
    query.tenantId = this.httpCommonDataProvider.getTenantId();
    query.id = query.id || '1';
    const entity = await this.permissionService.findOne(query);
    const res = await this.permissionService.findTree(entity);
    return responseSuccess([res]);
  }

  @Post('/create')
  @NeedPermissions('sys_permission:create')
  @ApiResponseWrap(Permission)
  async create(@Body() dto: Permission) {
    dto.tenantId = this.httpCommonDataProvider.getTenantId();
    if (dto.parentId) {
      dto.parent = new Permission();
      dto.parent.id = dto.parentId;
    }
    return responseSuccess(await this.permissionService.create(dto));
  }

  @Get('get')
  @ApiResponseWrap(Permission)
  @NeedPermissions('sys_permission:get')
  async findOne(@Query('id') id: string) {
    return responseSuccess(await this.permissionService.findOne({ id }));
  }

  @Post('/update')
  @ApiResponseWrap(Permission)
  @NeedPermissions('sys_permission:update')
  async update(@Body() dto: Permission) {
    if (dto.parentId) {
      dto.parent = new Permission();
      dto.parent.id = dto.parentId;
    }
    return responseSuccess(await this.permissionService.update(dto.id, dto));
  }

  @Post('/remove/:id')
  @NeedPermissions('sys_permission:remove')
  async remove(@Param('id') id: string) {
    return responseSuccess(await this.permissionService.remove(id));
  }

  @Post('/getCurrentUserPermissions')
  @ApiOperation({ summary: '获取个人的权限菜单，需前端自己转化树和权限code' })
  @ApiResponseArrayWrap(Permission)
  async getMyPermissions() {
    const { roleIds } = this.httpCommonDataProvider.getTokenData();
    const roles = this.taskService
      .getRoles()
      .filter((v) => roleIds.includes(v.id));
    let permissions: Permission[] = [];
    roles.forEach((v) => {
      permissions.push(...v.permissions);
    });
    permissions = uniqBy(permissions, 'id');
    return responseSuccess(permissions);
  }

  @Post('/createButtons')
  @ApiOperation({ summary: '创建多个按钮权限' })
  @NeedPermissions('sys_permission:create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiResponseWrap()
  async createButtons(@Body() req: CreateButtonsReq) {
    const { parentId, buttons } = req;
    const parent = new Permission();
    parent.id = parentId;
    const permissions = buttons.map((v) => {
      const item = new Permission();
      item.name = v.name;
      item.perms = v.perms;
      item.menuType = '2';
      item.tenantId = this.httpCommonDataProvider.getTenantId();
      item.parentId = parentId;
      item.parent = parent;
      return item;
    });
    console.log(buttons);
    return responseSuccess(await this.permissionService.creates(permissions));
  }
}
