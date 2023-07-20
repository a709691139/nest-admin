import { ResponseWrap } from '@/common/dto/ResponseWrap';

export function responseSuccess<T>(
  data: T,
  status = 0,
  msg = '成功',
): ResponseWrap<T> {
  return {
    status,
    msg,
    data,
  };
}

export function responseError<T>(
  data: T,
  status = 1,
  msg = '失败',
): ResponseWrap<T> {
  return {
    status,
    msg,
    data,
  };
}
