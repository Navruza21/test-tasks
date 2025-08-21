import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ResultsPage } from "../../components/TestResults";

export default function TestDetailPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: number; answer: string; isCorrect: boolean }[]
  >([]);

  const { id } = useParams();

  const test = useSelector((state: RootState) =>
    state.tests.categories.find((t) => t.id === id)
  );

  if (!test) {
    return (
      <div className="p-6 text-center text-red-600 text-lg">
        Тестов пока нет
      </div>
    );
  }

  const question = test.questions[current];

  const handleSelect = (option: string) => {
    setSelected(option);
    setResult(null);
  };

  const handleSubmit = () => {
    if (!selected) return;

    const isCorrect = selected === question.answer;

    setAnswers((prev) => [
      ...prev,
      { questionId: current + 1, answer: selected, isCorrect },
    ]);

    if (isCorrect) {
      setResult("Правильный ответ!");
      setCorrectCount((prev) => prev + 1);
    } else {
      setResult("Неправильный ответ.");
    }
  };

  const handleNext = () => {
    if (current < test.questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setResult(null);
    } else {
      setFinished(true);
    }
  };

  if (finished && id) {
    return (
      <ResultsPage
        testId={id}
        answers={answers}
        correctCount={correctCount}
        total={test.questions.length}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 border rounded-2xl shadow-lg bg-white">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        {test.title} тест
      </h1>

      <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-700">
        Вопрос {current + 1} из {test.questions.length}
      </h2>

      <p className="text-lg sm:text-xl font-medium mb-4 text-gray-800">
        {question.question}
      </p>

      <div className="flex flex-col gap-3">
        {question.options.map((option: string, index: number) => (
          <label
            key={index}
            className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition text-sm sm:text-base ${
              selected === option
                ? "bg-blue-100 border-blue-500"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selected === option}
              onChange={() => handleSelect(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      {!result && (
        <button
          onClick={handleSubmit}
          className="mt-6 w-full sm:w-auto px-5 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={!selected}
        >
          Ответить
        </button>
      )}

      {result && (
        <div className="mt-6 flex flex-col gap-4">
          <div
            className={`p-3 rounded-lg text-center font-medium text-sm sm:text-base ${
              result.includes("Правильный")
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {result}
          </div>
          <button
            type="submit"
            onClick={handleNext}
            className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition"
          >
            Следующий вопрос
          </button>
        </div>
      )}
    </div>
  );
}
