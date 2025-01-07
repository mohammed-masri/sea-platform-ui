"use client";
import AccountLookBadge from "@/components/account-lock-badge";
import AccountRoleBadge from "@/components/account-role-badge";
import AccountTypeBadge from "@/components/account-type-badge";
import { AccountTypes, IAccount } from "@/dto/account";
import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import useRoles from "@/hooks/useRoles";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AccountActionInstance from "@/store/slices/account/actions";
import {
  AccountSliceActions,
  selectAccounts,
  selectAccountsData,
} from "@/store/slices/account/slice";
import { pushNewAlert } from "@/store/slices/alert/slice";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Icon,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableColumn,
  Drawer,
  Modal,
  Button,
} from "sea-react-components";

type ActionMenuProps = {
  row: IAccount;
  setSelectedRow: (row: IAccount) => void;
  setViewDrawerOpen: (open: boolean) => void;
  setRestoreModelOpen: (open: boolean) => void;
  setDeleteModelOpen: (open: boolean) => void;
  isDeleted?: boolean;
};
const ActionMenu = ({
  row,
  setSelectedRow,
  setViewDrawerOpen,
  setRestoreModelOpen,
  setDeleteModelOpen,
  isDeleted = false,
}: ActionMenuProps) => {
  return (
    <>
      <div className="flex justify-center">
        <Menu
          menuButton={<Icon icon="qlementine-icons:menu-dots-16" />}
          className="w-48"
        >
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
                <Icon icon="hugeicons:view" className="w-5 h-5" />
                <p>View</p>
              </div>
            </MenuItem>
            {!isDeleted && (
              <MenuItem key="edit" className="p-2">
                <Link href={`/accounts/${row.id}/update`}>
                  <div className="flex items-center gap-1">
                    <Icon icon="tabler:edit" className="w-5 h-5" />
                    <p>Edit</p>
                  </div>
                </Link>
              </MenuItem>
            )}

            {isDeleted && (
              <MenuItem
                key="restore"
                className="p-2"
                onClick={() => {
                  setSelectedRow(row);
                  setRestoreModelOpen(true);
                }}
              >
                <div className="flex items-center gap-1">
                  <Icon
                    icon="fluent:bin-recycle-20-filled"
                    className="w-5 h-5"
                  />
                  <p>Restore</p>
                </div>
              </MenuItem>
            )}
            <MenuItem
              key="delete"
              className="p-2"
              onClick={() => {
                setSelectedRow(row);
                setDeleteModelOpen(true);
              }}
              disabled={isDeleted}
            >
              <div className="flex items-center gap-1">
                <Icon icon="material-symbols:delete" className="w-5 h-5" />
                <p>
                  {isDeleted ? "Delete Permanently" : "Move to recycle bin"}
                </p>
              </div>
            </MenuItem>
          </div>
        </Menu>
      </div>
    </>
  );
};

type Props = {
  isDeleted?: boolean;
};
export default function AccountsTable({ isDeleted = false }: Props) {
  const dispatch = useAppDispatch();

  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [restoreModelOpen, setRestoreModelOpen] = useState(false);
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IAccount | undefined>(
    undefined
  );

  const [roleId, setRoleId] = useState<string | "all">("all");

  const columns: TableColumn<IAccount>[] = [
    {
      key: "name",
      label: "Name",
      // custom: (row)=>
    },
    {
      key: "email",
      label: "Email",
      // custom: (row)=>
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      // custom: (row)=>
    },
    {
      key: "birthDate",
      label: "Birthdate",
      // custom: (row)=>
    },
    {
      key: "type",
      label: "Type",
      custom: (row) => <AccountTypeBadge type={row.type} />,
    },
    {
      key: "isLocked",
      label: "Locked",
      custom: (row) => <AccountLookBadge isLocked={row.isLocked} />,
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
          setRestoreModelOpen={setRestoreModelOpen}
          isDeleted={isDeleted}
        />
      ),
    },
  ];

  const { limit, page, query, totalPages, type } =
    useAppSelector(selectAccountsData);
  const {
    setLimit,
    setPage,
    setQuery,
    setTotalCount,
    setTotalPages,
    setAccountsData,
    setType,
  } = AccountSliceActions;
  const accounts = useAppSelector((state) => selectAccounts(state, page));

  const updateParams = useUpdateQueryParams();
  const getParam = useGetQueryParam();

  useEffect(() => {
    AccountActionInstance.getAccounts(
      page,
      limit,
      query,
      type,
      roleId,
      isDeleted
    ).then((response) => {
      const { data, page: p, totalCount: tc, totalPages: tp } = response;
      dispatch(setTotalCount(tc));
      dispatch(setTotalPages(tp));
      dispatch(
        setAccountsData({
          accounts: data,
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
    setAccountsData,
    type,
    roleId,
    isDeleted,
  ]);

  const roles = useRoles(type, 1, 1000); // TODO: fix hardcoded values

  const handleRestoreAccount = () => {
    if (selectedRow) {
      AccountActionInstance.restore(selectedRow.id)
        .then((response) => {
          console.log(response);
          dispatch(
            pushNewAlert({
              message: "The account has been restored successfully",
              theme: "light",
              type: "success",
            })
          );
          dispatch(
            AccountSliceActions.removeAccount({
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
          setRestoreModelOpen(false);
        });
    }
  };

  const handleDeleteAccount = () => {
    if (selectedRow) {
      const isSoftDelete = !isDeleted;
      if (isSoftDelete) {
        AccountActionInstance.softDelete(selectedRow.id)
          .then((response) => {
            console.log(response);
            dispatch(
              pushNewAlert({
                message: "The account has been deleted successfully",
                theme: "light",
                type: "success",
              })
            );
            dispatch(
              AccountSliceActions.removeAccount({
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
      } else {
        window.alert("it's a force delete!");
      }
    }
  };

  return (
    <>
      <Paper>
        <Table
          columns={columns}
          rows={accounts}
          title="Accounts Table"
          name="accounts"
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setValue: (newValue) => dispatch(setType(newValue as any)),
            },
            {
              label: "Role",
              name: "role",
              options: roles.map((r) => ({
                label: r.name,
                value: r.id,
              })),
              value: roleId,
              setValue: (newValue) => setRoleId(newValue),
            },
          ]}
          updateParams={updateParams}
          getParam={getParam}
        />
      </Paper>

      <Drawer isOpen={viewDrawerOpen} onClose={() => setViewDrawerOpen(false)}>
        <div className="flex flex-col gap-5">
          <h3 className="font-semibold text-black text-2xl">Account Details</h3>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <p className="text-xl text-secondary">{selectedRow?.name}</p>
              <AccountTypeBadge type={selectedRow?.type || AccountTypes.User} />

              <Icon
                icon={selectedRow?.isLocked ? "si:lock-fill" : "si:unlock-fill"}
                className={clsx(
                  "w-5 h-6",
                  selectedRow?.isLocked ? "text-warning" : "text-success"
                )}
              />
            </div>

            <div className="flex gap-1 items-center">
              <p className="text-black">Email:</p>
              <p className="text-text">{selectedRow?.email}</p>
            </div>

            <div className="flex gap-1 items-center">
              <p className="text-black">Phone Number:</p>
              <p className="text-text">{selectedRow?.phoneNumber}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-black">Roles:</p>
              <div className="flex gap-2 items-center">
                {selectedRow?.roles.map((r) => (
                  <AccountRoleBadge key={`role-${r.id}`} role={r} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      {selectedRow && restoreModelOpen && (
        <Modal
          isOpen={restoreModelOpen}
          onClose={() => setRestoreModelOpen(false)}
          className="flex flex-col gap-5"
        >
          <p>Do you want to restore this account from recycle bin?</p>
          <div className="flex items-center justify-end gap-3">
            <Button
              className="bg-transparent"
              onClick={() => setRestoreModelOpen(false)}
            >
              <p className="text-error hover:text-opacity-50 custom-animation">
                Dismiss
              </p>
            </Button>
            <Button onClick={() => handleRestoreAccount()}>Confirm</Button>
          </div>
        </Modal>
      )}

      {selectedRow && deleteModelOpen && (
        <Modal
          isOpen={deleteModelOpen}
          onClose={() => setDeleteModelOpen(false)}
          className="flex flex-col gap-5"
        >
          {isDeleted ? (
            <p className="text-error">
              Do you want to delete this account permanently ?
            </p>
          ) : (
            <p>Do you want to move this account to recycle bin?</p>
          )}

          <div className="flex items-center justify-end gap-3">
            <Button
              className="bg-transparent"
              onClick={() => setDeleteModelOpen(false)}
            >
              <p className="text-error hover:text-opacity-50 custom-animation">
                Dismiss
              </p>
            </Button>
            <Button onClick={() => handleDeleteAccount()}>Confirm</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
