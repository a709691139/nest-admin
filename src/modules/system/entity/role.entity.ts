import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateColumn, DateTimeColumn } from '@/utils/transform';
import {
  CommonEntity,
  CommonSoftDeleteEntity,
} from '@/common/dto/CommonEntity';
import { Permission } from './permission.entity';

/**
  角色表
*/
@Entity({ name: 'sys_role' })
export class Role extends CommonSoftDeleteEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** 名称 */
  @ApiProperty({
    description: '名称',
    required: false,
  })
  @Column('varchar', { length: 32, nullable: true })
  name: string;

  /** 编码 */
  @ApiProperty({
    description: '编码',
    required: false,
  })
  @Column('varchar', { length: 32, nullable: false, unique: true })
  code: string;

  /** 描述 */
  @ApiProperty({
    description: '描述',
    required: false,
  })
  @Column('varchar', { length: 32, nullable: true })
  desc: string;

  /** 菜单权限列表 */
  @ApiProperty({
    description: '菜单权限列表',
    required: false,
    type: [Permission],
  })
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'sys_role_sys_permission_relate',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
