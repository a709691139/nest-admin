import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity } from '@/utils/commonEntity';

@Entity()
export class DemoOneSoftDelete extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** 名称 */
  @ApiProperty({
    description: '名称',
    required: false,
  })
  @Column('varchar', { length: 200 })
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
