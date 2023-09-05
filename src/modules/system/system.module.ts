import { Module, forwardRef } from '@nestjs/common';
import { SystemController } from './system.controller';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AppModule } from '@/app.module';
import { UploadController } from './upload.controller';
import { DictModule } from './dict/dict.module';
import { ImageCodeService } from './imageCode.service';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PermissionModule,
    DictModule,
    forwardRef(() => AppModule),
  ],
  controllers: [SystemController, UploadController],
  providers: [ImageCodeService],
  exports: [ImageCodeService],
})
export class SystemModule {}
