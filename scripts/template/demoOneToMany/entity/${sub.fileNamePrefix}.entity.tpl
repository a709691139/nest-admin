import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateColumn, DateTimeColumn } from '@/utils/transform';
import {
  CommonEntity,
  CommonSoftDeleteEntity,
} from '@/common/dto/CommonEntity';
import { <%= entityName %> } from './<%= fileNamePrefix %>.entity';

/**
  <%= sub.name %>
*/
@Entity({ name: '<%= sub.tableName %>' })
export class <%= sub.entityName %> extends CommonEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    required: false,
  })
  @Column('varchar', { length: 100, nullable: true })
  <%= fileNamePrefix %>Id: string;

  @ManyToOne(() => <%= entityName %>, (parent) => parent.items)
  dict: <%= entityName %>;
}
