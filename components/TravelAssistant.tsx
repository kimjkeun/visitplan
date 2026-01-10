'use client';

import { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        <div className="flex flex-col h-[calc(100vh-200px)] max-h-[800px]">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-t-3xl shadow-xl">
                <h2 className="text-3xl font-bold mb-2">🤖 AI 여행 어시스턴트</h2>
                <p className="text-lg opacity-90">타이중 여행에 대해 무엇이든 물어보세요</p>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl p-4 shadow-md ${message.role === 'user'
                                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                                    : 'bg-white text-gray-800 border-l-4 border-purple-500'
                                }`}
                        >
                            <div className="text-sm leading-relaxed">
                                {message.role === 'user' ? (
                                    <p className="whitespace-pre-wrap text-white">{message.parts}</p>
                                ) : (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-xl font-bold text-gray-800 mt-3 mb-2">{children}</h2>,
                                            h3: ({ children }) => <h3 className="text-lg font-bold text-gray-800 mt-2 mb-1">{children}</h3>,
                                            p: ({ children }) => <p className="text-gray-800 mb-2">{children}</p>,
                                            strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                                            ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                            li: ({ children }) => <li className="text-gray-800">{children}</li>,
                                            code: ({ children }) => <code className="text-purple-600 bg-purple-50 px-1 rounded">{children}</code>,
                                            pre: ({ children }) => <pre className="bg-gray-100 p-2 rounded mb-2 overflow-x-auto">{children}</pre>,
                                            a: ({ children, href }) => <a href={href} className="text-purple-600 hover:text-purple-700 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                                        }}
                                    >
                                        {message.parts}
                                    </ReactMarkdown>
                                )}
                            </div>
                            <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-purple-100' : 'text-gray-400'}`}>
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
                        <div className="bg-white text-gray-800 border-l-4 border-purple-500 rounded-2xl p-4 shadow-md">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span className="text-sm text-gray-600">답변 생성 중...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* 추천 질문 (메시지가 적을 때만 표시) */}
            {messages.length <= 2 && (
                <div className="p-4 bg-white border-t">
                    <p className="text-sm text-gray-600 mb-2">💡 추천 질문:</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => setInput(question)}
                                className="px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 입력 영역 */}
            <div className="p-4 bg-white rounded-b-3xl shadow-xl border-t">
                <div className="flex gap-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="질문을 입력하세요... (Shift+Enter로 줄바꿈)"
                        className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 resize-none"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${!input.trim() || isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg hover:scale-105'
                            }`}
                    >
                        {isLoading ? '⏳' : '전송'}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    ⚠️ AI가 생성한 답변은 참고용입니다. 중요한 정보는 공식 출처를 확인하세요.
                </p>
            </div>
        </div>
    );
}
