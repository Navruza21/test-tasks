import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Achievement, Result, UserState } from "../types";


const initialState: UserState = {
  name: "Navruza",
  surname: "Sadinova",
  balance: 120,
  testsCompleted: 3,
  averageScore: 0,
  results: [
    { id: 1, testName: "React Basics", score: 90, date: "2025-08-01" },
    { id: 2, testName: "JavaScript Advanced", score: 80, date: "2025-08-05" },
    { id: 3, testName: "Redux Toolkit", score: 85, date: "2025-08-10" },
  ],
  achievements: [
    {
      id: 1,
      title: "JS Гуру",
      description: "Получил 100% на продвинутом тесте по JavaScript",
    },
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
    addAchievement: (state, action: PayloadAction<Achievement>) => {
      state.achievements.push(action.payload);
    },
  },
});

export const { addResult, addBalance, addAchievement } = userSlice.actions;
export default userSlice.reducer;
