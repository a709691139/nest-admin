import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron('0 */5 * * * *', { name: 'queryRoles' })
  queryRoles() {
    this.logger.debug('queryRoles ' + '执行');
  }
}
