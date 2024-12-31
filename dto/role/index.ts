import { AccountTypes } from "../account";
import { IArrayDataResponse } from "../global";

export interface IRolePermission {
  name: string;
  key: string;
  isLeaf: boolean;
  checked: "none" | "some" | "all";
  children: IRolePermission[] | undefined;
}

export interface IRoleShort {
  id: string;
  name: string;
  description: string;
  type: AccountTypes;
}

export interface IRoleArrayDataResponse extends IArrayDataResponse<IRoleShort> {
  data: IRoleShort[];
}

export interface IRoleFull extends IRoleShort {
  permissions: IRolePermission[];
}
