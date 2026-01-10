# Gemini API 설정 가이드

## 1. API 키 발급

1. [Google AI Studio](https://aistudio.google.com/app/apikey)에 접속
2. "Get API Key" 클릭
3. API 키 복사

## 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Google Maps API Key (기존)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Gemini API Key (새로 추가)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

## 3. 주의사항

- `.env.local` 파일은 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함되어 있습니다)
- API 키는 절대 공개 저장소에 업로드하지 마세요
- Gemini API는 무료 할당량이 있으며, 초과 시 비용이 발생할 수 있습니다

## 4. API 사용량 확인

- [Google AI Studio](https://aistudio.google.com/)에서 API 사용량을 확인할 수 있습니다
- 무료 할당량: 분당 15 요청, 일일 1,500 요청 (2024년 기준, 변경될 수 있음)

## 5. 로컬 개발 서버 재시작

환경 변수를 추가한 후에는 개발 서버를 재시작해야 합니다:

```bash
npm run dev
```
