// src/store/resultsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultsState, ResultType } from "../types";



// 1 hafta oldingi sana
const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

const initialState: ResultsState = {
  results: [
    {
      testId: "js",
      correctAnswers: 10,
      totalQuestions: 10,
      answers: [{ questionId: 10, answer: "B", isCorrect: true }],
      createdAt: oneWeekAgo, // 1 hafta oldingi sana
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
        createdAt: new Date(), // yangi qo‘shilganda bugungi sana
      });
    },
    clearResults: (state) => {
      state.results = [];
    },
  },
});

export const { addResult, clearResults } = resultsSlice.actions;
export default resultsSlice.reducer;
