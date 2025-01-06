"use client";
import {
  Button,
  ColorPicker,
  Input,
  RadioButton,
  Textarea,
  TreeCheckbox,
  TreeCheckboxUtils,
  TreeUtils,
} from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import { useRouter } from "next/navigation";
import { AccountTypes } from "@/dto/account";
import { IPermission, PermissionKeys, StatePermission } from "@/dto/permission";
import RoleActionInstance from "@/store/slices/role/actions";
import { selectPermissions } from "@/store/slices/static/slice";

type Values = {
  name: string;
  description: string;
  permissionKeys: PermissionKeys[];
  color: string;
  type: AccountTypes;
};
const initialValues: Values = {
  name: "",
  description: "",
  permissionKeys: [],
  color: "#000000",
  type: AccountTypes.User,
};

export default function CreateRoleForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [statePermissions, setStatePermission] = useState<StatePermission[]>(
    []
  );

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const { name, description, permissionKeys, type, color } = values;
    RoleActionInstance.createNewRole(
      name,
      description,
      permissionKeys,
      type,
      color
    )
      .then(() => {
        router.push("/roles");
        dispatch(
          pushNewAlert({
            message: "New role has been created successfully",
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
    validationSchema: FormValidationUtils.Role.createNewRoleValidation,
    onSubmit,
  });

  const permissions = useAppSelector((state) =>
    selectPermissions(state, formik.values.type)
  );

  useEffect(() => {
    const sp = permissions.map((p) =>
      TreeUtils.editTree<IPermission, StatePermission>(
        p,
        (p) => {
          const np: StatePermission = {
            ...p,
            checked: "none",
          };
          return np;
        },
        "children"
      )
    );

    setStatePermission(sp);
  }, [permissions]);

  const treePermissions = useMemo(
    () =>
      statePermissions.map((p) =>
        TreeCheckboxUtils.makeTreeNode<StatePermission, PermissionKeys>(p, {
          checked: "checked",
          children: "children",
          isLeaf: "isLeaf",
          key: "key",
          label: "name",
        })
      ),
    [statePermissions]
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-4 gap-5 items-start">
          <div className="col-span-4 md:col-span-2">
            <div className="flex flex-col gap-1">
              <label>Name</label>
              <Input
                id="name"
                name="name"
                placeholder="Role name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                errorMessage={formik.errors.name}
              />
            </div>
          </div>

          <div className="col-span-4 md:col-span-2">
            <div className="flex flex-col gap-1">
              <label>Color</label>
              <ColorPicker
                id="color"
                name="color"
                color={formik.values.color}
                setColor={(newColor) => formik.setFieldValue("color", newColor)}
              />
            </div>
          </div>

          <div className="col-span-4 md:col-span-3">
            <div className="flex flex-col gap-1">
              <label>Description</label>

              <Textarea
                id="description"
                name="description"
                rows={3}
                placeholder="type some details here..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                errorMessage={formik.errors.description}
              />
            </div>
          </div>

          <div className="col-span-4">
            <div className="flex items-center gap-3 md:gap-10 flex-wrap">
              <p>Role Type</p>

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

          <div className="col-span-4">
            <div className="flex gap-3 md:gap-10 flex-wrap">
              <div>
                <p>Permissions</p>

                {formik.errors.permissionKeys && (
                  <p className="text-sm text-error">
                    {formik.errors.permissionKeys}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <TreeCheckbox<PermissionKeys>
                  name="role"
                  nodes={treePermissions}
                  onChange={(nodes) => {
                    const newPermissionKeys = nodes.map((n) => n.key);
                    formik.setFieldValue("permissionKeys", newPermissionKeys);
                  }}
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
