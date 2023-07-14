import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateColumn, DateTimeColumn } from '@/utils/transform';
import { CommonEntity } from '@/utils/commonEntity';
@Entity()
export class DemoOne extends CommonEntity {
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
