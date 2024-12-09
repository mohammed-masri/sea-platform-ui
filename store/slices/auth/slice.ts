import { IAccount } from "@/dto/account";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  accessToken: string | undefined;
  account: IAccount | undefined;
}

const initialState: State = {
  accessToken: undefined,
  account: undefined,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | undefined>) => {
      state.accessToken = action.payload;
    },
    setAccountData: (state, action: PayloadAction<IAccount | undefined>) => {
      state.account = action.payload;
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.account = undefined;
    },
  },
});

export const { setAccessToken, setAccountData, logout } = slice.actions;

export const selectAccountData = (state: RootState) =>
  state.auth?.account || undefined;

export const selectAccessToken = (state: RootState) =>
  state.auth?.accessToken || undefined;

const authReducer = slice.reducer;

export default authReducer;
