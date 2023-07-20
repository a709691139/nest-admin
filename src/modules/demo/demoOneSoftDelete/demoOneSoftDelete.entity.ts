import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CommonSoftDeleteEntity } from '@/common/dto/CommonEntity';

@Entity()
export class DemoOneSoftDelete extends CommonSoftDeleteEntity {
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
}
