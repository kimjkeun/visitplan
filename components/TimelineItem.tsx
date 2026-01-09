'use client';

import { useState } from 'react';
import { TimelineItem as TimelineItemType } from '@/types';
import { useTourStore } from '@/lib/store';
import { FaMapMarkerAlt, FaStickyNote, FaTrash, FaTimes } from 'react-icons/fa';

interface Props {
  item: TimelineItemType;
  dayId: string;
  index: number;
}

export default function TimelineItem({ item, dayId, index }: Props) {
  const { notes, addNote, deleteNote } = useTourStore();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [noteText, setNoteText] = useState('');

  const existingNote = notes.find(
    (n) => n.dayId === dayId && n.timelineIndex === index
  );

  const handleAddNote = () => {
    if (noteText.trim()) {
      addNote({
        dayId,
        timelineIndex: index,
        note: noteText.trim(),
      });
      setNoteText('');
      setShowNoteInput(false);
    }
  };

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
    <div className="relative bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all group">
      {/* Timeline Dot */}
      <div className="absolute -left-10 top-6 w-4 h-4 bg-white border-4 border-pink-500 rounded-full shadow-lg"></div>

      {/* Time Badge */}
      <div className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-3 shadow-md">
        {item.time}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        {item.title}
        {item.priority && (
          <span className="bg-yellow-400 text-gray-800 text-xs px-3 py-1 rounded-full font-bold">
            우선순위
          </span>
        )}
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

        {/* Add Note Button */}
        {!existingNote && (
          <button
            onClick={() => setShowNoteInput(!showNoteInput)}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all shadow-md"
          >
            <FaStickyNote />
            <span className="text-sm font-medium">메모 추가</span>
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

      {/* Note Input */}
      {showNoteInput && (
        <div className="mt-4 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="메모를 입력하세요..."
            className="w-full p-3 border border-yellow-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddNote}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
            >
              저장
            </button>
            <button
              onClick={() => {
                setShowNoteInput(false);
                setNoteText('');
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* Existing Note */}
      {existingNote && (
        <div className="mt-4 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
          <div className="flex items-start gap-2 mb-2">
            <FaStickyNote className="text-yellow-600 mt-1" />
            <div className="flex-1">
              <p className="text-gray-800">{existingNote.note}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(existingNote.timestamp).toLocaleString('ko-KR')}
              </p>
            </div>
            <button
              onClick={() => deleteNote(dayId, index)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
