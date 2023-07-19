import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [SystemController],
  providers: [],
})
export class SystemModule {}
