import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertTypes, AlertThemes } from "sea-react-components";

type Alert = { message: string; type: AlertTypes; theme: AlertThemes };

interface State {
  alerts: Alert[];
}

const initialState: State = {
  alerts: [],
};

const slice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    pushNewAlert: (state, action: PayloadAction<Alert>) => {
      const newAlert = action.payload;
      state.alerts = [newAlert, ...state.alerts];
    },
    removeAlert: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.alerts.length) {
        state.alerts.splice(index, 1);
      }
    },
  },
});

export const { pushNewAlert, removeAlert } = slice.actions;

export const selectAlerts = (state: RootState) => state.alert.alerts;

const alertReducer = slice.reducer;

export default alertReducer;
