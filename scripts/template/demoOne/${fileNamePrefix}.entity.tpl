import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateColumn, DateTimeColumn } from '@/utils/transform';
import { CommonEntity, CommonSoftDeleteEntity } from '@/common/dto/CommonEntity';

@Entity()
export class <%= entityName %> extends <%= isSoftDelete? 'CommonSoftDeleteEntity' :'CommonEntity' %> {
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
