import { Module, forwardRef } from '@nestjs/common';
import { SystemController } from './controller/system.controller';
import { AppModule } from '@/app.module';
import { UploadController } from './controller/upload.controller';
import { ImageCodeService } from './service/imageCode.service';
import { DictController } from './controller/dict.controller';
import { PermissionController } from './controller/permission.controller';
import { RoleController } from './controller/role.controller';
import { UserController } from './controller/user.controller';
import { DictService } from './service/dict.service';
import { PermissionService } from './service/permission.service';
import { RoleService } from './service/role.service';
import { UserService } from './service/user.service';
import { UserAuthService } from './service/userAuth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dict } from './entity/dict.entity';
import { DictItem } from './entity/dictItem.entity';
import { Permission } from './entity/permission.entity';
import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';

@Module({
  imports: [
    forwardRef(() => AppModule),
    TypeOrmModule.forFeature([Role, Dict, DictItem, Permission, User]),
  ],
  controllers: [
    SystemController,
    UploadController,
    DictController,
    PermissionController,
    RoleController,
    SystemController,
    UserController,
  ],
  providers: [
    HttpCommonDataProvider,
    ImageCodeService,
    DictService,
    PermissionService,
    RoleService,
    UserService,
    UserAuthService,
  ],
  exports: [ImageCodeService],
})
export class SystemModule {}
