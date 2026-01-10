import { GoogleGenerativeAI } from '@google/generative-ai';
import { tourData } from './tourData';

// Gemini API 클라이언트 초기화
const getGeminiClient = () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set');
    }
    return new GoogleGenerativeAI(apiKey);
};

// 여행 컨텍스트 생성
export const getTravelContext = () => {
    const context = `
당신은 타이중(Taichung, Taiwan) 여행 전문 AI 어시스턴트입니다.
사용자의 2026년 1월 12일~16일 타이중 여행을 돕는 역할입니다.

# 여행 일정 정보

${tourData.map(day => `
## ${day.title} (${day.subtitle})

${day.flight ? `
**항공편:**
- 출발: ${day.flight.departure} ${day.flight.departureTime}
- 도착: ${day.flight.arrival} ${day.flight.arrivalTime}
` : ''}

**일정:**
${day.timeline.map(item => `
- ${item.time}: ${item.title}
  ${item.details ? `상세: ${item.details}` : ''}
  ${item.tips ? `팁: ${item.tips}` : ''}
  ${item.mustEat ? `필수 먹거리: ${item.mustEat.items.join(', ')}` : ''}
`).join('\n')}
`).join('\n\n')}

# 숙소 정보
- 인하우스 호텔 그랜드 (薆悅酒店五權館)
- 주소: No. 228號, Wuquan Rd, North District, Taichung City, 대만 40443

# 답변 가이드라인
1. 친근하고 도움이 되는 톤으로 답변하세요
2. 구체적인 정보(시간, 장소, 가격 등)를 포함하세요
3. 실용적인 팁을 제공하세요
4. 한국어로 답변하세요
5. 여행 일정과 관련된 질문에는 위 정보를 참고하여 답변하세요
`;

    return context;
};

// Gemini API 호출
export const sendMessageToGemini = async (message: string, history: Array<{ role: string; parts: string }> = []) => {
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({
            model: 'gemini-3-flash-preview-0125',
            systemInstruction: getTravelContext()
        });

        // 대화 히스토리 포맷 변환
        const formattedHistory = history.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.parts }]
        }));

        const chat = model.startChat({
            history: formattedHistory
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        return {
            success: true,
            message: text
        };
    } catch (error) {
        console.error('Gemini API Error:', error);
        return {
            success: false,
            message: 'AI 응답을 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};
