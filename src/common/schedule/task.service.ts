import { Role } from '@/modules/system/entity/role.entity';
import { Global, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GlobalDataService } from '../provider/GlobalDataService';

@Global()
@Injectable()
export class TaskService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectDataSource() private dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly globalDataService: GlobalDataService,
  ) {}

  private readonly logger = new Logger(TaskService.name);

  @Cron('0 */5 * * * *', { name: 'queryRoles' })
  async queryRoles() {
    this.logger.debug('queryRoles ' + '执行');
    // 查询全部角色并存入本地变量
    const entityManager = this.dataSource.manager;
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
