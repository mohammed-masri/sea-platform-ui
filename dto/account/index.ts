import { IArrayDataResponse } from "../global";

export type AccountTypes = "User" | "Admin";

export interface IAccountType {
  id: string;
  name: string;
  key: AccountTypes;
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
