import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useState } from "react";
import { clearResults } from "../features/results/resultsSlice";

export default function ResultsPage() {
  const results = useSelector((state: RootState) => state.results.results);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<"all" | "day" | "week">("all");
  const now = new Date();
  const filteredResults = results.filter((r) => {
    if (!r.createdAt) return true; // createdAt yo‘q bo‘lsa, chiqaramiz
    const createdDate = new Date(r.createdAt);

    if (filter === "day") {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(now.getDate() - 1);
      return createdDate >= oneDayAgo;
    }

    if (filter === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return createdDate >= oneWeekAgo;
    }

    return true; // "all"
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
          Последние результаты
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "day" | "week")}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Все результаты</option>
          <option value="day">Последние 1 день</option>
          <option value="week">Последние 1 неделя</option>
        </select>
      </div>

      {filteredResults.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg shadow">
          <p className="text-gray-500 text-base sm:text-lg">
            🚀 пока результатов нет
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((r, index) => {
            const percent = Math.round(
              (r.correctAnswers / r.totalQuestions) * 100
            );

            return (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                  <span className="font-semibold text-gray-700 text-base sm:text-lg">
                    📝 Тест {r.testId}
                  </span>
                  <span
                    className={`font-bold text-lg sm:text-xl ${
                      percent >= 80
                        ? "text-blue-600"
                        : percent >= 50
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {percent}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                  <div
                    className={`h-2 sm:h-3 rounded-full ${
                      percent >= 80
                        ? "bg-blue-500"
                        : percent >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                  Правильные ответы:{" "}
                  <span className="font-medium">
                    {r.correctAnswers}/{r.totalQuestions}
                  </span>
                </p>

                {r.createdAt && (
                  <p className="mt-1 text-xs text-gray-400">
                    Дата: {new Date(r.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            );
          })}
          <button
            onClick={() => dispatch(clearResults())}
            className="w-full flex items-center justify-center gap-2 
             bg-gradient-to-r from-blue-500 to-blue-600 
             hover:from-blue-600 hover:to-blue-700
             text-white font-semibold py-3 rounded-2xl 
             shadow-md hover:shadow-lg transition-all duration-300 
             active:scale-95"
          >
            Очистить все результаты
          </button>
        </div>
      )}
    </div>
  );
}
