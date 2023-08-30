import { Module } from '@nestjs/common';
import { <%= entityName %>Controller } from './<%= fileNamePrefix%>.controller';
import { <%= entityName %>Service } from './<%= fileNamePrefix%>.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= entityName %> } from './entity/<%= fileNamePrefix%>.entity';
import { <%= sub.entityName %> } from './entity/<%= sub.fileNamePrefix%>.entity';
import { HttpCommonDataProvider } from '@/common/provider/HttpCommonDataProvider';

@Module({
  imports: [TypeOrmModule.forFeature([<%= entityName %>, <%= sub.entityName %>])],
  controllers: [<%= entityName %>Controller],
  providers: [<%= entityName %>Service, HttpCommonDataProvider],
})
export class <%= entityName %>Module {}
