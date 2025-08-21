// src/store/balanceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BalanceState } from "../types";



const initialState: BalanceState = {
  balance: 1000,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    minusResult:(state, action: PayloadAction<number>) => {
      state.balance -= action.payload; 
    },
    addResult: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    clearBalance: (state) => {
      state.balance = 0;
    },
  },
});

export const { addResult, clearBalance,minusResult } = balanceSlice.actions;
export default balanceSlice.reducer;
