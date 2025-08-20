import { useDispatch, useSelector } from "react-redux";
import { addResult } from "../features/results/resultsSlice";
import { RootState } from "../app/store";
import { addResult as addBalance } from "../features/balance/balanceSlice";

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
  const handleSaveResult = (correct: number, total: number, testId: string) => {
    const test = categories.find((test) => test.id === testId);
    if (correct === total && test) {
      dispatch(addBalance(test.win));
      alert (`Вы выиграли ${test.win} $`)
    }

    dispatch(
      addResult({
        testId,
        correctAnswers: correct,
        totalQuestions: total,
        answers,
      })
    );
  };

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

      <button
        onClick={()=>handleSaveResult(correctCount, total, testId)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
      >
        Сохранить результат
      </button>
    </div>
  );
};
