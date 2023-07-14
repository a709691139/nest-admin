import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DateTimeTransformer } from './transform';

/**
 * 通用表字段
 */
export class CommonEntity {
  @Exclude()
  @Column('varchar', { length: 32 })
  tenantId: string;

  @CreateDateColumn({ transformer: new DateTimeTransformer() })
  createdAt: Date;

  @UpdateDateColumn({ transformer: new DateTimeTransformer() })
  updatedAt: Date;
}
