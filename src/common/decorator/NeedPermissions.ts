import { SetMetadata } from '@nestjs/common';

/** 不需要登陆就加这个 */
export const NeedPermissions = (list: string[] | string) =>
  SetMetadata('permissions', typeof list === 'string' ? [list] : list);
