import { APIsConfig } from "@/config";

import axiosInstance from "@/utils/axios";
import {
  AccountTypes,
  IAccount,
  IAccountArrayDataResponse,
} from "@/dto/account";

class AccountAction {
  private static instance: AccountAction;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public static method to get the instance
  public static getInstance(): AccountAction {
    if (!AccountAction.instance) {
      AccountAction.instance = new AccountAction();
    }
    return AccountAction.instance;
  }

  getAccounts(
    page: number = 1,
    limit: number = 10,
    query: string = "",
    type: AccountTypes | "all" = "all",
    roleId: string | "all"
  ) {
    return axiosInstance
      .get(
        APIsConfig.APIs.Account.getAccounts(page, limit, query, type, roleId)
      )
      .then((response) => response as unknown as IAccountArrayDataResponse);
  }

  getAccountDetails(id: string) {
    return axiosInstance
      .get(APIsConfig.APIs.Account.getAccountDetails(id))
      .then((response) => response as unknown as IAccount);
  }

  createNewAccount(
    name: string,
    email: string,
    phoneNumber: string,
    type: AccountTypes,
    password: string,
    birthDate: string,
    roleIds: string[]
  ) {
    return axiosInstance
      .post(APIsConfig.APIs.Account.create, {
        name,
        email,
        phoneNumber,
        type,
        password,
        birthDate,
        roleIds,
      })
      .then((response) => response as unknown as IAccount);
  }

  updateAccountDetails(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    birthDate: string,
    roleIds: string[]
  ) {
    return axiosInstance
      .put(APIsConfig.APIs.Account.update(id), {
        name,
        email,
        phoneNumber,
        birthDate,
        roleIds,
      })
      .then((response) => response as unknown as IAccount);
  }

  changeAccountPassword(id: string, newPassword: string) {
    return axiosInstance
      .put(APIsConfig.APIs.Account.changePassword(id), {
        newPassword,
      })
      .then((response) => response as unknown as boolean);
  }

  toggleLock(id: string) {
    return axiosInstance
      .put(APIsConfig.APIs.Account.toggleLock(id))
      .then((response) => response as unknown as IAccount);
  }
}

const AccountActionInstance = AccountAction.getInstance();

export default AccountActionInstance;
