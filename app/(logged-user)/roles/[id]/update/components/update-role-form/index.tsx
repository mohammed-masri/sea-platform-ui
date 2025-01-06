"use client";
import {
  Button,
  Textarea,
  TreeCheckbox,
  TreeCheckboxUtils,
} from "sea-react-components";
import { Input } from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import { PermissionKeys } from "@/dto/permission";
import RoleActionInstance from "@/store/slices/role/actions";
import { AccountTypes } from "@/dto/account";
import { IRolePermission } from "@/dto/role";
import { TreeCheckboxNode } from "sea-react-components";

type Values = {
  name: string;
  description: string;
  permissionKeys: PermissionKeys[];
  type: AccountTypes;
};

const initialValues: Values = {
  name: "",
  description: "",
  permissionKeys: [],
  type: AccountTypes.User,
};

export default function UpdateRoleForm() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [treePermissions, setTreePermissions] = useState<
    TreeCheckboxNode<PermissionKeys>[]
  >([]);

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const { name, description, permissionKeys } = values;
    RoleActionInstance.updateRoleDetails(
      params.id,
      name,
      description,
      permissionKeys
    )
      .then(() => {
        router.push("/roles");
        dispatch(
          pushNewAlert({
            message: "The role has been updated successfully",
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

  useEffect(() => {
    RoleActionInstance.getRoleDetails(params.id).then((response) => {
      formik.setValues({
        name: response.name,
        description: response.description,
        type: response?.type,
        permissionKeys: [],
        // permissionKeys: response.permissions
      });

      const tp = response.permissions.map((permission) =>
        TreeCheckboxUtils.makeTreeNode<IRolePermission, PermissionKeys>(
          permission,
          {
            checked: "checked",
            children: "children",
            isLeaf: "isLeaf",
            key: "key",
            label: "name",
          }
        )
      );

      setTreePermissions(tp);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-4 gap-5 items-center">
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
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}
