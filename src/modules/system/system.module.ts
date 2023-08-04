import { Module, forwardRef } from '@nestjs/common';
import { SystemController } from './system.controller';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AppModule } from '@/app.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PermissionModule,
    forwardRef(() => AppModule),
  ],
  controllers: [SystemController],
  providers: [],
  exports: [],
})
export class SystemModule {}
