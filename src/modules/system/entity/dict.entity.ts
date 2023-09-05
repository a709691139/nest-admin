import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateColumn, DateTimeColumn } from '@/utils/transform';
import {
  CommonEntity,
  CommonSoftDeleteEntity,
} from '@/common/dto/CommonEntity';
import { DictItem } from './dictItem.entity';

/**
  系统字典表
*/
@Entity({ name: 'sys_dict' })
export class Dict extends CommonEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** 名称 */
  @ApiProperty({
    description: '名称',
    required: false,
  })
  @Column('varchar', { length: 100 })
  name: string;

  /** 编码 */
  @ApiProperty({
    description: '编码',
    required: false,
  })
  @Column('varchar', { length: 100 })
  code: string;

  /** 描述 */
  @ApiProperty({
    description: '描述',
    required: false,
  })
  @Column('varchar', { length: 255, nullable: true })
  desc: string;

  @OneToMany(() => DictItem, (dictItem) => dictItem.dict)
  items: DictItem[];
}
