/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { ValidationUtils } from "sea-react-components";

export const createNewApplicationValidation = () => {
  return Yup.object({
    name: ValidationUtils.name as any,

    description: Yup.string()
      .trim()
      .max(200, "Description must not exceed 200 characters"),
    URL: Yup.string()
      .url("it must be a valid URL")
      .required("The URL is required"),
    iconFileId: Yup.string().required("The Icon is required"),
  });
};

export const updateApplicationValidation = () => {
  return Yup.object({
    name: ValidationUtils.name as any,

    description: Yup.string()
      .trim()
      .max(200, "Description must not exceed 200 characters"),
    URL: Yup.string()
      .url("it must be a valid URL")
      .required("The URL is required"),
    iconFileId: Yup.string().required("The Icon is required"),
  });
};
