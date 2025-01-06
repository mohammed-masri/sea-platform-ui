import { APIsConfig } from "@/config";
import { IPermissionResponse } from "@/dto/permission";

import axiosInstance from "@/utils/axios";

class StaticDataAction {
  private static instance: StaticDataAction;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public static method to get the instance
  public static getInstance(): StaticDataAction {
    if (!StaticDataAction.instance) {
      StaticDataAction.instance = new StaticDataAction();
    }
    return StaticDataAction.instance;
  }

  getPermissions() {
    return axiosInstance
      .get(APIsConfig.APIs.StaticData.permissions)
      .then((response) => response as unknown as IPermissionResponse);
  }
}

const StaticDataActionInstance = StaticDataAction.getInstance();

export default StaticDataActionInstance;
