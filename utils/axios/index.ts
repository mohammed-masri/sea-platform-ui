import { Constants } from "@/config";
import { BACKEND_BASE_URL } from "@/config/env";

import { AxiosUtils } from "sea-react-components";

const axiosInstance = AxiosUtils.createInstance(BACKEND_BASE_URL, {
  JWTTokenKey: Constants.LocalStorageKeys.JWTToken,
  withCredentials: true,
});

export default axiosInstance;
