import { Module } from '@nestjs/common';
import { DemoOneSoftDeleteController } from './demoOneSoftDelete.controller';
import { DemoOneSoftDeleteService } from './demoOneSoftDelete.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoOneSoftDelete } from './demoOneSoftDelete.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';

@Module({
  imports: [TypeOrmModule.forFeature([DemoOneSoftDelete])],
  controllers: [DemoOneSoftDeleteController],
  providers: [DemoOneSoftDeleteService, HttpCommonDataProvider],
})
export class DemoOneSoftDeleteModule {}
