import { APIsConfig } from "@/config";
import { AccountTypes } from "@/dto/account";
import { PermissionKeys } from "@/dto/permission";
import { IRoleArrayDataResponse, IRoleFull } from "@/dto/role";

import axiosInstance from "@/utils/axios";

class RoleAction {
  private static instance: RoleAction;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public static method to get the instance
  public static getInstance(): RoleAction {
    if (!RoleAction.instance) {
      RoleAction.instance = new RoleAction();
    }
    return RoleAction.instance;
  }

  getRoles(
    page: number = 1,
    limit: number = 10,
    query: string = "",
    type: AccountTypes | "all" = "all"
  ) {
    return axiosInstance
      .get(APIsConfig.APIs.Role.getRoles(page, limit, query, type))
      .then((response) => response as unknown as IRoleArrayDataResponse);
  }

  getRoleDetails(id: string) {
    return axiosInstance
      .get(APIsConfig.APIs.Role.getRoleDetails(id))
      .then((response) => response as unknown as IRoleFull);
  }

  createNewRole(
    name: string,
    description: string,
    permissionKeys: PermissionKeys[],
    type: AccountTypes,
    color: string
  ) {
    return axiosInstance
      .post(APIsConfig.APIs.Role.create, {
        name,
        description,
        permissionKeys,
        type,
        color,
      })
      .then((response) => response as unknown as IRoleFull);
  }

  updateRoleDetails(
    id: string,
    name: string,
    description: string,
    permissionKeys: PermissionKeys[],
    color: string
  ) {
    return axiosInstance
      .put(APIsConfig.APIs.Role.update(id), {
        name,
        description,
        permissionKeys,
        color,
      })
      .then((response) => response as unknown as IRoleFull);
  }

  deleteRole(id: string) {
    return axiosInstance
      .delete(APIsConfig.APIs.Role.delete(id))
      .then((response) => response as unknown as IRoleFull);
  }
}

const RoleActionInstance = RoleAction.getInstance();

export default RoleActionInstance;
