import { TreeCheckboxCheckedValues } from "sea-react-components";
import { AccountTypes } from "../account";

// TODO: to be up to dated with the backend always
export enum PermissionKeys {
  // Admin
  ManageAccounts = "manage-accounts",
  ManageAccountsRead = "manage-accounts-read",
  ManageAccountsCreate = "manage-accounts-create",
  ManageAccountsChangePassword = "manage-accounts-change-password",
  ManageAccountsUpdateDetails = "manage-accounts-update-details",
  ManageAccountsDelete = "manage-accounts-delete",
  ManageAccountsSoftDelete = "manage-accounts-soft-delete",
  ManageAccountsForceDelete = "manage-accounts-force-delete",
  ManageAccountsRestore = "manage-accounts-restore",
  ManageRoles = "manage-roles",
  ManageRolesRead = "manage-roles-read",
  ManageRolesCreate = "manage-roles-create",
  ManageRolesUpdateDetails = "manage-roles-update-details",
  ManageRolesDelete = "manage-roles-delete",

  // User
  ContractsApp = "contracts-app",
  ContractsAppManageContracts = "contracts-app-manage-contracts",
  ContractsAppManageContractsRead = "contracts-app-manage-contracts-read",
  ContractsAppManageContractsCreate = "contracts-app-manage-contracts-create",
  ContractsAppManageContractsUpdateDetails = "contracts-app-manage-contracts-update-details",
  ContractsAppManageContractsDelete = "contracts-app-manage-contracts-delete",
  ContractsAppManageContractTemplates = "contracts-app-manage-contract-templates",
  ContractsAppManageContractTemplatesRead = "contracts-app-manage-contract-templates-read",
  ContractsAppManageContractTemplatesCreate = "contracts-app-manage-contract-templates-create",
  ContractsAppManageContractTemplatesUpdateDetails = "contracts-app-manage-contract-templates-update-details",
  ContractsAppManageContractTemplatesDelete = "contracts-app-manage-contract-templates-delete",
}

export interface IPermission {
  name: string;
  key: PermissionKeys;
  isLeaf: boolean;
  children?: IPermission[] | undefined;
}

export type StatePermission = IPermission & {
  checked: TreeCheckboxCheckedValues;
};

export type IPermissionResponse = Record<AccountTypes, IPermission[]>;
