'use client';

import { useState } from 'react';
import { TimelineItem as TimelineItemType } from '@/types';
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

interface Props {
  item: TimelineItemType;
  dayId: string;
  index: number;
}

export default function TimelineItem({ item, dayId, index }: Props) {
  const [showMap, setShowMap] = useState(false);
  const [showPlaceGuide, setShowPlaceGuide] = useState(false);



  const getGoogleMapsUrl = () => {
    if (!item.location) return null;
    const query = encodeURIComponent(item.location.searchQuery);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const getGoogleMapsEmbedUrl = () => {
    if (!item.location) return null;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const query = encodeURIComponent(item.location.searchQuery);

    // API 키가 있으면 공식 Embed API 사용
    if (apiKey && apiKey !== 'your_api_key_here') {
      return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&zoom=15&language=ko`;
    }

    // API 키 없으면 간단한 임베드 (제한적)
    return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="relative bg-gray-50 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all group">
      {/* Time Badge */}
      <div className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-3 shadow-md">
        {item.time}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {item.title}
      </h3>

      {/* Details */}
      {item.details && (
        <div className="text-gray-700 whitespace-pre-line mb-3">{item.details}</div>
      )}

      {/* Must Eat Section */}
      {item.mustEat && (
        <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-lg mb-3">
          <h4 className="font-bold text-pink-600 mb-2">{item.mustEat.title}</h4>
          <ul className="space-y-1">
            {item.mustEat.items.map((food, idx) => (
              <li key={idx} className="text-gray-700">
                {food}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tips Section */}
      {item.tips && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-3">
          <div className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <p className="text-gray-700 whitespace-pre-line flex-1">{item.tips}</p>
          </div>
        </div>
      )}

      {/* Place Details Section (Guidebook Style) - Collapsible */}
      {item.placeInfo && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 rounded-lg overflow-hidden">
          {/* Header with Toggle Button */}
          <button
            onClick={() => setShowPlaceGuide(!showPlaceGuide)}
            className="w-full p-4 flex items-center justify-between hover:bg-purple-100 transition-colors"
          >
            <h4 className="font-bold text-purple-800 flex items-center gap-2">
              <span>📖</span>
              <span>장소 가이드</span>
            </h4>
            <span className="text-purple-600 text-xl">
              {showPlaceGuide ? '▲' : '▼'}
            </span>
          </button>

          {/* Collapsible Content */}
          {showPlaceGuide && (
            <div className="px-4 pb-4 space-y-3 animate-fadeIn">
              {/* Description */}
              {item.placeInfo.description && (
                <div className="bg-white/50 p-3 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">{item.placeInfo.description}</p>
                </div>
              )}

              {/* Highlights */}
              {item.placeInfo.highlights && item.placeInfo.highlights.length > 0 && (
                <div className="bg-white/50 p-3 rounded-lg">
                  <p className="font-semibold text-purple-700 text-sm mb-2">✨ 주요 볼거리</p>
                  <ul className="space-y-1.5">
                    {item.placeInfo.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                        <span className="text-purple-500 mt-0.5">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Operating Hours */}
                {item.placeInfo.hours && (
                  <div className="bg-white/50 p-3 rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold text-purple-700 block mb-1">🕐 운영시간</span>
                      <span className="text-gray-700">{item.placeInfo.hours}</span>
                    </p>
                  </div>
                )}

                {/* Admission Fee */}
                {item.placeInfo.admission && (
                  <div className="bg-white/50 p-3 rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold text-purple-700 block mb-1">💰 입장료</span>
                      <span className="text-gray-700">{item.placeInfo.admission}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Recommendations */}
              {item.placeInfo.recommendations && (
                <div className="bg-purple-100 p-3 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-900">
                    <span className="font-semibold block mb-1">💡 여행 꿀팁</span>
                    <span>{item.placeInfo.recommendations}</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        {/* Google Maps Button */}
        {item.location && (
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all shadow-md"
          >
            <FaMapMarkerAlt />
            <span className="text-sm font-medium">{showMap ? '지도 숨기기' : '지도 보기'}</span>
          </button>
        )}
      </div>

      {/* Embedded Google Map */}
      {showMap && item.location && (
        <div className="mt-4 relative bg-gray-200 rounded-xl overflow-hidden shadow-lg">
          <button
            onClick={() => setShowMap(false)}
            className="absolute top-3 right-3 z-10 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-lg transition-all"
          >
            <FaTimes />
          </button>
          <iframe
            src={getGoogleMapsEmbedUrl() || ''}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          ></iframe>
          <div className="bg-white p-3">
            <div className="text-center text-sm text-gray-600 mb-3">
              📍 {item.location.name}
              {item.location.address && (
                <div className="text-xs text-gray-500 mt-1">{item.location.address}</div>
              )}
            </div>
            {/* 구글 맵 앱에서 열기 버튼 */}
            <a
              href={getGoogleMapsUrl() || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg transition-all font-medium"
            >
              🗺️ 구글 맵 앱에서 열기
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
