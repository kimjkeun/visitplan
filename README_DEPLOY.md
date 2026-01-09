# 🌴 대만 타이중 4박 5일 여행 가이드

TypeScript + Next.js로 제작된 PWA (Progressive Web App) 여행 가이드입니다.

## ✨ 주요 기능

### 1단계 기능 (완료)
- ✅ **TypeScript + Next.js 15** - 최신 웹 기술 스택
- ✅ **로컬 스토리지** - 체크리스트, 메모, 경비 자동 저장
- ✅ **환율 계산기** - KRW ↔ TWD 실시간 계산
- ✅ **D-Day 카운트다운** - 여행까지 남은 시간 표시
- ✅ **구글 맵 연동** - 각 장소마다 지도 링크 제공
- ✅ **PWA 설정** - 오프라인에서도 작동, 홈 화면에 추가 가능
- ✅ **경비 추적기** - 카테고리별 지출 관리

### 추가 기능
- 📝 각 일정마다 개인 메모 추가
- 📍 우선순위 장소 표시
- 🍴 필수 먹거리 정보
- 💡 여행 팁 제공
- 📊 지출 분석 (카테고리별)

## 🚀 로컬 개발 환경 설정

### 1. 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 2. 설치 및 실행
```bash
# 프로젝트 디렉토리로 이동
cd taiwan-tour-app

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

### 3. 브라우저에서 확인
```
http://localhost:3000
```

## 📱 PWA 기능 테스트

### 로컬 테스트 (프로덕션 빌드 필요)
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### PWA 설치 방법
1. Chrome/Edge에서 주소창 오른쪽의 "설치" 아이콘 클릭
2. 모바일에서는 "홈 화면에 추가" 선택
3. 앱처럼 단독 실행 가능!

### 오프라인 테스트
1. 개발자 도구 (F12) → Application → Service Workers
2. "Offline" 체크
3. 새로고침해도 작동 확인!

## 🌐 Vercel 배포 (무료)

### 방법 1: GitHub 연동 (추천)

1. **GitHub 저장소 생성**
```bash
cd taiwan-tour-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/taiwan-tour.git
git push -u origin main
```

2. **Vercel 배포**
   - https://vercel.com 접속
   - "Sign up with GitHub" (무료 계정 생성)
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - "Deploy" 클릭!

3. **자동 배포**
   - 코드 push 시 자동으로 배포됩니다
   - 배포 URL: `https://your-project.vercel.app`

### 방법 2: CLI 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 배포 후 확인사항
- ✅ PWA가 제대로 작동하는지 확인
- ✅ 모바일에서 "홈 화면에 추가" 가능한지 확인
- ✅ 오프라인 모드 작동 확인

## 🎨 커스터마이징

### 환율 변경
`components/CurrencyConverter.tsx` 파일에서 기본 환율 수정:
```typescript
exchangeRate: 37.5, // 여기를 현재 환율로 변경
```

### 여행 일정 수정
`lib/tourData.ts` 파일에서 일정 데이터 수정

### 색상 테마 변경
- 메인 색상: `from-pink-500 to-rose-400` (Tailwind CSS)
- `app/globals.css`에서 전역 스타일 수정

## 📂 프로젝트 구조

```
taiwan-tour-app/
├── app/
│   ├── layout.tsx          # 레이아웃 및 메타데이터
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 글로벌 스타일
├── components/
│   ├── Header.tsx          # D-Day 카운트다운 포함 헤더
│   ├── Navigation.tsx      # 탭 네비게이션
│   ├── DaySchedule.tsx     # 일정 표시
│   ├── TimelineItem.tsx    # 개별 일정 아이템 (지도 + 메모)
│   ├── Checklist.tsx       # 체크리스트
│   ├── CurrencyConverter.tsx  # 환율 계산기
│   └── ExpenseTracker.tsx  # 경비 추적
├── lib/
│   ├── store.ts            # Zustand 전역 상태 관리
│   ├── tourData.ts         # 여행 일정 데이터
│   └── localStorage.ts     # 로컬 스토리지 유틸
├── types/
│   └── index.ts            # TypeScript 타입 정의
└── public/
    └── manifest.json       # PWA 설정
```

## 🐛 문제 해결

### PWA가 설치되지 않는 경우
1. HTTPS로 접속했는지 확인 (localhost 제외)
2. manifest.json 파일 확인
3. 아이콘 파일 (192x192, 512x512) 추가 필요

### 빌드 에러 발생 시
```bash
# 캐시 삭제 후 재빌드
rm -rf .next
npm run build
```

### TypeScript 에러
```bash
# 타입 체크
npm run build
```

## 📱 아이콘 추가 (선택사항)

PWA 아이콘을 추가하려면 `public/` 폴더에 다음 파일을 추가하세요:
- `icon-192x192.png` (192x192 픽셀)
- `icon-512x512.png` (512x512 픽셀)

온라인 아이콘 생성기 추천:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

## 🎉 완성!

이제 여행을 떠나세요!
- 📱 모바일에 설치
- ✈️ 비행기에서 오프라인 확인
- 🌍 타이중에서 데이터 없이 사용

즐거운 여행 되세요! 🌴
