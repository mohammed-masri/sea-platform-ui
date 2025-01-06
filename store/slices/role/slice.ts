import { AccountTypes } from "@/dto/account";
import { IRoleShort } from "@/dto/role";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RolesPage = Record<number, IRoleShort[]>;

interface State {
  totalCount: number;
  page: number;
  limit: number;
  data: RolesPage;
  totalPages: number;
  query: string;
  type: AccountTypes | "all";
}

const initialState: State = {
  totalCount: 0,
  totalPages: 1,
  data: {},
  page: 1,
  limit: 10,
  query: "",
  type: "all",
};

const slice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setRolesData: (
      state,
      action: PayloadAction<{ page: number; roles: IRoleShort[] }>
    ) => {
      const { roles, page } = action.payload;

      state.page = page;

      state.data[page] = roles;
    },
    removeRole: (
      state,
      action: PayloadAction<{
        id: string;
        page?: number | undefined;
      }>
    ) => {
      const { id, page } = action.payload;

      if (!state.data) return;

      if (page !== undefined) {
        state.data[page] = state.data[page]?.filter((r) => r.id !== id) || [];
      } else {
        Object.keys(state.data).forEach((key) => {
          const pageKey = Number(key);
          state.data[pageKey] =
            state.data[pageKey]?.filter((r) => r.id !== id) || [];
        });
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      const limit = action.payload;
      const isLimitChanged = limit === state.limit;
      state.limit = limit;

      if (isLimitChanged) state.data = {};
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setType: (state, action: PayloadAction<AccountTypes | "all">) => {
      state.type = action.payload;
    },
  },
});

export const RoleSliceActions = slice.actions;

export const selectRoles = (state: RootState, page: number) =>
  state.role.data[page] ? state.role.data[page] : [];

export const selectRolesData = (state: RootState) => ({
  limit: state.role.limit,
  page: state.role.page,
  query: state.role.query,
  totalCount: state.role.totalCount,
  totalPages: state.role.totalPages,
  type: state.role.type,
});

const roleReducer = slice.reducer;

export default roleReducer;
