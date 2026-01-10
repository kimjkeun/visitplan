'use client';

import { tourData } from '@/lib/tourData';
import { useTourStore } from '@/lib/store';

export default function FullSchedule() {
    const { setCurrentDay } = useTourStore();

    return (
        <div className="space-y-6">
            {/* 전체 일정 헤더 */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-6 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold mb-2">📅 전체 일정</h2>
                <p className="text-lg opacity-90">타이중 4박 5일 여행 간략 일정</p>
            </div>

            {/* 전체 일정 간략 보기 */}
            {tourData.map((day, dayIdx) => (
                <div
                    key={day.id}
                    className="bg-white rounded-3xl p-6 shadow-xl border-l-8 border-teal-500"
                >
                    {/* Day 헤더 */}
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-200">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                            {day.dayNumber}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-teal-600 mb-1">
                                {day.title}
                            </h3>
                            <p className="text-gray-600">{day.subtitle}</p>
                        </div>
                        {/* 상세보기 버튼 */}
                        <button
                            onClick={() => setCurrentDay(day.id)}
                            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                            상세보기 →
                        </button>
                    </div>

                    {/* 항공편 정보 */}
                    {day.flight && (
                        <div className="bg-blue-50 rounded-xl p-4 mb-4 border-l-4 border-blue-500">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">✈️</span>
                                <div>
                                    <p className="font-bold text-gray-800">
                                        {day.flight.departure} → {day.flight.arrival}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {day.flight.departureTime} - {day.flight.arrivalTime}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 간략 타임라인 */}
                    <div className="space-y-2">
                        {day.timeline.map((item, itemIdx) => (
                            <div
                                key={itemIdx}
                                className="flex items-start gap-3 py-2 hover:bg-gray-50 rounded-lg px-3 transition-colors"
                            >
                                {/* 시간 */}
                                <div className="flex-shrink-0 w-32 text-sm font-bold text-teal-600">
                                    {item.time}
                                </div>

                                {/* 제목 */}
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">{item.title}</p>
                                    {item.location && (
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            📍 {item.location.name}
                                        </p>
                                    )}
                                </div>

                                {/* 우선순위 표시 */}
                                {item.priority && (
                                    <span className="flex-shrink-0 text-yellow-500 text-lg">⭐</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* 안내 메시지 */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl">
                <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">ℹ️</span>
                    상세 정보 보기
                </h3>
                <p className="text-sm text-blue-800">
                    각 일정의 <strong>"상세보기"</strong> 버튼을 클릭하거나 상단 네비게이션에서 <strong>Day 1~5</strong>를 선택하면
                    추천 음식, 여행 팁, 동선 지도 등 자세한 정보를 확인할 수 있습니다.
                </p>
            </div>
        </div>
    );
}
