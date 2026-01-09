'use client';

import { useState, useEffect } from 'react';
import { useTourStore } from '@/lib/store';

export default function Header() {
  const { tripStartDate, setTripStartDate } = useTourStore();
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [isOnTrip, setIsOnTrip] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!tripStartDate) return;

    const calculateDays = () => {
      const start = new Date(tripStartDate);
      const now = new Date();
      const diff = start.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (days < 0 && days > -5) {
        setIsOnTrip(true);
        setDaysRemaining(Math.abs(days) + 1);
      } else if (days >= 0) {
        setIsOnTrip(false);
        setDaysRemaining(days);
      } else {
        setIsOnTrip(false);
        setDaysRemaining(null);
      }
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, [tripStartDate]);

  return (
    <header className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-8 rounded-3xl shadow-2xl mb-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
          🌴 대만 타이중 4박 5일 여행 🌴
        </h1>
        <p className="text-lg md:text-xl opacity-95">커플 여행 완벽 가이드</p>

        {/* D-Day Counter */}
        <div className="mt-6">
          {!tripStartDate && (
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all backdrop-blur-sm"
            >
              📅 여행 시작일 설정하기
            </button>
          )}

          {showDatePicker && (
            <div className="mt-4 inline-block bg-white/90 p-4 rounded-2xl backdrop-blur-sm">
              <input
                type="date"
                className="px-4 py-2 rounded-lg text-gray-800 font-medium"
                onChange={(e) => {
                  setTripStartDate(e.target.value);
                  setShowDatePicker(false);
                }}
              />
            </div>
          )}

          {tripStartDate && daysRemaining !== null && (
            <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full inline-block mt-4">
              {isOnTrip ? (
                <div className="text-2xl font-bold">
                  🎉 여행 {daysRemaining}일차 진행 중! 🎉
                </div>
              ) : daysRemaining === 0 ? (
                <div className="text-2xl font-bold">🎊 오늘 출발! 🎊</div>
              ) : (
                <div className="text-2xl font-bold">
                  D-{daysRemaining} ✈️
                </div>
              )}
            </div>
          )}

          {tripStartDate && (
            <button
              onClick={() => {
                setTripStartDate(null);
                setShowDatePicker(false);
              }}
              className="ml-4 text-sm opacity-75 hover:opacity-100 underline"
            >
              날짜 재설정
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
