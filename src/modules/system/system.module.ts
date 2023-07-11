import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';

@Module({
  imports: [],
  controllers: [SystemController],
  providers: [],
})
export class SystemModule {}
