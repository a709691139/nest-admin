import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

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
  userInfo: string;
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

export class UpdateMyPassoword {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassoword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
