import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Result {
  id: number;
  testName: string;
  score: number;
  date: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
}

interface UserState {
  name: string;
  surname: string;
  balance: number;
  testsCompleted: number;
  averageScore: number;
  results: Result[];
  achievements: Achievement[];
}

const initialState: UserState = {
  name: "Navruza",
  surname: "Sadinova",
  balance: 120,
  testsCompleted: 3,
  averageScore: 85,
  results: [
    { id: 1, testName: "React Basics", score: 90, date: "2025-08-01" },
    { id: 2, testName: "JavaScript Advanced", score: 80, date: "2025-08-05" },
    { id: 3, testName: "Redux Toolkit", score: 85, date: "2025-08-10" },
  ],
  achievements: [
    { id: 1, title: "JS Guru", description: "Scored 100% in JS Advanced" },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<Result>) => {
      state.results.push(action.payload);
      state.testsCompleted++;
      state.averageScore =
        state.results.reduce((acc, r) => acc + r.score, 0) /
        state.results.length;
    },
    addBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
  },
});

export const { addResult, addBalance } = userSlice.actions;
export default userSlice.reducer;
