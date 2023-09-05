import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { User } from './user.entity';
import { Type } from 'class-transformer';

export class PageUserReqDto {
  tenantId: string;
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false, description: '账号名' })
  username: string;

  @ApiProperty({ required: false, description: '邮箱地址' })
  email: string;

  @ApiProperty({ required: false, description: '手机' })
  phone: string;

  @ApiProperty({ required: false, description: '别名' })
  alias: string;

  @ApiProperty({ required: false, description: '性别 0：未知、1：男、2：女' })
  gender: string;

  @ApiProperty({ required: false, description: '真实姓名' })
  realName: string;

  @ApiProperty({ required: false, description: '用户状态: 0禁用 1启用' })
  status: string;

  @ApiProperty({ required: false, description: '负责部门id列表: 用,隔开' })
  departIds: string;

  @ApiProperty({ required: false, description: '工号' })
  workNo: string;

  @ApiProperty({ required: false, description: '角色id' })
  roleId: string;

  @ApiProperty({ required: false, description: '创建时间' })
  createdAt: string;
}

export class RegisUserDto {
  @ApiProperty({
    description: '账号名',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: '密码',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginPasswordUserDto {
  @ApiProperty({
    description: '账号名',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: '密码',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  imageCode: string;

  @IsString()
  @IsNotEmpty()
  imageCodeId: string;
}

export class LoginSuccessResponseDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  userInfo: User;
  @ApiProperty({ title: '个人权限code列表' })
  permissions: string[];
}

export class ResetUserPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateMyInfoDto {
  @ApiProperty()
  @IsString()
  avatar: string;

  @ApiProperty({ title: '别名' })
  @IsString()
  alias: string;

  @ApiProperty({ title: '性别 0：未知、1：男、2：女' })
  @IsString()
  gender: string;

  @ApiProperty({ title: '签名' })
  @IsString()
  signature: string;
}

export class UpdateMyPassowordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassoword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class ResetPasswordReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateStatusReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ title: '1:启用、0:冻结' })
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class UpdateRolesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsArray()
  roleIds: string[];
}
