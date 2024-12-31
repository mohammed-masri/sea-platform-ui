import { AccountTypes } from "@/dto/account";

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
      type: AccountTypes | "all" = "all"
    ) => `/accounts?page=${page}&limit=${limit}&q=${query}&type=${type}`,
    changePassword: (id: string) => `/accounts/${id}/change-password`,
    toggleLock: (id: string) => `/accounts/${id}/toggle-lok`,
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
  },
};
