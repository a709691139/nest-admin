import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ValueTransformer,
} from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import {
  DateColumn,
  DateTimeColumn,
  DateTimeTransformer,
  DateTransformer,
} from '@/utils/transform';

@Entity()
export class DemoOne {
  @Exclude()
  @Column('varchar', { length: 32 })
  tenantId: string;

  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** 名称 */
  @ApiProperty({
    description: '名称',
    required: false,
  })
  @Column('varchar', { length: 200 })
  name: string;

  @ApiProperty({
    required: false,
    type: 'string',
    oneOf: [{ type: 'number' }, { type: 'string' }],
  })
  @Column({ type: 'int', nullable: false })
  age: number;

  @ApiProperty({ required: false })
  @Column({ type: 'decimal', nullable: false })
  momeny: number;

  @ApiProperty({ required: false })
  @DateColumn({ nullable: true })
  date1: string;

  @ApiProperty({ required: false })
  @DateTimeColumn({ nullable: true })
  datetime1: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  password: string;
}
