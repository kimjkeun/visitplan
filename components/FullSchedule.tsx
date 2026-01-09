'use client';

import { tourData } from '@/lib/tourData';
import { useTourStore } from '@/lib/store';

export default function FullSchedule() {
    const { setCurrentDay } = useTourStore();

    return (
        <div className="space-y-6">
            {/* 전체 일정 헤더 */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold mb-2">📅 전체 일정</h2>
                <p className="text-lg opacity-90">타이중 4박 5일 여행 한눈에 보기</p>
            </div>

            {/* 일정 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tourData.map((day) => (
                    <div
                        key={day.id}
                        onClick={() => setCurrentDay(day.id)}
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-pink-500 group"
                    >
                        {/* Day 번호 */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-400 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                                {day.dayNumber}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                                    {day.title}
                                </h3>
                                <p className="text-sm text-gray-600">{day.subtitle}</p>
                            </div>
                        </div>

                        {/* 항공편 정보 */}
                        {day.flight && (
                            <div className="bg-blue-50 rounded-lg p-3 mb-4 border-l-4 border-blue-500">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-2xl">✈️</span>
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {day.flight.departure} → {day.flight.arrival}
                                        </p>
                                        <p className="text-gray-600">
                                            {day.flight.departureTime} - {day.flight.arrivalTime}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 주요 일정 미리보기 */}
                        <div className="space-y-2">
                            {day.timeline.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm">
                                    <span className="text-teal-500 font-bold mt-0.5">•</span>
                                    <div className="flex-1">
                                        <span className="text-gray-700">{item.time}</span>
                                        <span className="text-gray-900 font-medium ml-2">{item.title}</span>
                                    </div>
                                </div>
                            ))}
                            {day.timeline.length > 3 && (
                                <p className="text-xs text-gray-500 ml-4">
                                    외 {day.timeline.length - 3}개 일정...
                                </p>
                            )}
                        </div>

                        {/* 상세보기 버튼 */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <button className="text-pink-600 font-medium text-sm hover:text-pink-700 transition-colors">
                                상세 일정 보기 →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 여행 팁 */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl">
                <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    여행 팁
                </h3>
                <ul className="space-y-1 text-sm text-yellow-800">
                    <li>• 각 일정 카드를 클릭하면 상세 정보를 볼 수 있습니다</li>
                    <li>• 체크리스트에서 준비물을 미리 확인하세요</li>
                    <li>• 환율 계산기로 예산을 계획해보세요</li>
                    <li>• 일정별 동선 지도로 이동 경로를 확인하세요</li>
                </ul>
            </div>
        </div>
    );
}
