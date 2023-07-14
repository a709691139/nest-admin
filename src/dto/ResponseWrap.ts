import { ApiProperty } from '@nestjs/swagger';

export class ResponseWrap<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  code: number;

  @ApiProperty()
  message: number;
}
