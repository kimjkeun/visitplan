'use client';

import { useEffect, useRef } from 'react';
import { useLiveTranslation } from '@/hooks/useLiveTranslation';
import { FaMicrophone, FaStop, FaHeadphones } from 'react-icons/fa';

export default function LiveTranslator() {
    const {
        isConnected,
        isRecording,
        error,
        volume,
        transcripts,
        connect,
        disconnect,
        startRecording,
        stopRecording
    } = useLiveTranslation();

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        connect();
        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [transcripts]);

    useEffect(() => {
        if (error) {
            alert(`Error: ${error}`);
        }
    }, [error]);

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Header */}
            <div className="bg-teal-600 p-4 sm:p-6 flex justify-between items-center text-white pb-12">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-1">
                        <FaHeadphones /> 실시간 통역
                    </h2>
                    <p className="text-teal-100 text-sm">한국어 ↔ 대만어(중국어) 자동 감지 통역</p>
                </div>
                <div className="text-right">
                    {isConnected ? (
                        <span className="inline-flex items-center gap-1.5 bg-teal-800/50 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            연결됨
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 bg-red-800/50 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                            연결 중...
                        </span>
                    )}
                </div>
            </div>

            {/* Visualizer Area (Overlapping Header) */}
            <div className="relative -mt-8 flex justify-center mb-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {isRecording && (
                        <>
                            <div
                                className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping"
                                style={{ transform: `scale(${1 + volume * 1.5})` }}
                            />
                            <div
                                className="absolute inset-0 bg-teal-500/30 rounded-full transition-transform duration-75"
                                style={{ transform: `scale(${1 + volume * 0.8})` }}
                            />
                        </>
                    )}

                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={!isConnected}
                        className={`
                  relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xl transition-all hover:scale-105 active:scale-95
                  ${isRecording
                                ? 'bg-red-500 text-white animate-pulse shadow-red-500/50 border-4 border-white'
                                : 'bg-white text-teal-600 border-4 border-teal-50'}
                `}
                    >
                        {isRecording ? <FaStop /> : <FaMicrophone />}
                    </button>
                </div>
            </div>

            <p className="text-center text-gray-500 text-sm font-medium mb-4">
                {isRecording ? "듣고 있습니다..." : "마이크를 눌러 시작하세요"}
            </p>

            {/* Transcript Area */}
            <div className="flex-1 bg-gray-50 mx-4 mb-4 rounded-2xl p-4 overflow-y-auto space-y-4 border border-gray-100" ref={scrollRef}>
                {transcripts.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                        <span className="text-4xl">💬</span>
                        <p>대화 내용이 여기에 표시됩니다</p>
                    </div>
                ) : (
                    transcripts.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                    max-w-[80%] p-3 rounded-2xl shadow-sm
                    ${msg.role === 'model'
                                    ? 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    : 'bg-teal-600 text-white rounded-tr-none'}
                  `}>
                                <p className="text-base leading-relaxed">{msg.text}</p>
                                {/* <span className="text-[10px] opacity-70 mt-1 block text-right">{msg.role}</span> */}
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
