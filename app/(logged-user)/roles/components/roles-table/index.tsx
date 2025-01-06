"use client";
import AccountTypeBadge from "@/components/account-type-badge";
import { AccountTypes } from "@/dto/account";
import { IRoleShort } from "@/dto/role";
import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import RoleActionInstance from "@/store/slices/role/actions";
import {
  RoleSliceActions,
  selectRoles,
  selectRolesData,
} from "@/store/slices/role/slice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Button,
  Icon,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableColumn,
} from "sea-react-components";
import RoleDetailsDrawer from "../role-details-drawer";
import { pushNewAlert } from "@/store/slices/alert/slice";

type ActionMenuProps = {
  row: IRoleShort;
  setSelectedRow: (row: IRoleShort) => void;
  setViewDrawerOpen: (open: boolean) => void;
  setDeleteModelOpen: (open: boolean) => void;
};
const ActionMenu = ({
  row,
  setSelectedRow,
  setViewDrawerOpen,
  setDeleteModelOpen,
}: ActionMenuProps) => {
  return (
    <>
      <div className="flex justify-center">
        <Menu menuButton={<Icon icon="qlementine-icons:menu-dots-16" />}>
          <div className="p-1">
            <MenuItem
              key="view"
              className="p-2"
              onClick={() => {
                setSelectedRow(row);
                setViewDrawerOpen(true);
              }}
            >
              <div className="flex items-center gap-1">
                <Icon icon="hugeicons:view" />
                <p>View</p>
              </div>
            </MenuItem>
            <MenuItem key="edit" className="p-2">
              <Link href={`/roles/${row.id}/update`}>
                <div className="flex items-center gap-1">
                  <Icon icon="tabler:edit" />
                  <p>Edit</p>
                </div>
              </Link>
            </MenuItem>
            <MenuItem
              key="delete"
              className="p-2"
              onClick={() => {
                setSelectedRow(row);
                setDeleteModelOpen(true);
              }}
            >
              <div className="flex items-center gap-1">
                <Icon icon="material-symbols:delete" />
                <p>Delete</p>
              </div>
            </MenuItem>
          </div>
        </Menu>
      </div>
    </>
  );
};

export default function RolesTable() {
  const dispatch = useAppDispatch();

  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IRoleShort | undefined>(
    undefined
  );

  const columns: TableColumn<IRoleShort>[] = [
    {
      key: "name",
      label: "Name",
      // custom: (row)=>
    },
    {
      key: "type",
      label: "Type",
      custom: (row) => <AccountTypeBadge type={row.type} />,
    },
    {
      key: "actions",
      label: "Actions",
      className: "w-[10%]",
      custom: (row) => (
        <ActionMenu
          row={row}
          setSelectedRow={setSelectedRow}
          setViewDrawerOpen={setViewDrawerOpen}
          setDeleteModelOpen={setDeleteModelOpen}
        />
      ),
    },
  ];

  const { limit, page, query, totalPages, type } =
    useAppSelector(selectRolesData);
  const {
    setLimit,
    setPage,
    setQuery,
    setTotalCount,
    setTotalPages,
    setRolesData,
    setType,
  } = RoleSliceActions;
  const roles = useAppSelector((state) => selectRoles(state, page));

  const updateParams = useUpdateQueryParams();
  const getParam = useGetQueryParam();

  useEffect(() => {
    RoleActionInstance.getRoles(page, limit, query, type).then((response) => {
      const { data, page: p, totalCount: tc, totalPages: tp } = response;
      dispatch(setTotalCount(tc));
      dispatch(setTotalPages(tp));
      dispatch(
        setRolesData({
          roles: data,
          page: p,
        })
      );
    });
  }, [
    page,
    query,
    limit,
    dispatch,
    setTotalCount,
    setTotalPages,
    setRolesData,
    type,
  ]);

  const handleDeleteRole = () => {
    if (selectedRow) {
      RoleActionInstance.deleteRole(selectedRow.id)
        .then((response) => {
          console.log(response);
          dispatch(
            pushNewAlert({
              message: "The role has been deleted successfully",
              theme: "light",
              type: "success",
            })
          );
          dispatch(
            RoleSliceActions.removeRole({
              id: selectedRow.id,
              page,
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
          setDeleteModelOpen(false);
        });
    }
  };

  return (
    <>
      <Paper>
        <Table
          columns={columns}
          rows={roles}
          title="Roles Table"
          name="roles"
          page={page}
          setPage={(page) => dispatch(setPage(page))}
          totalPages={totalPages}
          rowsPerPage={limit}
          setRowsPerPage={(limit) => dispatch(setLimit(limit))}
          query={query}
          setQuery={(query) => dispatch(setQuery(query))}
          filters={[
            {
              label: "Type",
              name: "type",
              options: Object.values(AccountTypes).map((value) => ({
                label: value,
                value,
              })),
              value: type,
              setValue: (newValue) => dispatch(setType(newValue)),
            },
          ]}
          updateParams={updateParams}
          getParam={getParam}
        />
      </Paper>

      {selectedRow && viewDrawerOpen && (
        <RoleDetailsDrawer
          isOpen={viewDrawerOpen}
          onClose={() => setViewDrawerOpen(false)}
          roleId={selectedRow.id}
        />
      )}

      {selectedRow && deleteModelOpen && (
        <Modal
          isOpen={deleteModelOpen}
          onClose={() => setDeleteModelOpen(false)}
          className="flex flex-col gap-5"
        >
          <p>Do you want to delete this role?</p>
          <div className="flex items-center justify-end gap-3">
            <Button
              className="bg-transparent"
              onClick={() => setDeleteModelOpen(false)}
            >
              <p className="text-error hover:text-opacity-50 custom-animation">
                Dismiss
              </p>
            </Button>
            <Button onClick={() => handleDeleteRole()}>Confirm</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
