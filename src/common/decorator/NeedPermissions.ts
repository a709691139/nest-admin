import { SetMetadata } from '@nestjs/common';

/** 校验用户的权限 */
export const NeedPermissions = (list: string[] | string) =>
  SetMetadata('permissions', typeof list === 'string' ? [list] : list);
