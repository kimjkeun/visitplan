'use client';

export default function TravelInfo() {
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold mb-2">ℹ️ 여행 정보</h2>
                <p className="text-lg opacity-90">타이중 여행 필수 정보</p>
            </div>

            {/* 기본 정보 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📍</span>
                    기본 정보
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">여행 기간</p>
                        <p className="font-bold text-gray-800">2026.01.12 (일) ~ 01.16 (목)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">시차</p>
                        <p className="font-bold text-gray-800">한국과 -1시간</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">통화</p>
                        <p className="font-bold text-gray-800">대만 달러 (TWD)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">전압</p>
                        <p className="font-bold text-gray-800">110V (어댑터 필요)</p>
                    </div>
                </div>
            </div>

            {/* 숙소 정보 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>🏨</span>
                    숙소 정보
                </h3>
                <div className="bg-purple-50 p-5 rounded-lg">
                    <h4 className="text-lg font-bold text-purple-800 mb-3">인하우스 호텔 그랜드</h4>
                    <div className="space-y-2 text-sm">
                        <p className="text-gray-700">
                            <span className="font-medium text-gray-800">중국어명:</span> 薆悅酒店五權館
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium text-gray-800">주소:</span><br />
                            No. 228號, Wuquan Rd, North District, Taichung City, 대만 40443
                        </p>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=薆悅酒店五權館+No.+228號+Wuquan+Rd+North+District+Taichung+City"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                        >
                            📍 지도에서 보기
                        </a>
                    </div>
                </div>
            </div>

            {/* 교통 정보 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>🚌</span>
                    교통 정보
                </h3>
                <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-bold text-gray-800 mb-2">이지카드 (悠遊卡)</h4>
                        <p className="text-sm text-gray-600">
                            • 편의점, 지하철역에서 구매 가능<br />
                            • 버스, 지하철, 편의점에서 사용<br />
                            • 충전: 편의점, 지하철역
                        </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-bold text-gray-800 mb-2">Uber / 택시</h4>
                        <p className="text-sm text-gray-600">
                            • Uber 앱 미리 설치 권장<br />
                            • 택시 기본요금: 70 TWD<br />
                            • 공항 ↔ 시내: 약 600-800 TWD
                        </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-bold text-gray-800 mb-2">시내버스</h4>
                        <p className="text-sm text-gray-600">
                            • 10km 이내 무료 (이지카드 사용 시)<br />
                            • 주요 노선: 302번 (공항), 309번 (고미습지)
                        </p>
                    </div>
                </div>
            </div>

            {/* 유용한 정보 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>💡</span>
                    유용한 팁
                </h3>
                <div className="space-y-3">
                    <div className="bg-pink-50 p-4 rounded-lg">
                        <h4 className="font-bold text-pink-800 mb-2">🍴 식사</h4>
                        <p className="text-sm text-gray-700">
                            • 야시장: 1인 200-300 TWD<br />
                            • 일반 식당: 1인 300-500 TWD<br />
                            • 물은 편의점에서 구매 (수돗물 비추천)
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-bold text-blue-800 mb-2">📱 통신</h4>
                        <p className="text-sm text-gray-700">
                            • 공항에서 유심 구매 가능<br />
                            • 5일 무제한: 약 500 TWD<br />
                            • 무료 Wi-Fi: 편의점, 카페
                        </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-2">🏪 편의점</h4>
                        <p className="text-sm text-gray-700">
                            • 7-Eleven, FamilyMart 24시간 운영<br />
                            • 이지카드 충전, ATM 이용 가능<br />
                            • 간단한 식사, 음료 구매 가능
                        </p>
                    </div>
                </div>
            </div>

            {/* 긴급 연락처 */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                    <span className="text-xl">🚨</span>
                    긴급 연락처
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                        <p className="text-red-700 font-medium">경찰: 110</p>
                        <p className="text-red-700 font-medium">화재/구급: 119</p>
                    </div>
                    <div>
                        <p className="text-red-700 font-medium">관광 안내: 1968</p>
                        <p className="text-red-700 font-medium">주타이베이 한국대표부: +886-2-2758-8320</p>
                    </div>
                </div>
            </div>

            {/* 날씨 정보 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>🌤️</span>
                    1월 날씨
                </h3>
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">평균 기온</p>
                            <p className="text-2xl font-bold text-orange-600">15-20°C</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">복장</p>
                            <p className="text-lg font-bold text-gray-800">긴팔 + 겉옷</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 text-center">
                        낮에는 따뜻하지만 아침/저녁은 쌀쌀합니다. 얇은 겉옷 필수!
                    </p>
                </div>
            </div>
        </div>
    );
}
