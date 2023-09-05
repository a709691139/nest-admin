import { ApiProperty } from '@nestjs/swagger';

export class CreateImageCodeResponse {
  @ApiProperty({})
  imageCode: string;
  @ApiProperty({})
  imageCodeId: string;
  @ApiProperty({})
  imageUrl: string;
}
