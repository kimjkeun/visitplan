import { useState, useEffect, useRef, useCallback } from 'react';

const MODEL = 'models/gemini-2.5-flash-native-audio-preview-12-2025';
const HOST = 'generativelanguage.googleapis.com';
const WS_URL = `wss://${HOST}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

export interface LiveTranslationState {
    isConnected: boolean;
    isRecording: boolean;
    error: string | null;
    volume: number;
}

export const useLiveTranslation = () => {
    const [state, setState] = useState<LiveTranslationState>({
        isConnected: false,
        isRecording: false,
        error: null,
        volume: 0,
    });

    const wsRef = useRef<WebSocket | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const workletNodeRef = useRef<AudioWorkletNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioQueueRef = useRef<Int16Array[]>([]);
    const isPlayingRef = useRef<boolean>(false);
    const nextPlayTimeRef = useRef<number>(0);

    const connect = useCallback(async () => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
            if (!apiKey) throw new Error('API Key not found');

            const url = `${WS_URL}?key=${apiKey}`;
            const ws = new WebSocket(url);

            ws.onopen = () => {
                console.log('Gemini Live Connected');
                setState(prev => ({ ...prev, isConnected: true, error: null }));

                const setupMessage = {
                    setup: {
                        model: MODEL,
                        generation_config: {
                            response_modalities: ["AUDIO"],
                            speech_config: {
                                voice_config: {
                                    prebuilt_voice_config: {
                                        voice_name: "Aoede"
                                    }
                                }
                            }
                        },
                        system_instruction: {
                            parts: [{
                                text: `You are a helpful real-time translator between Korean and Traditional Chinese (Taiwan). 
                When you hear Korean, translate it to Chinese instantly. 
                When you hear Chinese, translate it to Korean instantly.
                If the user asks a specific question about Taiwan tour, answer it briefly in the translated language.
                Keep the tone natural and helpful. Do not explain, just translate.`
                            }]
                        }
                    }
                };
                ws.send(JSON.stringify(setupMessage));
            };

            ws.onmessage = async (event) => {
                let data: any;
                if (event.data instanceof Blob) {
                    const text = await event.data.text();
                    data = JSON.parse(text);
                } else {
                    data = JSON.parse(event.data);
                }

                if (data.serverContent?.modelTurn?.parts?.[0]?.inlineData) {
                    const audioBase64 = data.serverContent.modelTurn.parts[0].inlineData.data;
                    const audioData = base64ToPCM(audioBase64);
                    enqueueAudio(audioData);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket Error:', error);
                setState(prev => ({ ...prev, error: 'Connection error' }));
            };

            ws.onclose = () => {
                console.log('WebSocket Closed');
                setState(prev => ({ ...prev, isConnected: false }));
            };

            wsRef.current = ws;
        } catch (err: any) {
            setState(prev => ({ ...prev, error: err.message }));
        }
    }, []);

    const disconnect = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        stopRecording();
        setState(prev => ({ ...prev, isConnected: false, isRecording: false }));
    }, []);

    const startRecording = useCallback(async () => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error('WebSocket not connected');
            return;
        }

        try {
            const ctx = new AudioContext({ sampleRate: 16000 });
            await ctx.audioWorklet.addModule('/pcm-processor.js');
            audioContextRef.current = ctx;

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    sampleRate: 16000,
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });
            streamRef.current = stream;

            const source = ctx.createMediaStreamSource(stream);
            const processor = new AudioWorkletNode(ctx, 'pcm-processor');

            processor.port.onmessage = (e) => {
                const pcmData = e.data as ArrayBuffer;

                const int16Array = new Int16Array(pcmData);
                let sum = 0;
                for (let i = 0; i < int16Array.length; i += 50) {
                    sum += Math.abs(int16Array[i]);
                }
                const avg = sum / (int16Array.length / 50);
                setState(prev => ({ ...prev, volume: Math.min(avg / 5000, 1.0) }));

                if (wsRef.current?.readyState === WebSocket.OPEN) {
                    const base64Audio = arrayBufferToBase64(pcmData);
                    wsRef.current.send(JSON.stringify({
                        realtime_input: {
                            media_chunks: [{
                                mime_type: "audio/pcm",
                                data: base64Audio
                            }]
                        }
                    }));
                }
            };

            source.connect(processor);
            workletNodeRef.current = processor;

            setState(prev => ({ ...prev, isRecording: true }));

        } catch (err: any) {
            console.error('Recording Error:', err);
            setState(prev => ({ ...prev, error: 'Microphone access fail: ' + err.message }));
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (workletNodeRef.current) {
            workletNodeRef.current.disconnect();
            workletNodeRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        setState(prev => ({ ...prev, isRecording: false, volume: 0 }));
    }, []);

    const enqueueAudio = (pcmData: Int16Array) => {
        audioQueueRef.current.push(pcmData);
        if (!isPlayingRef.current) {
            playNextChunk();
        }
    };

    const playNextChunk = async () => {
        if (audioQueueRef.current.length === 0) {
            isPlayingRef.current = false;
            return;
        }

        isPlayingRef.current = true;

        // Output is 24kHz
        const playbackCtx = new AudioContext({ sampleRate: 24000 });

        while (audioQueueRef.current.length > 0) {
            const chunk = audioQueueRef.current.shift();
            if (!chunk) break;

            const buffer = playbackCtx.createBuffer(1, chunk.length, 24000);
            const channelData = buffer.getChannelData(0);

            for (let i = 0; i < chunk.length; i++) {
                channelData[i] = chunk[i] / 32768.0;
            }

            const source = playbackCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(playbackCtx.destination);

            const currentTime = playbackCtx.currentTime;
            const startTime = nextPlayTimeRef.current < currentTime ? currentTime : nextPlayTimeRef.current;

            source.start(startTime);
            nextPlayTimeRef.current = startTime + buffer.duration;
        }
    };

    return {
        ...state,
        connect,
        disconnect,
        startRecording,
        stopRecording
    };
};

function base64ToPCM(base64: string): Int16Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Int16Array(bytes.buffer);
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
