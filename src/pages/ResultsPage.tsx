import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function ResultsPage() {
  const results = useSelector((state: RootState) => state.results.results);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Последние результаты
      </h1>

      {results.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg shadow">
          <p className="text-gray-500 text-lg">🚀 пока результатов нет</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((r, index) => {
            const percent = Math.round(
              (r.correctAnswers / r.totalQuestions) * 100
            );

            return (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">
                    📝 Тест {r.testId}
                  </span>
                  <span
                    className={`font-bold ${
                      percent >= 80
                        ? "text-green-600"
                        : percent >= 50
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {percent}%
                  </span>
                </div>

                {/* progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      percent >= 80
                        ? "bg-green-500"
                        : percent >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Правильные ответы:{" "}
                  <span className="font-medium">
                    {r.correctAnswers}/{r.totalQuestions}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
