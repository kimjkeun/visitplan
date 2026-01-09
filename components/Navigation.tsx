'use client';

import { useTourStore } from '@/lib/store';

const days = [
  { id: 'day1', label: 'Day 1' },
  { id: 'day2', label: 'Day 2' },
  { id: 'day3', label: 'Day 3' },
  { id: 'day4', label: 'Day 4' },
  { id: 'day5', label: 'Day 5' },
  { id: 'checklist', label: '체크리스트' },
  { id: 'expenses', label: '경비 추적' },
  { id: 'converter', label: '환율' },
];

export default function Navigation() {
  const { currentDay, setCurrentDay } = useTourStore();

  return (
    <nav className="bg-white p-4 rounded-2xl shadow-lg mb-8">
      <div className="flex flex-wrap justify-center gap-3">
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => setCurrentDay(day.id)}
            className={`
              px-5 py-2.5 rounded-xl font-bold transition-all
              ${
                currentDay === day.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-pink-500 hover:bg-pink-50 hover:shadow-md'
              }
            `}
          >
            {day.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
