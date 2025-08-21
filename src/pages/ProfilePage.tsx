import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function ProfilePage() {
  const results = useSelector((state: RootState) => state.results.results);
  const balance = useSelector((state: RootState) => state.balance.balance);
  const user = useSelector((state: RootState) => state.user);

  const percentages = results.map(
    (r) => (r.correctAnswers / r.totalQuestions) * 100
  );

  const average =
    percentages.length > 0
      ? percentages.reduce((a, b) => a + b, 0) / percentages.length
      : 0;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b pb-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">
              {user?.name || "User"}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Баланс: <span className="font-medium">{balance} $</span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Пройдено тестов:{" "}
              <span className="font-medium">{results.length}</span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Средный результат:{" "}
              <span className="font-medium">{Math.round(average)}%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3">
          Последние результаты
        </h3>
        {results.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base">
            Пока резултатов нет
          </p>
        ) : (
          <div className="overflow-x-auto">
            <ul className="space-y-2 min-w-[200px]">
              {results.map((r, index) => {
                const percent = Math.round(
                  (r.correctAnswers / r.totalQuestions) * 100
                );
                return (
                  <li
                    key={index}
                    className="border rounded-lg px-3 sm:px-4 py-2 flex justify-between items-center shadow-sm bg-white text-sm sm:text-base"
                  >
                    <span className="text-gray-700 font-medium">
                      Тест {r.testId}
                    </span>
                    <span className="text-gray-800">
                      {r.correctAnswers}/{r.totalQuestions} ({percent}%)
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
