import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateColumn, DateTimeColumn } from '@/utils/transform';
import {
  CommonEntity,
  CommonSoftDeleteEntity,
} from '@/common/dto/CommonEntity';

/**
  配置表
*/
@Entity({ name: 'sys_config' })
export class SystemConfig extends CommonEntity {
  /** 唯一编码 */
  @ApiProperty({ required: false })
  @PrimaryColumn('varchar', { length: 100, comment: '唯一编码' })
  id: string;

  /** 名称 */
  @ApiProperty({
    description: '名称',
    required: true,
  })
  @Column('varchar', { length: 50, nullable: false })
  name: string;

  /** 描述 */
  @ApiProperty({
    description: '描述',
    required: false,
  })
  @Column('varchar', { length: 200, nullable: true })
  desc: string;

  /** data */
  @ApiProperty({
    description: 'data',
    required: false,
  })
  @Column('text', { nullable: true })
  data: string;
}
