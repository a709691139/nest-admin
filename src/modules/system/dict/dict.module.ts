import { Module } from '@nestjs/common';
import { DictController } from './dict.controller';
import { DictService } from './dict.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dict } from './entity/dict.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';
import { DictItem } from './entity/dictItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dict, DictItem])],
  controllers: [DictController],
  providers: [DictService, HttpCommonDataProvider],
})
export class DictModule {}
