import { AccountTypes } from "@/dto/account";
import { ApplicationStatuses } from "@/dto/application";

export const APIs = {
  Microsoft: {
    auth: {
      getMe: "/auth/me",
    },
  },
  Account: {
    create: "/accounts",
    update: (id: string) => `/accounts/${id}`,
    getAccountDetails: (id: string) => `/accounts/${id}`,
    getAccounts: (
      page: number = 1,
      limit: number = 10,
      query: string = "",
      type: AccountTypes | "all" = "all",
      roleId: string | "all",
      isDeleted = false
    ) =>
      `/accounts?page=${page}&limit=${limit}&q=${query}&type=${type}&roleId=${roleId}&isDeleted=${isDeleted}`,
    changePassword: (id: string) => `/accounts/${id}/change-password`,
    toggleLock: (id: string) => `/accounts/${id}/toggle-lok`,
    restore: (id: string) => `/accounts/${id}/restore`,
    softDelete: (id: string) => `/accounts/${id}/soft-delete`,
  },
  Role: {
    create: "/roles",
    update: (id: string) => `/roles/${id}`,
    getRoleDetails: (id: string) => `/roles/${id}`,
    getRoles: (
      page: number = 1,
      limit: number = 10,
      query: string = "",
      type: AccountTypes | "all" = "all"
    ) => `/roles?page=${page}&limit=${limit}&q=${query}&accountType=${type}`,
    delete: (id: string) => `/roles/${id}`,
  },
  Application: {
    create: "/applications",
    update: (id: string) => `/applications/${id}`,
    getApplicationDetails: (id: string) => `/applications/${id}`,
    getApplications: (
      page: number = 1,
      limit: number = 10,
      query: string = "",
      status: ApplicationStatuses | "all" = "all"
    ) =>
      `/applications?page=${page}&limit=${limit}&q=${query}&status=${status}`,
    delete: (id: string) => `/applications/${id}`,
  },
  File: {
    upload: "/file-manager/upload",
    delete: (id: string) => `/file-manager/${id}`,
  },
  StaticData: {
    permissions: `/static/permissions`,
  },
};
