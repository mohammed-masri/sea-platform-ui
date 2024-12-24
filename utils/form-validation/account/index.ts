/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { ValidationUtils } from "sea-react-components";

export const createNewAccountValidation = () => {
  return Yup.object({
    name: ValidationUtils.name as any,

    email: ValidationUtils.email as any,
    phoneNumber: ValidationUtils.phoneNumber as any,
    type: Yup.mixed()
      .oneOf(["Admin", "User"], "Type must be either Admin or User")
      .required("Role is required"),
    password: ValidationUtils.password as any,
    confirmPassword: ValidationUtils.confirmPassword as any,
    birthDate: Yup.date().optional(),
  });
};

export const updateAccountValidation = () => {
  return Yup.object({
    name: ValidationUtils.name as any,
    email: ValidationUtils.email as any,
    phoneNumber: ValidationUtils.phoneNumber as any,
    birthDate: Yup.date().optional(),
  });
};

export const changePasswordValidation = () => {
  return Yup.object({
    password: ValidationUtils.password as any,
    confirmPassword: ValidationUtils.confirmPassword as any,
  });
};
