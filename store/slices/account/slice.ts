import { AccountTypes, IAccount } from "@/dto/account";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AccountsPage = Record<number, IAccount[]>;

interface State {
  totalCount: number;
  page: number;
  limit: number;
  data: AccountsPage;
  totalPages: number;
  query: string;
  type: AccountTypes | "";
}

const initialState: State = {
  totalCount: 0,
  totalPages: 1,
  data: {},
  page: 1,
  limit: 10,
  query: "",
  type: "",
};

const slice = createSlice({
  name: "account",
  initialState,
  reducers: {
    pushNewAccount: (state, action: PayloadAction<IAccount>) => {
      const newAccount = action.payload;
      let dataInPageOne: IAccount[] = state.data[1] || [];
      dataInPageOne = [newAccount, ...dataInPageOne];
      state.data[1] = dataInPageOne;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setAccountsData: (
      state,
      action: PayloadAction<{ page: number; accounts: IAccount[] }>
    ) => {
      const { accounts, page } = action.payload;

      state.page = page;

      state.data[page] = accounts;
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
    setType: (state, action: PayloadAction<AccountTypes | "">) => {
      state.type = action.payload;
    },
  },
});

export const AccountSliceActions = slice.actions;

export const selectAccounts = (state: RootState, page: number) =>
  state.account.data[page] ? state.account.data[page] : [];

export const selectAccountsData = (state: RootState) => ({
  limit: state.account.limit,
  page: state.account.page,
  query: state.account.query,
  totalCount: state.account.totalCount,
  totalPages: state.account.totalPages,
  type: state.account.type,
});

const accountReducer = slice.reducer;

export default accountReducer;
