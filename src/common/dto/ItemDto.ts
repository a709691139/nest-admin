import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty({})
  id: string;
  @ApiProperty({})
  text: string;
  @ApiProperty({})
  label: string;
  @ApiProperty({})
  value: string;
}
