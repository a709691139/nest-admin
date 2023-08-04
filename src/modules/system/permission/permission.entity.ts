import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TreeChildren,
  TreeParent,
  Tree,
} from 'typeorm';
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
@Tree('nested-set')
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
  @Column('varchar', { length: 255, comment: '描述', nullable: true })
  desc: string;

  /** 路径 */
  @ApiProperty({
    description: '路径',
    required: false,
  })
  @Column('varchar', { length: 255, nullable: true })
  url: string;

  /** 前端组件名 */
  @ApiProperty({
    description: '前端组件名',
    required: false,
  })
  @Column('varchar', { length: 255, comment: '前端组件名', nullable: true })
  component: string;

  /** 菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限) */
  @ApiProperty({
    description: '菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限)',
    required: false,
  })
  @Column('varchar', {
    length: 1,
    comment: '菜单类型 (0:一级菜单; 1:子菜单:2:按钮权限)',
    default: '0',
  })
  menuType: string;

  /** 菜单权限编码 */
  @ApiProperty({
    description: '菜单权限编码',
    required: false,
  })
  @Column('varchar', { length: 255, comment: '菜单权限编码', nullable: true })
  perms: string;

  /** 菜单排序 */
  @ApiProperty({
    description: '菜单排序',
    required: false,
  })
  @Column('double', { comment: '菜单排序', nullable: true, default: 1 })
  sortNo: number;

  /** 菜单图标 */
  @ApiProperty({
    description: '菜单图标',
    required: false,
  })
  @Column('varchar', { length: 100, comment: '菜单图标', nullable: true })
  icon: string;

  /** 是否缓存路由 */
  @ApiProperty({
    description: '是否缓存路由',
    required: false,
  })
  @Column('varchar', { length: 1, comment: '是否缓存路由', default: '0' })
  isKeepAlive: string;

  /** 是否隐藏路由 */
  @ApiProperty({
    description: '是否隐藏路由',
    required: false,
  })
  @Column('varchar', { length: 1, comment: '是否隐藏路由', default: '0' })
  isHidden: string;

  /** 跳转地址 */
  @ApiProperty({
    description: '跳转地址',
    required: false,
  })
  @Column('varchar', { length: 255, comment: '跳转地址', nullable: true })
  redirect: string;

  @ApiProperty({
    required: false,
    type: [Permission],
  })
  @TreeChildren()
  children: Permission[];
  @TreeParent()
  parent: Permission;
}
