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
