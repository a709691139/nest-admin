import { Module } from '@nestjs/common';
import { DemoOneController } from './demoOne/demoOne.controller';
import { DemoOneService } from './demoOne/demoOne.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoOne } from './demoOne/demoOne.entity';
import { DemoOneSoftDeleteService } from './demoOneSoftDelete/demoOneSoftDelete.service';
import { DemoOneSoftDelete } from './demoOneSoftDelete/demoOneSoftDelete.entity';
import { DemoOneSoftDeleteController } from './demoOneSoftDelete/demoOneSoftDelete.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DemoOne, DemoOneSoftDelete])],
  controllers: [DemoOneController, DemoOneSoftDeleteController],
  providers: [DemoOneService, DemoOneSoftDeleteService],
})
export class DemoModule {}
