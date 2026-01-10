'use client';

import { useState, useEffect } from 'react';
import { travelPhrases, categoryNames, categoryIcons, TravelPhrase } from '@/lib/travelPhrases';
import { useTourStore } from '@/lib/store';

type Category = keyof typeof categoryNames;

export default function TravelPhrases() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('greeting');
    const { favoritePhrases, toggleFavoritePhrase } = useTourStore();
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    const categories = Object.keys(categoryNames) as Category[];
    const filteredPhrases = travelPhrases.filter(p => p.category === selectedCategory);

    // 음성 목록 미리 로드 (모바일 호환성)
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                setVoicesLoaded(true);
                console.log('Voices loaded:', voices.length);
            }
        };

        // 초기 로드
        loadVoices();

        // voiceschanged 이벤트 리스너
        if (window.speechSynthesis) {
            window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
            return () => {
                window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
            };
        }
    }, []);

    // 음성 재생 함수
    const playAudio = (phrase: TravelPhrase) => {
        if (!('speechSynthesis' in window)) {
            alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
            return;
        }

        // 현재 재생 중인 것이 있으면 중지
        window.speechSynthesis.cancel();
        setPlayingId(phrase.id);

        const utterance = new SpeechSynthesisUtterance(phrase.chinese);

        // 음성 선택
        const voices = window.speechSynthesis.getVoices();
        const chineseVoice = voices.find(voice =>
            voice.lang === 'zh-TW' ||
            voice.lang === 'zh-CN' ||
            voice.lang.startsWith('zh')
        );

        if (chineseVoice) {
            utterance.voice = chineseVoice;
            utterance.lang = chineseVoice.lang;
        } else {
            utterance.lang = 'zh-TW';
        }

        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onend = () => {
            setPlayingId(null);
        };

        utterance.onerror = (event) => {
            console.error('Speech error:', event);
            setPlayingId(null);
        };

        // 약간의 지연 후 재생 (모바일 안정성)
        setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 100);
    };

    const isFavorite = (phraseId: string) => {
        return favoritePhrases.includes(phraseId);
    };

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold mb-2">💬 여행 회화</h2>
                <p className="text-lg opacity-90">타이중에서 바로 쓰는 중국어 표현</p>
            </div>

            {/* 카테고리 탭 */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`
                px-4 py-2 rounded-xl font-bold transition-all text-sm flex items-center gap-2
                ${selectedCategory === cat
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md transform scale-105'
                                    : 'bg-gray-100 text-orange-600 hover:bg-orange-50 hover:shadow-md'
                                }
              `}
                        >
                            <span>{categoryIcons[cat]}</span>
                            <span>{categoryNames[cat]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 회화 리스트 */}
            <div className="space-y-3">
                {filteredPhrases.map((phrase) => (
                    <div
                        key={phrase.id}
                        className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border-l-4 border-orange-500"
                    >
                        <div className="flex items-start gap-3">
                            {/* 즐겨찾기 버튼 */}
                            <button
                                onClick={() => toggleFavoritePhrase(phrase.id)}
                                className="flex-shrink-0 text-2xl transition-transform hover:scale-125"
                            >
                                {isFavorite(phrase.id) ? '⭐' : '☆'}
                            </button>

                            {/* 텍스트 내용 */}
                            <div className="flex-1">
                                {/* 한국어 */}
                                <p className="text-lg font-bold text-gray-800 mb-1">
                                    {phrase.korean}
                                    {phrase.priority && (
                                        <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                                            필수
                                        </span>
                                    )}
                                </p>

                                {/* 중국어 */}
                                <p className="text-2xl text-orange-600 font-bold mb-1">
                                    {phrase.chinese}
                                </p>

                                {/* 발음 */}
                                <p className="text-sm text-gray-600 bg-gray-50 inline-block px-3 py-1 rounded-full">
                                    🔊 {phrase.pronunciation}
                                </p>
                            </div>

                            {/* 음성 재생 버튼 */}
                            <button
                                onClick={() => playAudio(phrase)}
                                disabled={playingId === phrase.id}
                                className={`
                  flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                  transition-all shadow-md
                  ${playingId === phrase.id
                                        ? 'bg-orange-600 text-white animate-pulse'
                                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:scale-110'
                                    }
                `}
                            >
                                {playingId === phrase.id ? '⏸' : '▶'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 안내 메시지 */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl">
                <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    사용 팁
                </h3>
                <ul className="space-y-1 text-sm text-blue-800">
                    <li>• ⭐ 버튼을 눌러 자주 쓰는 표현을 즐겨찾기하세요</li>
                    <li>• ▶ 버튼을 눌러 정확한 발음을 들어보세요</li>
                    <li>• "필수" 표시가 있는 표현은 꼭 알아두세요</li>
                    <li>• 오프라인에서도 사용 가능합니다 (음성 제외)</li>
                </ul>
            </div>

            {/* 즐겨찾기 개수 표시 */}
            {favoritePhrases.length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-xl">
                    <p className="text-yellow-800 font-medium">
                        ⭐ 즐겨찾기: {favoritePhrases.length}개
                    </p>
                </div>
            )}
        </div>
    );
}
