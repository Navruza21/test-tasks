// src/store/resultsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultsState, ResultType } from "../types";

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

const initialState: ResultsState = {
  results: [
    {
      testId: "js",
      correctAnswers: 10,
      totalQuestions: 10,
      answers: [{ questionId: 10, answer: "B", isCorrect: true }],
      createdAt: oneWeekAgo,
    },
  ],
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<ResultType>) => {
      state.results.push({
        ...action.payload,
        createdAt: new Date(), 
      });
    },
    clearResults: (state) => {
      state.results = [];
    },
  },
});

export const { addResult, clearResults } = resultsSlice.actions;
export default resultsSlice.reducer;
