'use client';

import { useState } from 'react';
import { useTourStore } from '@/lib/store';
import { FaExchangeAlt } from 'react-icons/fa';

export default function CurrencyConverter() {
  const { exchangeRate, setExchangeRate } = useTourStore();
  const [twdAmount, setTwdAmount] = useState('');
  const [krwAmount, setKrwAmount] = useState('');

  const handleTwdChange = (value: string) => {
    setTwdAmount(value);
    if (value) {
      const converted = parseFloat(value) * exchangeRate;
      setKrwAmount(converted.toFixed(0));
    } else {
      setKrwAmount('');
    }
  };

  const handleKrwChange = (value: string) => {
    setKrwAmount(value);
    if (value) {
      const converted = parseFloat(value) / exchangeRate;
      setTwdAmount(converted.toFixed(2));
    } else {
      setTwdAmount('');
    }
  };

  const commonAmounts = [
    { twd: 100, label: '100 TWD' },
    { twd: 300, label: '300 TWD' },
    { twd: 500, label: '500 TWD' },
    { twd: 1000, label: '1,000 TWD' },
  ];

  return (
    <section className="bg-white rounded-3xl p-8 shadow-xl animate-fadeIn">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 flex items-center gap-3">
        💱 환율 계산기
      </h2>

      {/* Exchange Rate Setting */}
      <div className="bg-gray-50 p-6 rounded-2xl mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          환율 설정 (1 TWD = ? KRW)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={exchangeRate}
            onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 0)}
            step="0.1"
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg font-medium"
          />
          <span className="text-gray-600 font-medium">KRW</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * 2025년 1월 기준 약 37.5원 (실시간 환율 확인 필요)
        </p>
      </div>

      {/* Converter */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* TWD Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            대만 달러 (TWD)
          </label>
          <div className="relative">
            <input
              type="number"
              value={twdAmount}
              onChange={(e) => handleTwdChange(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-2xl font-bold text-gray-800"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
              TWD
            </span>
          </div>
        </div>

        {/* KRW Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            한국 원 (KRW)
          </label>
          <div className="relative">
            <input
              type="number"
              value={krwAmount}
              onChange={(e) => handleKrwChange(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-2xl font-bold text-gray-800"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
              KRW
            </span>
          </div>
        </div>
      </div>

      {/* Quick Conversion */}
      <div>
        <h3 className="text-lg font-bold text-gray-700 mb-3">빠른 계산</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {commonAmounts.map((amount) => (
            <button
              key={amount.twd}
              onClick={() => handleTwdChange(amount.twd.toString())}
              className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white p-4 rounded-xl font-medium transition-all shadow-md"
            >
              <div className="text-sm opacity-90">{amount.label}</div>
              <div className="text-lg font-bold">
                ≈ {(amount.twd * exchangeRate).toLocaleString()}원
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Exchange Icon */}
      <div className="text-center mt-6">
        <FaExchangeAlt className="inline-block text-4xl text-pink-400 animate-pulse" />
      </div>
    </section>
  );
}
