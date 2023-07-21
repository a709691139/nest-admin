import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateColumn, DateTimeColumn } from '@/utils/transform';
import { CommonSoftDeleteEntity } from '@/common/dto/CommonEntity';
import * as bcryptjs from 'bcryptjs';

/**
 * 系统用户
 */
@Entity({ name: 'sys_user' })
@Unique(['workNo', 'tenantId'])
@Unique(['username', 'tenantId'])
@Unique(['email', 'tenantId'])
@Unique(['phone', 'tenantId'])
export class User extends CommonSoftDeleteEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** 名称 */
  @ApiProperty({
    description: '账号名',
    required: false,
  })
  @Column('varchar', { length: 200, nullable: true })
  username: string;

  @ApiProperty({ required: false })
  @Column('varchar', { length: 64, nullable: true, comment: '邮箱地址' })
  email: string;

  @ApiProperty({ required: false })
  @Column('varchar', {
    length: 20,
    unique: true,
    comment: '手机',
    nullable: true,
  })
  phone: string;

  @ApiProperty({ required: false })
  @Column('varchar', {
    length: 150,
    unique: true,
    comment: '头像',
    nullable: true,
  })
  avatar: string;

  @ApiProperty({ required: false })
  @Column('varchar', {
    length: 150,
    comment: '别名',
    nullable: true,
  })
  alias: string;

  @ApiProperty({ required: false })
  @Column('varchar', {
    length: 1,
    comment: '性别 0：未知、1：男、2：女',
    default: '0',
    nullable: true,
  })
  gender: string;

  @ApiProperty({ required: false })
  @Column('varchar', {
    length: 32,
    comment: '真实姓名',
    nullable: true,
  })
  realName: string;

  @ApiProperty({ required: false })
  @Column('varchar', {
    length: 255,
    comment: '签名',
    nullable: true,
  })
  signature: string;

  @ApiProperty({ required: false })
  @Column('varchar', {
    length: 1,
    nullable: true,
    comment: '用户状态: 0禁用 1启用',
    default: '1',
  })
  status: string;

  @ApiProperty({ required: false })
  @Column('varchar', {
    length: 1000,
    nullable: true,
    comment: '负责部门id列表: 用,隔开',
  })
  departIds: string;

  @ApiProperty({ required: false })
  @Column('varchar', {
    length: 100,
    nullable: true,
    comment: '工号：唯一',
  })
  workNo: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true, select: false })
  password: string;

  @BeforeInsert()
  beforeInsertPassword() {
    const salt = bcryptjs.genSaltSync(10);
    const password = bcryptjs.hashSync(this.password, salt);
    this.password = password;
  }

  validatePassword(password: string) {
    return bcryptjs.compareSync(password, this.password);
  }
}
