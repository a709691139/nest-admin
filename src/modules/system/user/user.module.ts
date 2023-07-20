import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { UserAuthService } from './userAuth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserAuthService, HttpCommonDataProvider],
})
export class UserModule {}
