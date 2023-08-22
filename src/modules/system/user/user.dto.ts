import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { User } from './user.entity';
import { Type } from 'class-transformer';

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
