'use client';

import { useState } from 'react';
import { useTourStore } from '@/lib/store';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { TripExpense } from '@/types';

const categories = [
  { value: 'food', label: '🍴 식사', color: 'bg-orange-500' },
  { value: 'transport', label: '🚌 교통', color: 'bg-blue-500' },
  { value: 'shopping', label: '🛍️ 쇼핑', color: 'bg-pink-500' },
  { value: 'accommodation', label: '🏨 숙박', color: 'bg-purple-500' },
  { value: 'activity', label: '🎡 액티비티', color: 'bg-green-500' },
  { value: 'other', label: '💸 기타', color: 'bg-gray-500' },
] as const;

export default function ExpenseTracker() {
  const { expenses, addExpense, deleteExpense, exchangeRate } = useTourStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    dayId: 'day1',
    category: 'food' as TripExpense['category'],
    amount: '',
    currency: 'TWD' as 'TWD' | 'KRW',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount && formData.description) {
      addExpense({
        dayId: formData.dayId,
        category: formData.category,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        description: formData.description,
      });
      setFormData({
        dayId: 'day1',
        category: 'food',
        amount: '',
        currency: 'TWD',
        description: '',
      });
      setShowForm(false);
    }
  };

  const getTotalInKRW = () => {
    return expenses.reduce((total, expense) => {
      const amount =
        expense.currency === 'TWD' ? expense.amount * exchangeRate : expense.amount;
      return total + amount;
    }, 0);
  };

  const getCategoryTotal = (cat: TripExpense['category']) => {
    return expenses
      .filter((e) => e.category === cat)
      .reduce((total, expense) => {
        const amount =
          expense.currency === 'TWD' ? expense.amount * exchangeRate : expense.amount;
        return total + amount;
      }, 0);
  };

  return (
    <section className="bg-white rounded-3xl p-8 shadow-xl animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-pink-600">💰 경비 추적</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white px-4 py-2 rounded-lg transition-all shadow-md"
        >
          <FaPlus />
          <span className="text-sm font-medium">지출 추가</span>
        </button>
      </div>

      {/* Total Summary */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-6 rounded-2xl mb-6 shadow-lg">
        <div className="text-center">
          <p className="text-lg opacity-90 mb-2">총 지출</p>
          <p className="text-4xl font-bold">
            {getTotalInKRW().toLocaleString()} 원
          </p>
        </div>
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                날짜
              </label>
              <select
                value={formData.dayId}
                onChange={(e) => setFormData({ ...formData, dayId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {[1, 2, 3, 4, 5].map((day) => (
                  <option key={day} value={`day${day}`}>
                    Day {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as TripExpense['category'],
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                금액
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <select
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currency: e.target.value as 'TWD' | 'KRW',
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="TWD">TWD</option>
                  <option value="KRW">KRW</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="예: 펑지아 야시장 저녁"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
            >
              추가
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-all"
            >
              취소
            </button>
          </div>
        </form>
      )}

      {/* Category Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {categories.map((cat) => {
          const total = getCategoryTotal(cat.value as TripExpense['category']);
          return (
            <div
              key={cat.value}
              className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200"
            >
              <div className="text-sm text-gray-600 mb-1">{cat.label}</div>
              <div className="text-xl font-bold text-gray-800">
                {total.toLocaleString()}원
              </div>
            </div>
          );
        })}
      </div>

      {/* Expense List */}
      <div className="space-y-3">
        {expenses.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">아직 지출 내역이 없습니다</p>
            <p className="text-sm mt-2">위에서 지출을 추가해보세요!</p>
          </div>
        ) : (
          expenses
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((expense) => {
              const category = categories.find((c) => c.value === expense.category);
              const amountInKRW =
                expense.currency === 'TWD'
                  ? expense.amount * exchangeRate
                  : expense.amount;

              return (
                <div
                  key={expense.id}
                  className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <div className={`${category?.color} text-white px-3 py-1 rounded-lg text-sm font-medium`}>
                    {category?.label}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {expense.description}
                    </div>
                    <div className="text-sm text-gray-500">
                      {expense.dayId.replace('day', 'Day ')} •{' '}
                      {new Date(expense.timestamp).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">
                      {amountInKRW.toLocaleString()}원
                    </div>
                    <div className="text-sm text-gray-500">
                      {expense.amount.toLocaleString()} {expense.currency}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })
        )}
      </div>
    </section>
  );
}
