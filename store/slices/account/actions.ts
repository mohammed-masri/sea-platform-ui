import { APIsConfig } from "@/config";

import axiosInstance from "@/utils/axios";
import {
  AccountTypes,
  IAccount,
  IAccountArrayDataResponse,
  IAccountType,
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

  getAccountTypes() {
    return axiosInstance
      .get(APIsConfig.APIs.Account.getAccountTypes)
      .then((response) => response as unknown as IAccountType[]);
  }

  getAccounts(page: number = 1, limit: number = 10, query: string = "") {
    return axiosInstance
      .get(APIsConfig.APIs.Account.getAccounts(page, limit, query))
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
    typeId: string,
    password: string,
    birthDate: string
  ) {
    return axiosInstance
      .post(APIsConfig.APIs.Account.create, {
        name,
        email,
        phoneNumber,
        typeId,
        password,
        birthDate,
      })
      .then((response) => response as unknown as IAccount);
  }

  updateAccountDetails(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    birthDate: string
  ) {
    return axiosInstance
      .put(APIsConfig.APIs.Account.update(id), {
        name,
        email,
        phoneNumber,
        birthDate,
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
