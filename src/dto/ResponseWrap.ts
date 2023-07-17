import { ApiProperty } from '@nestjs/swagger';

export class ResponseWrap<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  status: number;

  @ApiProperty()
  msg: string;
}

export class Pagination<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  total: number;
}
