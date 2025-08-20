// src/store/resultsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Result = {
  testId: string;
  correctAnswers: number;
  totalQuestions: number;
  answers: { questionId: number; answer: string; isCorrect: boolean }[];
};

type ResultsState = {
  results: Result[];
};

const initialState: ResultsState = {
  results: [{
    testId:"js",
    correctAnswers: 10,
    totalQuestions: 10,
    answers: [{ questionId: 10, answer: "B" ,isCorrect: true }]
  }],
};


const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<Result>) => {
      state.results.push(action.payload);
    },
    clearResults: (state) => {
      state.results = [];
    },
  },
});

export const { addResult, clearResults } = resultsSlice.actions;
export default resultsSlice.reducer;
