import { ResponseWrap } from '@/common/dto/ResponseWrap';

export function responseSuccess<T>(
  data?: T,
  msg = '成功',
  status = 0,
): ResponseWrap<T> {
  return {
    status,
    msg,
    data: (data || '') as any,
  };
}

export function responseError<T>(
  data?: T,
  msg = '失败',
  status = 1,
): ResponseWrap<T> {
  return {
    status,
    msg,
    data: (data || '') as any,
  };
}
