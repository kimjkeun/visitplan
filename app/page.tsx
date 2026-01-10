'use client';

import { useEffect } from 'react';
import { useTourStore } from '@/lib/store';
import { tourData } from '@/lib/tourData';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import DaySchedule from '@/components/DaySchedule';
import Checklist from '@/components/Checklist';
import CurrencyConverter from '@/components/CurrencyConverter';
import FullSchedule from '@/components/FullSchedule';
import TravelInfo from '@/components/TravelInfo';
import TravelPhrases from '@/components/TravelPhrases';
import TravelAssistant from '@/components/TravelAssistant';
import LiveTranslator from '@/components/LiveTranslator';

export default function Home() {
  const { currentDay, initializeFromStorage } = useTourStore();

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  const renderContent = () => {
    if (currentDay === 'overview') {
      return <FullSchedule />;
    }

    if (currentDay === 'info') {
      return <TravelInfo />;
    }

    if (currentDay === 'phrases') {
      return <TravelPhrases />;
    }

    if (currentDay === 'ai') {
      return <TravelAssistant />;
    }

    if (currentDay === 'live') {
      return <LiveTranslator />;
    }

    if (currentDay === 'checklist') {
      return <Checklist />;
    }

    if (currentDay === 'converter') {
      return <CurrencyConverter />;
    }

    const daySchedule = tourData.find((day) => day.id === currentDay);
    if (daySchedule) {
      return <DaySchedule schedule={daySchedule} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-teal-50">
      <div className="max-w-full mx-auto p-2 sm:p-4 md:p-6 lg:max-w-6xl">
        <Header />
        <Navigation />
        <main>{renderContent()}</main>
      </div>
    </div>
  );
}
