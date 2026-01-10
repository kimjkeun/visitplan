'use client';

import { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LiveTranslator from './LiveTranslator';
import { FaMicrophone } from 'react-icons/fa';

interface Message {
    role: 'user' | 'assistant';
    parts: string;
    timestamp: number;
}

export default function TravelAssistant() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            parts: '안녕하세요! 👋 타이중 여행 AI 어시스턴트입니다.\n\n여행 일정, 장소 정보, 교통, 음식 추천 등 궁금한 점을 물어보세요!',
            timestamp: Date.now()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showLive, setShowLive] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            parts: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // 대화 히스토리 준비 (최근 10개 메시지만)
            const history = messages.slice(-10);

            const response = await sendMessageToGemini(input, history);

            const assistantMessage: Message = {
                role: 'assistant',
                parts: response.success ? response.message : response.message,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                role: 'assistant',
                parts: '죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.',
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const suggestedQuestions = [
        '첫날 일정 알려줘',
        '펑지아 야시장 추천 음식은?',
        '일월담 가는 방법은?',
        '고미습지 일몰 시간은?'
    ];

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)]">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 sm:p-6 rounded-t-3xl shadow-xl flex justify-between items-start">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">🤖 AI 여행 어시스턴트</h2>
                    <p className="text-base sm:text-xl opacity-90">타이중 여행에 대해 무엇이든 물어보세요</p>
                </div>
                <button
                    onClick={() => setShowLive(true)}
                    className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-2xl backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-lg group"
                >
                    <div className="relative">
                        <FaMicrophone className="text-xl sm:text-2xl mb-1 group-hover:text-yellow-300 transition-colors" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-white"></div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap bg-black/20 px-1.5 py-0.5 rounded-full">LIVE 통역</span>
                </button>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-50 space-y-3 sm:space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 shadow-md ${message.role === 'user'
                                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                                : 'bg-white text-gray-800 border-l-4 border-purple-500'
                                }`}
                        >
                            <div className="leading-relaxed">
                                {message.role === 'user' ? (
                                    <p className="whitespace-pre-wrap text-white text-sm sm:text-base">{message.parts}</p>
                                ) : (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mt-3 sm:mt-4 mb-1.5 sm:mb-2">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mt-2 sm:mt-3 mb-1 sm:mb-2">{children}</h2>,
                                            h3: ({ children }) => <h3 className="text-base sm:text-xl font-bold text-gray-800 mt-1.5 sm:mt-2 mb-1">{children}</h3>,
                                            p: ({ children }) => <p className="text-gray-800 mb-1.5 sm:mb-2 text-sm sm:text-base">{children}</p>,
                                            strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                                            ul: ({ children }) => <ul className="list-disc list-inside mb-1.5 sm:mb-2 space-y-0.5 sm:space-y-1 text-sm sm:text-base">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal list-inside mb-1.5 sm:mb-2 space-y-0.5 sm:space-y-1 text-sm sm:text-base">{children}</ol>,
                                            li: ({ children }) => <li className="text-gray-800">{children}</li>,
                                            code: ({ children }) => <code className="text-purple-600 bg-purple-50 px-1 rounded text-sm sm:text-base">{children}</code>,
                                            pre: ({ children }) => <pre className="bg-gray-100 p-1.5 sm:p-2 rounded mb-1.5 sm:mb-2 overflow-x-auto text-sm sm:text-base">{children}</pre>,
                                            a: ({ children, href }) => <a href={href} className="text-purple-600 hover:text-purple-700 underline text-sm sm:text-base" target="_blank" rel="noopener noreferrer">{children}</a>,
                                        }}
                                    >
                                        {message.parts}
                                    </ReactMarkdown>
                                )}
                            </div>
                            <p className={`text-xs sm:text-sm mt-1.5 sm:mt-2 ${message.role === 'user' ? 'text-purple-100' : 'text-gray-400'}`}>
                                {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white text-gray-800 border-l-4 border-purple-500 rounded-2xl p-3 sm:p-4 shadow-md">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span className="text-sm sm:text-base text-gray-600">답변 생성 중...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* 추천 질문 (메시지가 적을 때만 표시) */}
            {messages.length <= 2 && (
                <div className="p-2 sm:p-4 bg-white border-t">
                    <p className="text-sm sm:text-base text-gray-600 mb-2">💡 추천 질문:</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {suggestedQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => setInput(question)}
                                className="px-2 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-base bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 입력 영역 */}
            <div className="p-2 sm:p-4 bg-white rounded-b-3xl shadow-xl border-t">
                <div className="flex gap-1.5 sm:gap-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="질문을 입력하세요..."
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 resize-none text-base sm:text-lg"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all text-base sm:text-lg ${!input.trim() || isLoading
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105'
                            }`}
                    >
                        {isLoading ? '⏳' : '전송'}
                    </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                    ⚠️ AI가 생성한 답변은 참고용입니다.
                </p>
            </div>

            {showLive && <LiveTranslator onClose={() => setShowLive(false)} />}
        </div>
    );
}
