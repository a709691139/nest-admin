import { ApiProperty } from '@nestjs/swagger';

export class ResponseWrap<T> {
  @ApiProperty()
  data: T;

  /**
   * 0 成功
   * 401 未登陆
   * 403 接口权限不足
   */
  @ApiProperty()
  status: number;

  @ApiProperty()
  msg: string;

  @ApiProperty({ type: Boolean })
  success: boolean;
}

export class Pagination<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  total: number;
}
