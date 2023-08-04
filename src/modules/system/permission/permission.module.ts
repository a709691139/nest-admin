import { Module, forwardRef } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { AppModule } from '@/app.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    forwardRef(() => AppModule),
  ],
  controllers: [PermissionController],
  providers: [PermissionService, HttpCommonDataProvider],
  exports: [PermissionService],
})
export class PermissionModule {}
