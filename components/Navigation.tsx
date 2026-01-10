'use client';

import { useTourStore } from '@/lib/store';

const navigationSections = [
  {
    title: '전체',
    items: [
      { id: 'overview', label: '전체 일정' },
    ]
  },
  {
    title: '일자별',
    items: [
      { id: 'day1', label: 'Day 1' },
      { id: 'day2', label: 'Day 2' },
      { id: 'day3', label: 'Day 3' },
      { id: 'day4', label: 'Day 4' },
      { id: 'day5', label: 'Day 5' },
    ]
  },
  {
    title: '유틸',
    items: [
      { id: 'info', label: '여행정보' },
      { id: 'phrases', label: '여행회화' },
      { id: 'converter', label: '환율' },
      { id: 'checklist', label: '체크리스트' },
    ]
  }
];

export default function Navigation() {
  const { currentDay, setCurrentDay } = useTourStore();

  return (
    <nav className="bg-white p-4 rounded-2xl shadow-lg mb-8">
      <div className="space-y-4">
        {navigationSections.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            {/* 섹션 제목 */}
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">
              {section.title}
            </h3>

            {/* 섹션 버튼들 */}
            <div className="flex flex-wrap gap-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentDay(item.id)}
                  className={`
                    px-4 py-2 rounded-xl font-bold transition-all text-sm
                    ${currentDay === item.id
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-teal-600 hover:bg-teal-50 hover:shadow-md'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
