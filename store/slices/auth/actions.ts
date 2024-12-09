import { APIsConfig } from "@/config";

import axiosInstance from "@/utils/axios";
import { IAccount } from "@/dto/account";

class AuthAction {
  private static instance: AuthAction;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public static method to get the instance
  public static getInstance(): AuthAction {
    if (!AuthAction.instance) {
      AuthAction.instance = new AuthAction();
    }
    return AuthAction.instance;
  }

  getMe() {
    return axiosInstance
      .get(APIsConfig.APIs.Microsoft.auth.getMe)
      .then((response) => response as unknown as IAccount);
  }
}

const AuthActionInstance = AuthAction.getInstance();

export default AuthActionInstance;
