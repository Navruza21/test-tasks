"use client";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { minusResult } from "../../features/balance/balanceSlice";

export default function TestsPage() {
  const categories = useSelector((state: RootState) => state.tests.categories);
  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const StartTest = (price: number, testId: string) => {
    if (balance >= price) {
      dispatch(minusResult(price));
      navigate(`/tests/${testId}`);
    } else {
      alert("На вашем счете недостаточно средств. Пожалуйста, пополните свой баланс.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((test) => (
          <div
            key={test.id}
            className="p-4 sm:p-6 bg-white shadow rounded-xl flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg sm:text-xl font-bold">{test.title}</h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              {test.description}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Количество вопросов: {test.questions.length}
            </p>
            <p className="text-sm sm:text-base text-green-700 mt-2 font-bold">
              При 100% результате получите на счет {test.win}$
            </p>
            <button
              onClick={() => StartTest(test.price, test.id)}
              className="mt-4 bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base transition-colors"
            >
              Начать тест за {test.price}$
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
