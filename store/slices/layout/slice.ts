import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Modes = "full" | "short";
interface State {
  sidebar: {
    open: boolean;
    mode: Modes;
  };
}

const initialState: State = {
  sidebar: {
    open: true,
    mode: "full",
  },
};

const slice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleOpenSidebar: (state) => {
      state.sidebar.open = !state.sidebar.open;
    },
    setSidebarMode: (state, action: PayloadAction<Modes>) => {
      state.sidebar.mode = action.payload;
    },
    toggleMode: (state) => {
      state.sidebar.mode = state.sidebar.mode === "full" ? "short" : "full";
    },
  },
});

export const { toggleOpenSidebar, setSidebarMode, toggleMode } = slice.actions;

export const selectSidebarState = (state: RootState) => state.layout.sidebar;

const layoutReducer = slice.reducer;

export default layoutReducer;
