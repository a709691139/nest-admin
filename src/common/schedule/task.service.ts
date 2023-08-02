import { Role } from '@/modules/system/role/role.entity';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectConnection() private connection: Connection,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(TaskService.name);

  roles: Role[] = [];
  /** 角色权限map：只含按钮权限 */
  rolePermissions: { [roleId: string]: { [perms: string]: boolean } } = {};

  @Cron('0 */5 * * * *', { name: 'queryRoles' })
  async queryRoles() {
    this.logger.debug('queryRoles ' + '执行');
    // 查询全部角色并存入本地变量
    const entityManager = this.connection.manager;
    const roles = await entityManager.find(Role, {
      select: ['id', 'name', 'tenantId'],
      relations: ['permissions'],
    });
    this.roles = roles;
    roles.forEach((role) => {
      this.rolePermissions[role.id] = {};
      role.permissions.forEach((permission) => {
        if (permission.menuType === '2') {
          this.rolePermissions[role.id][permission.perms] = true;
        }
      });
    });
  }
}
