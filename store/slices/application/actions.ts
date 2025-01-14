import { APIsConfig } from "@/config";
import {
  ApplicationStatuses,
  IApplication,
  IApplicationArrayDataResponse,
} from "@/dto/application";

import axiosInstance from "@/utils/axios";

class ApplicationAction {
  private static instance: ApplicationAction;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public static method to get the instance
  public static getInstance(): ApplicationAction {
    if (!ApplicationAction.instance) {
      ApplicationAction.instance = new ApplicationAction();
    }
    return ApplicationAction.instance;
  }

  getApplications(
    page: number = 1,
    limit: number = 10,
    query: string = "",
    status: ApplicationStatuses | "all" = "all"
  ) {
    return axiosInstance
      .get(
        APIsConfig.APIs.Application.getApplications(page, limit, query, status)
      )
      .then((response) => response as unknown as IApplicationArrayDataResponse);
  }

  getApplicationDetails(id: string) {
    return axiosInstance
      .get(APIsConfig.APIs.Application.getApplicationDetails(id))
      .then((response) => response as unknown as IApplication);
  }

  createNewApplication(
    name: string,
    description: string,
    iconFileId: string,
    URL: string
  ) {
    return axiosInstance
      .post(APIsConfig.APIs.Application.create, {
        name,
        description,
        iconFileId,
        URL,
      })
      .then((response) => response as unknown as IApplication);
  }

  updateApplicationDetails(
    id: string,
    name: string,
    description: string,
    iconFileId: string,
    URL: string,
    status: ApplicationStatuses
  ) {
    return axiosInstance
      .put(APIsConfig.APIs.Application.update(id), {
        name,
        description,
        iconFileId,
        URL,
        status,
      })
      .then((response) => response as unknown as IApplication);
  }

  deleteApplication(id: string) {
    return axiosInstance
      .delete(APIsConfig.APIs.Application.delete(id))
      .then((response) => response as unknown as IApplication);
  }
}

const ApplicationActionInstance = ApplicationAction.getInstance();

export default ApplicationActionInstance;
