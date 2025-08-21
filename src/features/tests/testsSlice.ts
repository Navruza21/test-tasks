import { createSlice } from "@reduxjs/toolkit";
import { TestsState } from "../types";

const initialState: TestsState = {
  categories: [
    {
      id: "react",
      title: "React",
      description: "Проверьте свои знания по React",
      questions: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        question: `Вопрос № ${i + 1} по React`,
        options: ["A", "B", "C", "D"],
        answer: "A",
      })),
      price:200,
      win:250,
    },
    {
      id: "js",
      title: "JavaScript",
      description: "Проверьте свои знания по JS",
      questions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1, 
        question: `JS Вопрос № ${i + 1} по JS`,
        options: ["A", "B", "C", "D"],
        answer: "B",
      })),
      price:150,
      win:200
    },
    {
      id: "ts",
      title: "TypeScript",
      description: "Проверьте свои знания по TS",
      questions: Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        question: `TS Вопрос № ${i + 1} по TS`,
        options: ["A", "B", "C", "D"],
        answer: "C",
      })),
      price:100,
      win:150
    },
  ],
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},
});

export default testsSlice.reducer;
