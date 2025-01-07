"use client";
import { AccountTypes } from "@/dto/account";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import RoleActionInstance from "@/store/slices/role/actions";
import { RoleSliceActions, selectAllRoles } from "@/store/slices/role/slice";
import { useEffect } from "react";

const useRoles = (type: AccountTypes | "all", page: number, limit: number) => {
  const dispatch = useAppDispatch();
  const roles = useAppSelector(selectAllRoles);

  const { setTotalCount, setTotalPages, setRolesData } = RoleSliceActions;

  useEffect(() => {
    RoleActionInstance.getRoles(page, limit, "", type).then((response) => {
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
  }, [dispatch, setTotalCount, setTotalPages, setRolesData, type, page, limit]);

  return roles;
};

export default useRoles;
