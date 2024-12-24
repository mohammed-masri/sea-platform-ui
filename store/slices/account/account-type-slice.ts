import { IAccountType } from "@/dto/account";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  accountTypes: IAccountType[];
}

const initialState: State = {
  accountTypes: [],
};

const slice = createSlice({
  name: "account-type",
  initialState,
  reducers: {
    setAccountTypes: (state, action: PayloadAction<IAccountType[]>) => {
      state.accountTypes = action.payload;
    },
  },
});

export const AccountTypeSliceActions = slice.actions;

export const selectAccountTypes = (state: RootState) =>
  state["account-type"].accountTypes;

const accountTypeReducer = slice.reducer;

export default accountTypeReducer;
