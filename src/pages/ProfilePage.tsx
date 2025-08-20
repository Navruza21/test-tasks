import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addResult } from "../features/balance/balanceSlice";

export default function ProfilePage() {
  const results = useSelector((state: RootState) => state.results.results);
  const balance = useSelector((state: RootState) => state.balance.balance);
  const user = useSelector((state: RootState) => state.user);

  // Har bir test uchun % hisoblash
  const percentages = results.map(
    (r) => (r.correctAnswers / r.totalQuestions) * 100
  );

  // O‘rtacha foiz
  const average =
    percentages.length > 0
      ? percentages.reduce((a, b) => a + b, 0) / percentages.length
      : 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* User Info */}
      <div>
        <div className="flex items-center gap-4 border-b pb-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
            <p className="text-gray-600">Баланс: {balance} $ </p>
            <p className="text-gray-600">Пройдено тестов: {results.length}</p>
            <p className="text-gray-600">
              Средный результат:{" "}
              <span className="font-medium">{Math.round(average)}%</span>
            </p>
          </div>
        </div>

     
      </div>

      {/* Test results */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Последние результаты</h3>
        {results.length === 0 ? (
          <p className="text-gray-500">Пока резултатов нет</p>
        ) : (
          <ul className="space-y-2">
            {results.map((r, index) => {
              const percent = Math.round(
                (r.correctAnswers / r.totalQuestions) * 100
              );
              return (
                <li
                  key={index}
                  className="border rounded-lg px-4 py-2 flex justify-between items-center shadow-sm bg-white"
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
        )}
      </div>
    </div>
  );
}
