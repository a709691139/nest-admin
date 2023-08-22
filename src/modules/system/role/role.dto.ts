import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class UpdateRolePermissionDto {
  @ApiProperty({ required: true, description: '角色id' })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: '权限ids',
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  permissionIds: { id: string }[];
}

export class AddRoleDto {
  tenantId: string;
  /** 名称 */
  @ApiProperty({
    description: '名称',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  /** 编码 */
  @ApiProperty({
    description: '编码',
    required: false,
  })
  code: string;

  /** 描述 */
  @ApiProperty({
    description: '描述',
    required: false,
  })
  desc: string;
}

export class UpdateRoleDto {
  tenantId: string;
  @ApiProperty({ required: true, description: '角色id' })
  @IsNotEmpty()
  id: string;

  /** 名称 */
  @ApiProperty({
    description: '名称',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  /** 编码 */
  @ApiProperty({
    description: '编码',
    required: false,
  })
  code: string;

  /** 描述 */
  @ApiProperty({
    description: '描述',
    required: false,
  })
  desc: string;
}
