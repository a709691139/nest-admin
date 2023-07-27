import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService, HttpCommonDataProvider],
  exports: [PermissionService],
})
export class PermissionModule {}
