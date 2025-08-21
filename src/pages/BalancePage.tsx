"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResult } from "../features/balance/balanceSlice";
import { RootState } from "../app/store";

export default function BalancePage() {
  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");

  const handleAddBalance = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      dispatch(addResult(value));
      setAmount("");
    }
  };

  return (
    <div className="p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-12 h-8 text-gray-700"
          >
            <path d="M512 176C520.8 176 528 183.2 528 192L528 224L112 224L112 192C112 183.2 119.2 176 128 176L512 176zM528 288L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 288L528 288zM128 128C92.7 128 64 156.7 64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192C576 156.7 547.3 128 512 128L128 128zM144 408C144 421.3 154.7 432 168 432L216 432C229.3 432 240 421.3 240 408C240 394.7 229.3 384 216 384L168 384C154.7 384 144 394.7 144 408zM288 408C288 421.3 298.7 432 312 432L376 432C389.3 432 400 421.3 400 408C400 394.7 389.3 384 376 384L312 384C298.7 384 288 394.7 288 408z" />
          </svg>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            Баланс
          </h2>
        </div>

        <div className="text-center mb-6">
          <p className="text-base sm:text-lg text-gray-600">
            Ваш текущий баланс:
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">
            {balance} $
          </p>
        </div>

        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Введите сумму"
            className="flex-1 w-full mb-5 border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleAddBalance}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300 text-sm sm:text-base"
        >
          Пополнить
        </button>
      </div>
    </div>
  );
}
