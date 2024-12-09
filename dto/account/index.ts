export enum AccountTypes {
  User = "User",
  Admin = "Admin",
}

export interface IAccount {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  type: AccountTypes;
}
