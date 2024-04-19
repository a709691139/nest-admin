import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { DateTimeTransformer } from '../../utils/transform';

/**
 * 通用表字段
 */
@Entity()
export class CommonEntity {
  // @ApiProperty({ required: false })
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @Exclude()
  @Column('varchar', { length: 32, default: '001' })
  tenantId: string;

  @CreateDateColumn({ transformer: new DateTimeTransformer() })
  createdAt: string;

  @UpdateDateColumn({ transformer: new DateTimeTransformer() })
  updatedAt: string;
}

@Entity()
export class CommonSoftDeleteEntity extends CommonEntity {
  @DeleteDateColumn({ transformer: new DateTimeTransformer() })
  deletedAt: string;
}
