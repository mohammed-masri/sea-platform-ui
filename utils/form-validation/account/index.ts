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
    birthDate: ValidationUtils.birthDate as any,
  });
};
