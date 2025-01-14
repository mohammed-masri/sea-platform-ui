import { ApplicationStatuses, IApplication } from "@/dto/application";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ApplicationsPage = Record<number, IApplication[]>;

interface State {
  totalCount: number;
  page: number;
  limit: number;
  data: ApplicationsPage;
  totalPages: number;
  query: string;
  status: ApplicationStatuses | "all";
}

const initialState: State = {
  totalCount: 0,
  totalPages: 1,
  data: {},
  page: 1,
  limit: 10,
  query: "",
  status: "all",
};

const slice = createSlice({
  name: "application",
  initialState,
  reducers: {
    pushNewApplication: (state, action: PayloadAction<IApplication>) => {
      const newApplication = action.payload;
      let dataInPageOne: IApplication[] = state.data[1] || [];
      dataInPageOne = [newApplication, ...dataInPageOne];
      state.data[1] = dataInPageOne;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setApplicationsData: (
      state,
      action: PayloadAction<{ page: number; applications: IApplication[] }>
    ) => {
      const { applications, page } = action.payload;

      state.page = page;

      state.data[page] = applications;
    },
    removeApplication: (
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
    setStatus: (state, action: PayloadAction<ApplicationStatuses | "all">) => {
      state.status = action.payload;
    },
  },
});

export const ApplicationSliceActions = slice.actions;

export const selectApplications = (state: RootState, page: number) =>
  state.application.data[page] ? state.application.data[page] : [];

export const selectApplicationsData = (state: RootState) => ({
  limit: state.application.limit,
  page: state.application.page,
  query: state.application.query,
  totalCount: state.application.totalCount,
  totalPages: state.application.totalPages,
  status: state.application.status,
});

const applicationReducer = slice.reducer;

export default applicationReducer;
