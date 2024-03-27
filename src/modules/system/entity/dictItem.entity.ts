import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateColumn, DateTimeColumn } from '@/utils/transform';
import {
  CommonEntity,
  CommonSoftDeleteEntity,
} from '@/common/dto/CommonEntity';
import { Dict } from './dict.entity';

/**
  系统字典项表
*/
@Entity({ name: 'sys_dict_item' })
export class DictItem extends CommonEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** 字典id  */
  @ApiProperty({
    description: '字典id',
    required: false,
  })
  @Column('varchar', { length: 100, nullable: true })
  dictId: string;

  /** 名称 */
  @ApiProperty({
    description: '名称',
    required: false,
  })
  @Column('varchar', { length: 100 })
  label: string;

  /** 值 */
  @ApiProperty({
    description: '值',
    required: false,
  })
  @Column('varchar', { length: 100 })
  value: string;

  /** 描述 */
  @ApiProperty({
    description: '描述',
    required: false,
  })
  @Column('varchar', { length: 255, nullable: true })
  desc: string;

  /** 状态：0禁用 1启用 */
  @ApiProperty({
    description: '状态：0禁用 1启用',
    required: false,
  })
  @Column('varchar', {
    length: 1,
    nullable: true,
    comment: '状态：0禁用 1启用',
    default: '1',
  })
  status: string;

  /** 排序 */
  @ApiProperty({
    description: '排序',
    required: false,
  })
  @Column('double', { comment: '排序', nullable: true, default: 1 })
  sortNo: number;

  @ManyToOne(() => Dict, dict => dict.items)
  dict: Dict;
}
