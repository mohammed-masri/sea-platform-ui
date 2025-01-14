"use client";
import { useGetQueryParam } from "@/hooks/useGetQueryParam";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Icon,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableColumn,
} from "sea-react-components";
import { pushNewAlert } from "@/store/slices/alert/slice";
import { ApplicationStatuses, IApplication } from "@/dto/application";
import {
  ApplicationSliceActions,
  selectApplications,
  selectApplicationsData,
} from "@/store/slices/application/slice";
import ApplicationActionInstance from "@/store/slices/application/actions";
import ApplicationStatusBadge from "@/components/application-status-badge";
import Image from "next/image";

type ActionMenuProps = {
  row: IApplication;
  setSelectedRow: (row: IApplication) => void;
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
              <Link href={`/applications/${row.id}/update`}>
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

export default function ApplicationsTable() {
  const dispatch = useAppDispatch();

  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IApplication | undefined>(
    undefined
  );

  const columns: TableColumn<IApplication>[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "status",
      label: "Status",
      custom: (row) => (
        <div className="flex">
          <ApplicationStatusBadge status={row.status} />
        </div>
      ),
    },
    {
      key: "icon",
      label: "Icon",
      custom: (row) => (
        <div className="flex">
          {row.iconFile && (
            <Image
              src={row.iconFile.URL}
              alt={row.name + " icon"}
              width={50}
              height={50}
            />
          )}
        </div>
      ),
    },
    {
      key: "URL",
      label: "URL",
      custom: (row) => (
        <Link
          target="_blank"
          href={row.URL}
          className="text-primary hover:text-opacity-50 underline custom-animation"
        >
          Open Application
        </Link>
      ),
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

  const { limit, page, query, totalPages, status } = useAppSelector(
    selectApplicationsData
  );
  const {
    setLimit,
    setPage,
    setQuery,
    setTotalCount,
    setTotalPages,
    setApplicationsData,
    setStatus,
    removeApplication,
  } = ApplicationSliceActions;
  const applications = useAppSelector((state) =>
    selectApplications(state, page)
  );

  const updateParams = useUpdateQueryParams();
  const getParam = useGetQueryParam();

  useEffect(() => {
    ApplicationActionInstance.getApplications(page, limit, query, status).then(
      (response) => {
        const { data, page: p, totalCount: tc, totalPages: tp } = response;
        dispatch(setTotalCount(tc));
        dispatch(setTotalPages(tp));
        dispatch(
          setApplicationsData({
            applications: data,
            page: p,
          })
        );
      }
    );
  }, [
    page,
    query,
    limit,
    dispatch,
    setTotalCount,
    setTotalPages,
    setApplicationsData,
    status,
  ]);

  const handleDeleteApplication = () => {
    if (selectedRow) {
      ApplicationActionInstance.deleteApplication(selectedRow.id)
        .then((response) => {
          console.log(response);
          dispatch(
            pushNewAlert({
              message: "The application has been deleted successfully",
              theme: "light",
              type: "success",
            })
          );
          dispatch(
            removeApplication({
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
          rows={applications}
          title="Applications Table"
          name="application"
          page={page}
          setPage={(page) => dispatch(setPage(page))}
          totalPages={totalPages}
          rowsPerPage={limit}
          setRowsPerPage={(limit) => dispatch(setLimit(limit))}
          query={query}
          setQuery={(query) => dispatch(setQuery(query))}
          filters={[
            {
              label: "Status",
              name: "status",
              options: Object.values(ApplicationStatuses).map((value) => ({
                label: value.replaceAll("-", " "),
                value,
              })),
              value: status,
              setValue: (newValue) => dispatch(setStatus(newValue)),
            },
          ]}
          updateParams={updateParams}
          getParam={getParam}
        />
      </Paper>

      <Drawer isOpen={viewDrawerOpen} onClose={() => setViewDrawerOpen(false)}>
        <div className="flex flex-col gap-5">
          <h3 className="font-semibold text-black text-2xl">
            Application Details
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              {selectedRow && selectedRow.iconFile && (
                <Image
                  src={selectedRow.iconFile.URL}
                  alt={selectedRow.name + " icon"}
                  width={50}
                  height={50}
                />
              )}
              <p className="text-xl text-secondary">{selectedRow?.name}</p>
              {selectedRow && (
                <ApplicationStatusBadge status={selectedRow?.status} />
              )}
            </div>

            <div className="flex gap-1 items-center">
              <p className="text-black">Description:</p>
              <p className="text-text">{selectedRow?.description}</p>
            </div>
            <div className="flex gap-1 items-center">
              {selectedRow && (
                <Link
                  target="_blank"
                  href={selectedRow.URL}
                  className="text-primary hover:text-opacity-50 underline custom-animation"
                >
                  Open Application
                </Link>
              )}
            </div>
          </div>
        </div>
      </Drawer>

      {selectedRow && deleteModelOpen && (
        <Modal
          isOpen={deleteModelOpen}
          onClose={() => setDeleteModelOpen(false)}
          className="flex flex-col gap-5"
        >
          <p>Do you want to delete this application?</p>
          <div className="flex items-center justify-end gap-3">
            <Button
              className="bg-transparent"
              onClick={() => setDeleteModelOpen(false)}
            >
              <p className="text-error hover:text-opacity-50 custom-animation">
                Dismiss
              </p>
            </Button>
            <Button onClick={() => handleDeleteApplication()}>Confirm</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
