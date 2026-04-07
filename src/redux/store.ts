import { configureStore } from "@reduxjs/toolkit";
import { nhoruApi } from "./api";

export const store = configureStore({
  reducer: {
    [nhoruApi.reducerPath]: nhoruApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nhoruApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

