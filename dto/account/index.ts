import { IArrayDataResponse } from "../global";
import { IRoleShort } from "../role";

export enum AccountTypes {
  User = "User",
  Admin = "Admin",
}

export interface IAccount {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  isLocked: boolean;
  type: AccountTypes;
  roles: IRoleShort[];
}

export interface IAccountArrayDataResponse
  extends IArrayDataResponse<IAccount> {
  data: IAccount[];
}
