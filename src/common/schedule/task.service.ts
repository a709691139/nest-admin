import { Role } from '@/modules/system/entity/role.entity';
import { Global, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { GlobalDataService } from '../provider/GlobalDataService';

@Global()
@Injectable()
export class TaskService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectConnection() private connection: Connection,
    private readonly configService: ConfigService,
    private readonly globalDataService: GlobalDataService,
  ) {
    Logger.debug('TaskService constructor');
  }

  private readonly logger = new Logger(TaskService.name);

  @Cron('0 */5 * * * *', { name: 'queryRoles' })
  async queryRoles() {
    this.logger.debug('queryRoles ' + '执行');
    // 查询全部角色并存入本地变量
    const entityManager = this.connection.manager;
    const roles = await entityManager.find(Role, {
      select: ['id', 'name', 'tenantId'],
      relations: ['permissions'],
    });
    const rolePermissions: any = {};
    roles.forEach(role => {
      rolePermissions[role.id] = {};
      role.permissions.forEach(permission => {
        if (permission.menuType === '2') {
          rolePermissions[role.id][permission.perms] = true;
        }
      });
    });
    this.globalDataService.setRoles(roles);
    this.globalDataService.setRolePermissions(rolePermissions);
  }
}
