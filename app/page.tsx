'use client';

import { useEffect } from 'react';
import { useTourStore } from '@/lib/store';
import { tourData } from '@/lib/tourData';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import DaySchedule from '@/components/DaySchedule';
import Checklist from '@/components/Checklist';
import CurrencyConverter from '@/components/CurrencyConverter';
import ExpenseTracker from '@/components/ExpenseTracker';

export default function Home() {
  const { currentDay, initializeFromStorage } = useTourStore();

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  const renderContent = () => {
    if (currentDay === 'checklist') {
      return <Checklist />;
    }

    if (currentDay === 'converter') {
      return <CurrencyConverter />;
    }

    if (currentDay === 'expenses') {
      return <ExpenseTracker />;
    }

    const daySchedule = tourData.find((day) => day.id === currentDay);
    if (daySchedule) {
      return <DaySchedule schedule={daySchedule} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-teal-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Header />
        <Navigation />
        <main>{renderContent()}</main>

        {/* Footer */}
        <footer className="text-center p-8 mt-12 bg-white rounded-3xl shadow-lg">
          <h3 className="text-2xl font-bold text-pink-600 mb-2">
            🎉 즐거운 대만 여행 되세요! 🎉
          </h3>
          <p className="text-gray-600">Made with ❤️ for your perfect trip</p>
        </footer>
      </div>
    </div>
  );
}
