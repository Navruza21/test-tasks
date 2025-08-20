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
      navigate(`/tests/${testId}`); // sahifaga o'tish
    } else {
      alert("На вашем счете недостаточно средств.Пожалуйста пополните всой баланс");
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((test) => (
        <div
          key={test.id}
          className="p-6 bg-white shadow rounded-lg flex flex-col justify-between"
        >
          <h2 className="text-xl font-bold">{test.title}</h2>
          <p className="text-gray-600">{test.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Количество вопросов: {test.questions.length}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            при 100% результате можете получить на счет {test.win}$
          </p>
          <button
            onClick={() => StartTest(test.price, test.id)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Начать тест за {test.price}$
          </button>
        </div>
      ))}
    </div>
  );
}
