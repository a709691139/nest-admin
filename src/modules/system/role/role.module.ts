import { Module, forwardRef } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => PermissionModule),
  ],
  controllers: [RoleController],
  providers: [RoleService, HttpCommonDataProvider],
  exports: [RoleService],
})
export class RoleModule {}
