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
