'use client';

import { tourData } from '@/lib/tourData';

export default function FullSchedule() {
    return (
        <div className="space-y-6">
            {/* 전체 일정 헤더 */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-6 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold mb-2">📅 전체 일정</h2>
                <p className="text-lg opacity-90">타이중 4박 5일 여행 전체 일정</p>
            </div>

            {/* 전체 일정 상세 */}
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
                    </div>

                    {/* 항공편 정보 */}
                    {day.flight && (
                        <div className="bg-blue-50 rounded-xl p-4 mb-6 border-l-4 border-blue-500">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">✈️</span>
                                <div>
                                    <p className="font-bold text-gray-800 text-lg">
                                        {day.flight.departure} → {day.flight.arrival}
                                    </p>
                                    <p className="text-gray-600">
                                        출발: {day.flight.departureTime} | 도착: {day.flight.arrivalTime}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 타임라인 */}
                    <div className="space-y-4">
                        {day.timeline.map((item, itemIdx) => (
                            <div
                                key={itemIdx}
                                className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                            >
                                {/* 시간 배지 */}
                                <div className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-1.5 rounded-full font-bold text-sm mb-2">
                                    {item.time}
                                </div>

                                {/* 제목 */}
                                <h4 className="text-lg font-bold text-gray-800 mb-2">
                                    {item.title}
                                </h4>

                                {/* 상세 내용 */}
                                {item.details && (
                                    <p className="text-gray-700 whitespace-pre-line mb-3">
                                        {item.details}
                                    </p>
                                )}

                                {/* 위치 정보 */}
                                {item.location && (
                                    <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                                        <span className="text-red-500">📍</span>
                                        <span>{item.location.name}</span>
                                    </div>
                                )}

                                {/* 추천 음식 */}
                                {item.mustEat && (
                                    <div className="bg-pink-50 border-l-4 border-pink-500 p-3 rounded-lg mb-3">
                                        <h5 className="font-bold text-pink-600 mb-2 text-sm">
                                            {item.mustEat.title}
                                        </h5>
                                        <ul className="space-y-1">
                                            {item.mustEat.items.map((food, foodIdx) => (
                                                <li key={foodIdx} className="text-sm text-gray-700">
                                                    {food}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* 팁 */}
                                {item.tips && (
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <span className="text-lg">💡</span>
                                            <p className="text-sm text-gray-700 whitespace-pre-line flex-1">
                                                {item.tips}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Day 구분선 */}
                    {dayIdx < tourData.length - 1 && (
                        <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-300 text-center">
                            <span className="text-gray-400 text-sm">• • •</span>
                        </div>
                    )}
                </div>
            ))}

            {/* 여행 팁 */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl">
                <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    여행 팁
                </h3>
                <ul className="space-y-1 text-sm text-yellow-800">
                    <li>• 각 일정의 위치를 클릭하면 지도에서 확인할 수 있습니다</li>
                    <li>• 체크리스트에서 준비물을 미리 확인하세요</li>
                    <li>• 환율 계산기로 예산을 계획해보세요</li>
                    <li>• 일자별 페이지에서 동선 지도를 확인하세요</li>
                </ul>
            </div>
        </div>
    );
}
