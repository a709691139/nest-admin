import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

/** 官方客服联系方式Dto */
export class OfficialCustomerServiceContactDto {
  tenantId: string;
  code: string;
  @ApiProperty({
    required: true,
    description: '联系方式列表',
  })
  @ValidateNested()
  @Type(() => OfficialCustomerServiceContactListItem)
  list: OfficialCustomerServiceContactListItem[];
}

class OfficialCustomerServiceContactListItem {
  @ApiProperty({
    required: true,
    description: '类型(1电话,2微信,3邮箱)',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    required: true,
    description: '联系方式',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    description: '详情',
  })
  @IsString()
  @IsNotEmpty()
  desc: string;
}
