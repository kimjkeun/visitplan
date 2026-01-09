'use client';

import { useState, useEffect } from 'react';

// 여행 날짜 고정: 2026-01-12 ~ 2026-01-16
const TRIP_START_DATE = '2026-01-12';
const TRIP_END_DATE = '2026-01-16';

export default function Header() {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [isOnTrip, setIsOnTrip] = useState(false);
  const [tripEnded, setTripEnded] = useState(false);

  useEffect(() => {
    const calculateDays = () => {
      const start = new Date(TRIP_START_DATE);
      const end = new Date(TRIP_END_DATE);
      const now = new Date();

      // 시간 부분 제거 (날짜만 비교)
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      now.setHours(0, 0, 0, 0);

      const diffToStart = start.getTime() - now.getTime();
      const daysToStart = Math.ceil(diffToStart / (1000 * 60 * 60 * 24));

      // 여행 종료 확인
      if (now.getTime() > end.getTime()) {
        setTripEnded(true);
        setIsOnTrip(false);
        setDaysRemaining(null);
        return;
      }

      // 여행 중 (1일차 ~ 5일차)
      if (now.getTime() >= start.getTime() && now.getTime() <= end.getTime()) {
        setIsOnTrip(true);
        const diffFromStart = now.getTime() - start.getTime();
        const currentDay = Math.floor(diffFromStart / (1000 * 60 * 60 * 24)) + 1;
        setDaysRemaining(currentDay);
        setTripEnded(false);
      }
      // 여행 전
      else if (daysToStart >= 0) {
        setIsOnTrip(false);
        setDaysRemaining(daysToStart);
        setTripEnded(false);
      }
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative bg-gray-800 text-white p-8 rounded-3xl shadow-2xl mb-8 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/taiwan-header.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-2xl">
          타이중 방학여행
        </h1>
        <p className="text-md md:text-lg opacity-95 mt-2 drop-shadow-lg">
          📅 2026.01.12 (일) ~ 01.16 (목)
        </p>

        {/* D-Day Counter */}
        <div className="mt-6">
          {tripEnded ? (
            <div className="bg-white/25 backdrop-blur-md px-8 py-4 rounded-full inline-block border border-white/30">
              <div className="text-2xl font-bold drop-shadow-lg">
                💝 즐거운 추억이 되셨길! 💝
              </div>
            </div>
          ) : daysRemaining !== null && (
            <div className="bg-white/25 backdrop-blur-md px-8 py-4 rounded-full inline-block border border-white/30">
              {isOnTrip ? (
                <div className="text-2xl font-bold drop-shadow-lg">
                  🎉 여행 {daysRemaining}일차 진행 중! 🎉
                </div>
              ) : daysRemaining === 0 ? (
                <div className="text-2xl font-bold drop-shadow-lg">🎊 오늘 출발! 🎊</div>
              ) : (
                <div className="text-2xl font-bold drop-shadow-lg">
                  D-{daysRemaining} ✈️
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
