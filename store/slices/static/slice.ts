import { AccountTypes } from "@/dto/account";
import { IPermissionResponse } from "@/dto/permission";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  permissions: IPermissionResponse | undefined;
}

const initialState: State = {
  permissions: undefined,
};

const slice = createSlice({
  name: "static",
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<IPermissionResponse>) => {
      state.permissions = action.payload;
    },
  },
});

export const StaticSliceActions = slice.actions;

export const selectPermissions = (state: RootState, type: AccountTypes) =>
  state.static.permissions ? state.static.permissions[type] : [];

const staticReducer = slice.reducer;

export default staticReducer;
