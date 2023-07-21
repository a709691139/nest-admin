import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateColumn, DateTimeColumn } from '@/utils/transform';
import {
  CommonEntity,
  CommonSoftDeleteEntity,
} from '@/common/dto/CommonEntity';

/**
  菜单权限表
*/
@Entity({ name: 'sys_permission' })
export class Permission extends CommonEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'parentId',
    required: false,
  })
  @Column('varchar', { length: 36, nullable: true })
  parentId: string;

  /** 名称 */
  @ApiProperty({
    description: '名称',
    required: false,
  })
  @Column('varchar', { length: 100, comment: '名称' })
  name: string;

  /** 描述 */
  @ApiProperty({
    description: '描述',
    required: false,
  })
  @Column('varchar', { length: 255, comment: '描述' })
  desc: string;

  /** 路径 */
  @ApiProperty({
    description: '路径',
    required: false,
  })
  @Column('varchar', { length: 255 })
  url: string;

  /** 前端组件名 */
  @ApiProperty({
    description: '前端组件名',
    required: false,
  })
  @Column('varchar', { length: 255, comment: '前端组件名' })
  component: string;

  /** 菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限) */
  @ApiProperty({
    description: '菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限)',
    required: false,
  })
  @Column('varchar', {
    length: 1,
    comment: '菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限)',
  })
  menuType: string;

  /** 菜单权限编码 */
  @ApiProperty({
    description: '菜单权限编码',
    required: false,
  })
  @Column('varchar', { length: 255, comment: '菜单权限编码' })
  perms: string;

  /** 菜单排序 */
  @ApiProperty({
    description: '菜单排序',
    required: false,
  })
  @Column('double', { comment: '菜单排序' })
  sortNo: number;

  /** 菜单图标 */
  @ApiProperty({
    description: '菜单图标',
    required: false,
  })
  @Column('varchar', { length: 100, comment: '菜单图标' })
  icon: string;

  /** 是否缓存路由 */
  @ApiProperty({
    description: '是否缓存路由',
    required: false,
  })
  @Column('varchar', { length: 1, comment: '是否缓存路由' })
  isKeepAlive: string;

  /** 是否隐藏路由 */
  @ApiProperty({
    description: '是否隐藏路由',
    required: false,
  })
  @Column('varchar', { length: 1, comment: '是否隐藏路由' })
  isHidden: string;
}
