"use client";
import { Button, Input, RadioButton, Select } from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import { useRouter } from "next/navigation";
import AccountActionInstance from "@/store/slices/account/actions";
import { AccountSliceActions } from "@/store/slices/account/slice";
import { AccountTypes } from "@/dto/account";
import useRoles from "@/hooks/useRoles";

type Values = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  type: AccountTypes;
  birthDate: string;
  roleIds: string[];
};
const initialValues: Values = {
  name: "",
  email: "",
  phoneNumber: "",
  type: AccountTypes.User,
  password: "",
  confirmPassword: "",
  birthDate: "",
  roleIds: [],
};

export default function CreateAccountForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const { name, birthDate, email, password, phoneNumber, type, roleIds } =
      values;
    AccountActionInstance.createNewAccount(
      name,
      email,
      phoneNumber,
      type,
      password,
      birthDate,
      roleIds
    )
      .then((response) => {
        dispatch(AccountSliceActions.pushNewAccount(response));
        router.push("/accounts");
        dispatch(
          pushNewAlert({
            message: "New account has been created successfully",
            type: "success",
            theme: "light",
          })
        );
      })
      .catch((error) => {
        dispatch(
          pushNewAlert({
            message: error.message,
            type: "error",
            theme: "light",
          })
        );
      })
      .finally(() => {
        formikHelpers.setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: FormValidationUtils.Account.createNewAccountValidation,
    onSubmit,
  });

  const roles = useRoles(formik.values.type, 1, 1000); // TODO: fix hardcoded values

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-5 items-center">
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-1">
              <label>Name</label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                errorMessage={formik.errors.name}
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-1">
              <label>Birthdate</label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                placeholder="Your Birthdate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthDate}
                errorMessage={formik.errors.birthDate}
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <Input
                id="email"
                name="email"
                placeholder="Your email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                errorMessage={formik.errors.email}
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            {" "}
            <div className="flex flex-col gap-1">
              <label>Phone Number</label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                errorMessage={formik.errors.phoneNumber}
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-1">
              <label>Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                errorMessage={formik.errors.password}
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-1">
              <label>Confirm Password</label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="confirm password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                errorMessage={formik.errors.confirmPassword}
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 md:gap-10 flex-wrap">
              <p>User Type</p>

              <div className="flex items-center gap-3 flex-wrap">
                {Object.values(AccountTypes).map((k) => (
                  <RadioButton
                    key={`type-${k}`}
                    checked={formik.values.type === k}
                    id={k}
                    name={k}
                    onChange={() => formik.setFieldValue("type", k)}
                    label={<p>{k}</p>}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 flex-wrap">
              <div>
                <p>Roles</p>

                {formik.errors.roleIds && (
                  <p className="text-sm text-error">{formik.errors.roleIds}</p>
                )}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Select
                  multiselect
                  name="role"
                  options={roles.map((r) => ({
                    label: r.name,
                    value: r.id,
                  }))}
                  setValues={(newValues) =>
                    formik.setFieldValue("roleIds", newValues)
                  }
                  values={formik.values.roleIds}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting || !formik.isValid}
            className="uppercase px-4 py-2 bg-primary-light"
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}
