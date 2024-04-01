import { Injectable } from '@nestjs/common';
import { Role } from '@/modules/system/entity/role.entity';

@Injectable()
export class GlobalDataService {
  constructor() {}

  private roles: Role[] = [];
  /** 角色权限map：只含按钮权限 */
  private rolePermissions: { [roleId: string]: { [perms: string]: boolean } } =
    {};

  setRoles(roles: Role[]) {
    this.roles = roles;
  }

  setRolePermissions(rolePermissions: {
    [roleId: string]: { [perms: string]: boolean };
  }) {
    this.rolePermissions = rolePermissions;
  }

  getRoles() {
    return this.roles;
  }

  getRolePermissions() {
    return this.rolePermissions;
  }
}
