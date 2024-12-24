import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import layoutReducer from "./slices/layout/slice";
import alertReducer from "./slices/alert/slice";
import authReducer from "./slices/auth/slice";
import accountReducer from "./slices/account/account-slice";
import accountTypeReducer from "./slices/account/account-type-slice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  layout: layoutReducer,
  alert: alertReducer,
  auth: authReducer,
  account: accountReducer,
  "account-type": accountTypeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
