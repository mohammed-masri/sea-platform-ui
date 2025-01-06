/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { ValidationUtils } from "sea-react-components";
import { AccountTypes } from "@/dto/account";
import { PermissionKeys } from "@/dto/permission";

export const createNewRoleValidation = () => {
  return Yup.object({
    name: ValidationUtils.name as any,
    description: Yup.string()
      .trim()
      .max(200, "Description must not exceed 200 characters"),
    permissionKeys: Yup.array()
      .of(
        Yup.mixed<PermissionKeys>().oneOf(
          Object.values(PermissionKeys),
          "Invalid permission key"
        )
      )
      .required("Permission keys are required")
      .min(1, "At least one permission key is required"),
    type: Yup.mixed()
      .oneOf(Object.values(AccountTypes), "Type must be either Admin or User")
      .required("Role is required"),
  });
};
