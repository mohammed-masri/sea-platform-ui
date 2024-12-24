"use client";
import { Button } from "sea-react-components";
import { Input } from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import AccountActionInstance from "@/store/slices/account/actions";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";

type Values = {
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
};

const initialValues: Values = {
  name: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
};

export default function UpdateAccountForm() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const { name, birthDate, email, phoneNumber } = values;

    AccountActionInstance.updateAccountDetails(
      params.id,
      name,
      email,
      phoneNumber,
      birthDate
    )
      .then(() => {
        dispatch(
          pushNewAlert({
            message: "The account has been updated successfully",
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
    validationSchema: FormValidationUtils.Account.updateAccountValidation,
    onSubmit,
  });

  useEffect(() => {
    AccountActionInstance.getAccountDetails(params.id).then((response) => {
      formik.setValues({
        name: response?.name || "",
        email: response?.email || "",
        phoneNumber: response?.phoneNumber || "",
        birthDate: response?.birthDate || "",
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-5">
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
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting || !formik.isValid}
            className="uppercase px-4 py-2 bg-primary-light"
          >
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}
