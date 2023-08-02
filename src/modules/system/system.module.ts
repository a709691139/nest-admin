import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [UserModule, RoleModule, PermissionModule],
  controllers: [SystemController],
  providers: [],
  exports: [],
})
export class SystemModule {}
