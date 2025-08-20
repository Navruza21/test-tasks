import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import testsReducer from "../features/tests/testsSlice";
import resultsReducer from "../features/results/resultsSlice";
import balanceReducer from "../features/balance/balanceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tests: testsReducer,
    results: resultsReducer,
    balance: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
