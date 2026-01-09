# 🗺️ 구글 맵 API 설정 가이드

## 현재 상태

- ✅ 기본 지도 임베드 작동 (일부 제한 있음)
- ✅ "구글 맵 앱에서 열기" 버튼 작동
- ✅ **일자별 동선 지도** (Maps JavaScript API + Directions API)
- ⚠️ API 키 없이 사용 시 일부 기능 제한

## API 키가 필요한가요?

**동선 지도 기능을 사용하려면 필수입니다!** API 키를 설정하면:
- ✅ 모든 지도 타일 정상 로딩
- ✅ **일자별 여행 동선 시각화** (경로 표시)
- ✅ 대중교통 경로 정보
- ✅ 404 에러 없음
- ✅ 더 빠른 지도 로딩

## 🔑 구글 맵 API 키 발급 (무료, 5분)

### 1단계: Google Cloud Console 접속
https://console.cloud.google.com

### 2단계: 프로젝트 생성
1. 좌측 상단 프로젝트 선택 → "새 프로젝트"
2. 프로젝트 이름: `taiwan-tour` (원하는 이름)
3. "만들기" 클릭

### 3단계: 필요한 API 활성화
1. 좌측 메뉴 → "API 및 서비스" → "라이브러리"
2. 다음 API들을 검색하고 "사용 설정" 클릭:
   - **Maps JavaScript API** (동선 지도용 - 필수!)
   - **Directions API** (경로 계산용 - 필수!)
   - Maps Embed API (개별 장소 지도용)

### 4단계: API 키 생성
1. 좌측 메뉴 → "API 및 서비스" → "사용자 인증 정보"
2. 상단 "+ 사용자 인증 정보 만들기" → "API 키"
3. API 키가 생성됨! (예: `AIzaSyBFw0Qb...`)

### 5단계: API 키 제한 (보안, 선택사항)
1. 생성된 API 키 옆 "제한" 클릭
2. "애플리케이션 제한사항":
   - HTTP 리퍼러 선택
   - 웹사이트 제한사항 추가:
     - `localhost:3000/*` (개발용)
     - `your-domain.vercel.app/*` (배포용)
3. "API 제한사항":
   - "키 제한" 선택
   - "Maps Embed API" 체크
4. "저장"

### 6단계: 프로젝트에 API 키 추가

**.env.local 파일 수정:**
```bash
# .env.local 파일 열기
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=여기에_발급받은_API_키_붙여넣기
```

**예시:**
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8
```

### 7단계: 개발 서버 재시작
```bash
# 서버 중지 (Ctrl + C)
# 서버 재시작
npm run dev
```

## ✅ 테스트

1. 브라우저에서 `http://localhost:3000` 접속
2. Day 2 → 무지개마을 → "지도 보기"
3. 지도가 깔끔하게 로딩되면 성공! 🎉

## 🆓 무료 사용량

**Google Maps Embed API는 무료입니다!**
- 월 사용량 제한 없음
- 과금 걱정 없음
- 신용카드 등록 불필요

## ❓ 문제 해결

### API 키를 설정했는데도 여전히 에러가 나요
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 개발 서버를 재시작했는지 확인
3. API 키 앞뒤에 공백이나 따옴표가 없는지 확인

### API 키 없이 사용하고 싶어요
**문제없습니다!** API 키 없이도:
- ✅ 지도 기본 기능 작동
- ✅ "구글 맵 앱에서 열기" 버튼으로 정확한 위치 확인 가능
- ⚠️ 일부 콘솔 에러 표시 (무시 가능)

## 🌐 Vercel 배포 시

Vercel 대시보드에서 환경 변수 추가:
1. 프로젝트 → Settings → Environment Variables
2. Name: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
3. Value: 발급받은 API 키
4. "Save" 클릭
5. 재배포 (Deployments → 최신 배포 → "Redeploy")

완료! 🎉
