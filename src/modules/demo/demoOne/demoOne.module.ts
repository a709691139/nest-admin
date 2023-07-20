import { Module } from '@nestjs/common';
import { DemoOneController } from './demoOne.controller';
import { DemoOneService } from './demoOne.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoOne } from './demoOne.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';

@Module({
  imports: [TypeOrmModule.forFeature([DemoOne])],
  controllers: [DemoOneController],
  providers: [DemoOneService, HttpCommonDataProvider],
})
export class DemoOneModule {}
