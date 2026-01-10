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

      {/* Place Details Section (Guidebook Style) */}
      {item.placeInfo && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-4 rounded-lg mb-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-purple-800 flex items-center gap-2">
              <span>📖</span>
              <span>장소 가이드</span>
            </h4>
          </div>

          {/* Description */}
          {item.placeInfo.description && (
            <div className="mb-3">
              <p className="text-gray-700 text-sm leading-relaxed">{item.placeInfo.description}</p>
            </div>
          )}

          {/* Highlights */}
          {item.placeInfo.highlights && item.placeInfo.highlights.length > 0 && (
            <div className="mb-3">
              <p className="font-semibold text-purple-700 text-sm mb-1">✨ 주요 볼거리</p>
              <ul className="space-y-1">
                {item.placeInfo.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Operating Hours */}
          {item.placeInfo.hours && (
            <div className="mb-2">
              <p className="text-sm">
                <span className="font-semibold text-purple-700">🕐 운영시간:</span>
                <span className="text-gray-700 ml-2">{item.placeInfo.hours}</span>
              </p>
            </div>
          )}

          {/* Admission Fee */}
          {item.placeInfo.admission && (
            <div className="mb-2">
              <p className="text-sm">
                <span className="font-semibold text-purple-700">💰 입장료:</span>
                <span className="text-gray-700 ml-2">{item.placeInfo.admission}</span>
              </p>
            </div>
          )}

          {/* Recommendations */}
          {item.placeInfo.recommendations && (
            <div className="mt-3 pt-3 border-t border-purple-200">
              <p className="text-sm text-purple-800">
                <span className="font-semibold">💡 추천:</span>
                <span className="ml-2">{item.placeInfo.recommendations}</span>
              </p>
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
