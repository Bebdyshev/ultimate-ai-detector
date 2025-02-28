"use client";

import { useState, useEffect } from "react";

type OptionType = {
  label: string;
  value: string;
  percent?: string;
};

type FuturesProps = {
  onSubmit: (data: { type: string; pair: string; long: string; short: string }) => void;
  onCancel: () => void;
};

const Futures = ({ onSubmit, onCancel }: FuturesProps) => {
  const [type, setType] = useState("Фьючерс-Фьючерс");
  const [pair, setPair] = useState("VTHOUSDT");
  const [long, setLong] = useState("XT");
  const [short, setShort] = useState("LBank");

  const pairs: OptionType[] = [
    { label: "VTHOUSDT", value: "VTHOUSDT", percent: "2.8%" },
    { label: "SWEATUSDT", value: "SWEATUSDT", percent: "2.61%" },
    { label: "ONTUSDT", value: "ONTUSDT", percent: "2.03%" },
    { label: "SENDUSDT", value: "SENDUSDT", percent: "1.14%" },
    { label: "OTHUSDT", value: "OTHUSDT", percent: "2.31%" },
  ];

  const exchanges: OptionType[] = [
    { label: "XT", value: "XT", percent: "-3.00%" },
    { label: "Binance", value: "Binance", percent: "-1.20%" },
    { label: "KuCoin", value: "KuCoin", percent: "-2.50%" },
    { label: "LBank", value: "LBank", percent: "-0.20%" },
    { label: "Huobi", value: "Huobi", percent: "-0.50%" },
    { label: "OKX", value: "OKX", percent: "-1.10%" },
  ];

  // Закрытие попапа при нажатии Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className="w-full max-w-4xl p-6 bg-white dark:bg-[#1a1a1c] dark:text-white text-black rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Настройки Фьючерса
      </h2>

      {/* Верхняя строка: Тип и Пара */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Тип */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Тип</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 border rounded-md text-gray-700 dark:text-white bg-gray-50 dark:bg-[#29292b] border-gray-300 dark:border-gray-800 focus:ring-2 focus:ring-[#ef5131] focus:outline-none"
          >
            <option>Фьючерс-Фьючерс</option>
          </select>
        </div>

        {/* Пара */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Пара</label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="px-4 py-2 border rounded-md text-gray-700 dark:text-white bg-gray-50 dark:bg-[#29292b] border-gray-300 dark:border-gray-800 focus:ring-2 focus:ring-[#ef5131] focus:outline-none"
          >
            {pairs.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label} {p.percent && `(${p.percent})`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Нижняя строка: Лонг и Шорт */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Лонг */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Лонг</label>
          <select
            value={long}
            onChange={(e) => setLong(e.target.value)}
            className="px-4 py-2 border rounded-md text-gray-700 dark:text-white bg-gray-50 dark:bg-[#29292b] border-gray-300 dark:border-gray-800 focus:ring-2 focus:ring-[#ef5131] focus:outline-none"
          >
            {exchanges.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label} {l.percent && `(${l.percent})`}
              </option>
            ))}
          </select>
        </div>

        {/* Шорт */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Шорт</label>
          <select
            value={short}
            onChange={(e) => setShort(e.target.value)}
            className="px-4 py-2 border rounded-md text-gray-700 dark:text-white bg-gray-50 dark:bg-[#29292b] border-gray-300 dark:border-gray-800 focus:ring-2 focus:ring-[#ef5131] focus:outline-none"
          >
            {exchanges.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label} {s.percent && `(${s.percent})`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300 focus:outline-none"
        >
          Отмена
        </button>
        <button
          onClick={() => onSubmit({ type, pair, long, short })}
          className="px-4 py-2 bg-[#ef5131] text-white rounded-md hover:bg-[#e34627] transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default Futures;
