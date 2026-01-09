'use client';

import { useTourStore } from '@/lib/store';
import { FaCheck, FaRedo } from 'react-icons/fa';

export default function Checklist() {
  const { checklist, toggleChecklistItem, resetChecklist } = useTourStore();

  const completedCount = checklist.filter((item) => item.checked).length;
  const progress = (completedCount / checklist.length) * 100;

  return (
    <section className="bg-white rounded-3xl p-8 shadow-xl animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-pink-600 flex items-center gap-3">
          ✈️ 여행 준비 체크리스트
        </h2>
        <button
          onClick={resetChecklist}
          className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          <FaRedo />
          <span className="text-sm">초기화</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            완료: {completedCount} / {checklist.length}
          </span>
          <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-500 to-rose-400 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checklist.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleChecklistItem(item.id)}
            className={`
              flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer
              ${
                item.checked
                  ? 'bg-green-50 border-2 border-green-300 opacity-60'
                  : 'bg-gray-50 border-2 border-gray-200 hover:bg-pink-50 hover:border-pink-300'
              }
            `}
          >
            <div
              className={`
                w-6 h-6 rounded-md border-3 flex items-center justify-center transition-all
                ${
                  item.checked
                    ? 'bg-green-500 border-green-600'
                    : 'bg-white border-pink-500'
                }
              `}
            >
              {item.checked && <FaCheck className="text-white text-sm" />}
            </div>
            <span
              className={`
                flex-1 font-medium
                ${item.checked ? 'line-through text-gray-500' : 'text-gray-800'}
              `}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {progress === 100 && (
        <div className="mt-8 bg-gradient-to-r from-pink-500 to-rose-400 text-white p-6 rounded-2xl text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold mb-1">준비 완료!</h3>
          <p className="opacity-90">즐거운 여행 되세요!</p>
        </div>
      )}
    </section>
  );
}
