import { Module, forwardRef } from '@nestjs/common';
import { SystemController } from './system.controller';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AppModule } from '@/app.module';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PermissionModule,
    forwardRef(() => AppModule),
  ],
  controllers: [SystemController, UploadController],
  providers: [],
  exports: [],
})
export class SystemModule {}
