"use client";
import { Button } from "sea-react-components";
import { Input } from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import { useParams } from "next/navigation";
import AccountActionInstance from "@/store/slices/account/actions";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";

type Values = {
  password: string;
  confirmPassword: string;
};

const initialValues: Values = {
  password: "",
  confirmPassword: "",
};

export default function ChangePasswordForm() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const { password } = values;

    AccountActionInstance.changeAccountPassword(params.id, password)
      .then(() => {
        dispatch(
          pushNewAlert({
            message: "The password has been changed successfully",
            theme: "light",
            type: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(
          pushNewAlert({
            message: error.message,
            theme: "light",
            type: "error",
          })
        );
      })
      .finally(() => {
        formikHelpers.setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: FormValidationUtils.Account.changePasswordValidation,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-1">
              <label>New password</label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="New password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                errorMessage={formik.errors.password}
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-1">
              <label>Confirm password</label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                errorMessage={formik.errors.confirmPassword}
              />
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
            Change password
          </Button>
        </div>
      </div>
    </form>
  );
}
