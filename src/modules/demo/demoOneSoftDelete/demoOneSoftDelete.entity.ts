import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity()
export class DemoOneSoftDelete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** 名称 */
  @ApiProperty({
    description: '名称',
  })
  @Column('varchar', { length: 200 })
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
