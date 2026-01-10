'use client';

import { useEffect } from 'react';
import { useLiveTranslation } from '@/hooks/useLiveTranslation';
import { FaMicrophone, FaStop, FaHeadphones, FaTimes } from 'react-icons/fa';

export default function LiveTranslator({ onClose }: { onClose: () => void }) {
    const {
        isConnected,
        isRecording,
        error,
        volume,
        connect,
        disconnect,
        startRecording,
        stopRecording
    } = useLiveTranslation();

    useEffect(() => {
        connect();
        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    useEffect(() => {
        if (error) {
            alert(`Error: ${error}`);
        }
    }, [error]);

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col relative h-[600px]">

                <div className="bg-teal-600 p-4 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FaHeadphones /> 실시간 통역 (Beta)
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-teal-700 rounded-full transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="p-2 text-center bg-gray-100 dark:bg-zinc-800 text-sm">
                    {isConnected ? (
                        <span className="text-green-600 font-semibold">● 연결됨 - 준비 완료</span>
                    ) : (
                        <span className="text-gray-400">○ 연결 중...</span>
                    )}
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">

                    <div className="relative w-48 h-48 flex items-center justify-center">
                        {isRecording && (
                            <>
                                <div
                                    className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping"
                                    style={{ transform: `scale(${1 + volume * 2})` }}
                                />
                                <div
                                    className="absolute inset-0 bg-teal-500/30 rounded-full transition-transform duration-75"
                                    style={{ transform: `scale(${1 + volume})` }}
                                />
                            </>
                        )}

                        <div className={`relative w-32 h-32 rounded-full flex items-center justify-center text-4xl shadow-lg transition-all
              ${isRecording
                                ? 'bg-gradient-to-tr from-teal-500 to-emerald-400 text-white scale-110'
                                : 'bg-gray-200 dark:bg-zinc-700 text-gray-400'}
            `}>
                            <FaMicrophone />
                        </div>
                    </div>

                    <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
                        {isRecording
                            ? "듣고 있습니다... (한국어/중국어)"
                            : "마이크 버튼을 눌러 대화를 시작하세요"}
                    </p>

                </div>

                <div className="p-8 pb-12 flex justify-center">
                    {!isRecording ? (
                        <button
                            onClick={startRecording}
                            disabled={!isConnected}
                            className="w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
                        >
                            <FaMicrophone /> 통역 시작
                        </button>
                    ) : (
                        <button
                            onClick={stopRecording}
                            className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 animate-pulse"
                        >
                            <FaStop /> 통역 중지
                        </button>
                    )}
                </div>

                <div className="absolute bottom-0 w-full h-1 bg-gray-200">
                    <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${isConnected ? 100 : 0}%` }} />
                </div>

            </div>
        </div>
    );
}
