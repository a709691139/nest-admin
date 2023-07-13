import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity()
export class DemoOneSoftDelete {
  @Exclude()
  @Column('varchar', { length: 32 })
  tenantId: string;

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
