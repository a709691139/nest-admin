import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity()
export class DemoOne {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** 名称 */
  @ApiProperty({
    description: '名称',
  })
  @Column('varchar', { length: 200 })
  name: string;

  @ApiProperty()
  @Column({ type: 'int' })
  age: number;

  @ApiProperty()
  @Column({ type: 'decimal' })
  money: number;

  @ApiProperty()
  @Column({ type: 'date' })
  date1: Date;

  @ApiProperty()
  @Column({ type: 'datetime' })
  datetime1: Date;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  password: string;
}
