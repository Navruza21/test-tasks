"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResult,minusResult,clearBalance } from "../features/balance/balanceSlice";
import { RootState } from "../app/store";

export default function BalancePage() {
  const balance = useSelector((state: RootState) => state.balance.balance); // store'dan olish
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");

  const handleAddBalance = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      dispatch(addResult(value));
      setAmount("");
    }
  };

  const handleMinusBalance = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0 && balance >= value) {
      dispatch(minusResult(value));
      setAmount("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        💳 Баланс
      </h2>

      {/* Hozirgi balans */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600">Ваш текущий баланс:</p>
        <p className="text-3xl font-bold text-green-600">{balance} $</p>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Введите сумму"
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tugmalar */}
      <div className="flex justify-between gap-2">
        <button
          onClick={handleAddBalance}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
        >
          Пополнить
        </button>

        <button
          onClick={handleMinusBalance}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
        >
          Снять
        </button>

        <button
          onClick={() => dispatch(clearBalance())}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
        >
          Обнулить
        </button>
      </div>
    </div>
  );
}
