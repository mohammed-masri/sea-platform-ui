import { IArrayDataResponse } from "../global";

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
}

export interface IAccountArrayDataResponse
  extends IArrayDataResponse<IAccount> {
  data: IAccount[];
}
