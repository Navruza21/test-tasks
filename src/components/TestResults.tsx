import { useDispatch, useSelector } from "react-redux";
import { addResult } from "../features/results/resultsSlice";
import { RootState } from "../app/store";
import { addResult as addBalance } from "../features/balance/balanceSlice";
import { useState } from "react";
import { addAchievement } from "../features/user/userSlice";

export const ResultsPage = ({
  testId,
  answers,
  correctCount,
  total,
}: {
  testId: string;
  answers: { questionId: number; answer: string; isCorrect: boolean }[];
  correctCount: number;
  total: number;
}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.tests.categories);
  const results = useSelector((state: RootState) => state.results.results);
  const [saved, setSaved] = useState(false);

  const handleSaveResult = (correct: number, total: number, testId: string) => {
    // Tekshirish: shu testId allaqachon saqlanganmi?
    const alreadyExists = results.some((res) => res.testId === testId);
    if (alreadyExists) {
      alert("Этот результат уже сохранен!");
      return;
    }

    // Agar hammasi to'g'ri javob bo'lsa, balans qo‘shamiz
    const test = categories.find((test) => test.id === testId);
    if (correct === total && test) {
      dispatch(addBalance(test.win));

      dispatch(
        addAchievement({
          id: new Date().getTime(),
          title: `${test.title} Master`,
          description: `Вы прошли тест "${test.title}" без ошибок и выиграли ${test.win} $!`,
        })
      );

      alert(`Вы выиграли ${test.win} $`);
    }

    // Yangi result qo‘shish
    dispatch(
      addResult({
        testId,
        correctAnswers: correct,
        totalQuestions: total,
        answers,
        createdAt: new Date(),
      })
    );

    setSaved(true); // bosilgandan keyin disable qilamiz
  };

  console.log(answers)
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Итог теста
      </h2>

      <div className="bg-gray-50 rounded-xl p-4 text-center mb-6">
        <p className="text-lg text-gray-700">
          Вы ответили правильно на{" "}
          <span className="font-semibold text-green-600">{correctCount}</span>{" "}
          из <span className="font-semibold">{total}</span> вопросов.
        </p>
        <p className="mt-2 text-gray-500 text-sm">
          Тест ID: <span className="font-medium">{testId}</span>
        </p>
      </div>
      {answers.map((ans) => (
        <div key={ans.questionId} className="mb-3">
          <p className="font-medium">
            Q{ans.questionId}: Ваш ответ:{" "}
            <span className={ans.isCorrect ? "text-green-600" : "text-red-600"}>
              {ans.answer}
            </span>
          </p>
        </div>
      ))}

      <button
        onClick={() => handleSaveResult(correctCount, total, testId)}
        disabled={saved}
        className={`w-full ${
          saved
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold py-2 px-4 rounded-xl transition duration-300`}
      >
        {saved ? "Результат сохранен" : "Сохранить результат"}
      </button>
    </div>
  );
};
