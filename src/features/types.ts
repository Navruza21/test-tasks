export interface Result {
  id: number;
  testName: string;
  score: number;
  date: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
}

export interface UserState {
  name: string;
  surname: string;
  balance: number;
  testsCompleted: number;
  averageScore: number;
  results: Result[];
  achievements: Achievement[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface TestCategory {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  price: number;
  win: number;
}

export interface TestsState {
  categories: TestCategory[];
}

export type ResultType = {
  testId: string;
  correctAnswers: number;
  totalQuestions: number;
  answers: { questionId: number; answer: string; isCorrect: boolean }[];
  createdAt: Date;
};

export type ResultsState = {
  results: ResultType[];
};

export type BalanceState = {
  balance: number;
};
