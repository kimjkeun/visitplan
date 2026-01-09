import { DaySchedule, ChecklistItem } from '@/types';

export const tourData: DaySchedule[] = [
  {
    id: 'day1',
    dayNumber: 1,
    title: '도착 & 펑지아 야시장',
    subtitle: '타이중 입성 및 최대 야시장 탐방',
    flight: {
      departure: '인천',
      arrival: '타이중 국제공항(RMQ)',
      departureTime: '15:20',
      arrivalTime: '17:30'
    },
    timeline: [
      {
        time: '17:30 ~ 18:30',
        title: '입국 수속 & 준비',
        details: '입국 수속, 환전, 유심/이지카드 수령'
      },
      {
        time: '18:30 ~ 19:10',
        title: '숙소로 이동',
        details: '체크인 및 짐 풀기',
        tips: '추천: Uber 이용 (약 600~800 TWD / 30~40분 소요)\n대안: 302번 버스 (짐 많으면 비추천)'
      },
      {
        time: '19:30 ~ 21:00',
        title: '저녁: 펑지아 야시장',
        details: '대만 최대 규모 야시장 탐방',
        priority: true,
        location: {
          name: '펑지아 야시장 (Fengjia Night Market)',
          searchQuery: 'Fengjia Night Market, Taichung, Taiwan',
          lat: 24.1797,
          lng: 120.6478,
          address: 'Fengjia Rd, Xitun District, Taichung City, Taiwan'
        },
        mustEat: {
          title: '🍴 필수 먹거리 BEST 5',
          items: [
            '1. 악마 지파이 (두툼한 닭가슴살 튀김)',
            '2. 명륜단빙 (쫄깃한 대만식 에그롤)',
            '3. 대왕 오징어 튀김',
            '4. 고구마볼 (디저트로 딱!)',
            '5. 파파야 우유'
          ]
        }
      },
      {
        time: '21:00 ~',
        title: '숙소 복귀 및 휴식',
        details: '편의점 들러 타이완 맥주 한 캔으로 마무리 🍺'
      }
    ]
  },
  {
    id: 'day2',
    dayNumber: 2,
    title: '시내 핵심 투어',
    subtitle: '무지개마을 & 이중제 거리',
    timeline: [
      {
        time: '09:00 ~ 10:00',
        title: '아침: 타이중 제2시장',
        details: "'나 혼자 산다' 팜유 패밀리가 극찬한 조식 성지",
        location: {
          name: '타이중 제2시장 (Second Market)',
          searchQuery: 'Taichung Second Market, Taiwan',
          lat: 24.1438,
          lng: 120.6775,
          address: 'No. 53, Sanmin Rd, Central District, Taichung City, Taiwan'
        },
        mustEat: {
          title: '🍴 추천 메뉴',
          items: [
            '산허루 Rouwan (고기완자)',
            '무떡',
            '노포 밀크티'
          ]
        }
      },
      {
        time: '10:00 ~ 11:30',
        title: '무지개마을 (Rainbow Village)',
        details: '알록달록한 벽화 마을, 커플 사진 필수 코스 📸',
        priority: true,
        location: {
          name: 'Rainbow Village',
          searchQuery: 'Rainbow Village 彩虹眷村 Taichung',
          lat: 24.1283,
          lng: 120.6154,
          address: 'Lane 56, Chunan Rd, Nantun District, Taichung City, Taiwan'
        },
        tips: '시내에서 거리가 꽤 되므로 Uber/택시 추천'
      },
      {
        time: '12:00 ~ 13:30',
        title: '점심: 딩샨 & 춘수당',
        details: '',
        location: {
          name: '딩샨 (Ding Shan Meatball)',
          searchQuery: 'Ding Shan Meatball, Taichung, Taiwan',
          lat: 24.1440,
          lng: 120.6778,
          address: 'Taichung Second Market area'
        },
        mustEat: {
          title: '🍴 메뉴 구성',
          items: [
            '[식사] 딩샨 (Ding Shan Meatball): 100년 전통 고기완자',
            '(*제2시장 건너편, 18:30 마감이라 점심 방문 추천)',
            '[디저트] 춘수당 본점: 원조 버블티(쩐쭈나이차) 테이크아웃'
          ]
        }
      },
      {
        time: '13:30 ~ 15:00',
        title: '성품서점(Eslite) & 캘리그라피 그린웨이',
        details: '춘수당 본점 바로 근처, 힙한 복합 문화 공간\n시민광장 잔디밭에서 잠시 힐링 or 서점 구경',
        location: {
          name: '성품서점 타이중점',
          searchQuery: 'Eslite Spectrum 誠品園道店 Taichung',
          lat: 24.1513,
          lng: 120.6685
        }
      },
      {
        time: '15:30 ~ 17:00',
        title: '타이중 공원 (Taichung Park)',
        details: '타이중의 랜드마크인 호심정(정자) 배경 사진\n도심 속 한적한 산책',
        location: {
          name: 'Taichung Park',
          searchQuery: 'Taichung Park, Taiwan',
          lat: 24.1443,
          lng: 120.6851
        }
      },
      {
        time: '17:30 ~ 19:30',
        title: '이중제 거리 (Yizhong Street)',
        details: '타이중 공원 바로 옆, 젊음의 거리 (학생들 많음)\n쇼핑 & 길거리 음식 (풍인계란카스테라, 닭발젤리, 도넛)',
        priority: true,
        location: {
          name: 'Yizhong Street',
          searchQuery: 'Yizhong Street, Taichung, Taiwan',
          lat: 24.1475,
          lng: 120.6854
        }
      },
      {
        time: '20:00 ~',
        title: '숙소 복귀 또는 발마사지',
        details: '',
        tips: "많이 걸은 날이라 '춘부라오' 마사지 추천 💆"
      }
    ]
  },
  {
    id: 'day3',
    dayNumber: 3,
    title: '일월담 힐링 데이',
    subtitle: 'Sun Moon Lake 자연 속으로',
    timeline: [
      {
        time: '07:30',
        title: '기상 및 준비',
        details: ''
      },
      {
        time: '08:30 ~ 10:30',
        title: '타이중 → 일월담 이동',
        details: '',
        tips: '버스: 난터우 버스 6670번 (간청터미널 or HSR역 탑승)\n소요시간: 약 1시간 30분 ~ 2시간\n준비물: 멀미약 추천 💊'
      },
      {
        time: '10:30 ~ 12:30',
        title: '일월담 유람선 투어',
        details: '코스: 수이서 → 현광사(할머니 차예단 먹기) → 이다샤오\n호수 빛깔 감상하며 인생샷 📸',
        priority: true,
        location: {
          name: 'Sun Moon Lake - Shuishe Pier',
          searchQuery: 'Sun Moon Lake Shuishe Pier, Nantou, Taiwan',
          lat: 23.8567,
          lng: 120.9119
        }
      },
      {
        time: '12:30 ~ 14:00',
        title: '점심: 이다샤오(Ita Thao) 먹자골목',
        details: '',
        location: {
          name: 'Ita Thao',
          searchQuery: 'Ita Thao, Sun Moon Lake, Taiwan',
          lat: 23.8447,
          lng: 120.9242
        },
        mustEat: {
          title: '🍴 추천 메뉴',
          items: [
            '닭날개 볶음밥',
            '홍차 아이스크림',
            '멧돼지 소시지'
          ]
        },
        tips: '식당보다 길거리 음식 투어 추천!'
      },
      {
        time: '14:00 ~ 16:00',
        title: '자유 시간 (선택)',
        details: '옵션 A: 일월담 케이블카 타고 전경 감상 🚡\n옵션 B: 수이서 부두로 돌아와 CNN 선정 자전거길 라이딩 🚴'
      },
      {
        time: '16:00 ~ 18:00',
        title: '일월담 → 타이중 복귀',
        details: '',
        tips: '돌아오는 버스 줄이 길 수 있으니 여유 있게 이동'
      },
      {
        time: '18:30 ~ 20:00',
        title: '저녁 자유 및 휴식',
        details: ''
      }
    ]
  },
  {
    id: 'day4',
    dayNumber: 4,
    title: '미슐랭 맛집 & 고미습지',
    subtitle: '황금빛 노을을 찾아서',
    timeline: [
      {
        time: '09:30 ~ 10:30',
        title: '느긋한 기상',
        details: ''
      },
      {
        time: '11:00 ~ 12:30',
        title: '궁원안과 & 제4신용합작소',
        details: '궁원안과: 해리포터 인테리어 구경 & 펑리수 쇼핑 🏛️\n제4신용합작소: 앉아서 와플/아이스크림 먹기 (궁원안과 도보 3분)',
        location: {
          name: '궁원안과 (Miyahara)',
          searchQuery: 'Miyahara, Taichung, Taiwan',
          lat: 24.1407,
          lng: 120.6839
        }
      },
      {
        time: '12:30 ~ 13:30',
        title: '점심: 푸딩왕 (Fu Ding Wang)',
        details: '부드러운 족발덮밥 맛집\n대기 있을 수 있음 (회전율 빠름)',
        location: {
          name: 'Fu Ding Wang',
          searchQuery: 'Fu Ding Wang Restaurant, Taichung, Taiwan',
          lat: 24.1464,
          lng: 120.6840
        },
        mustEat: {
          title: '⭐ 미슐랭 빕구르망 선정',
          items: ['족발덮밥']
        }
      },
      {
        time: '14:00 ~ 15:00',
        title: '잠시 휴식 or 카페',
        details: ''
      },
      {
        time: '15:30 ~ 16:30',
        title: '고미습지로 이동',
        details: '',
        tips: '버스: 309번 (배차 간격 확인 필수)\n추천: 택시투어 또는 KKday/Klook 반일 투어 (돌아올 때 편함)'
      },
      {
        time: '16:30 ~ 18:30',
        title: '고미습지 (Gaomei Wetlands)',
        details: '풍력발전기와 갯벌의 환상적인 일몰 🌅',
        priority: true,
        location: {
          name: 'Gaomei Wetlands',
          searchQuery: 'Gaomei Wetlands, Taichung, Taiwan',
          lat: 24.3117,
          lng: 120.5497
        },
        tips: '바람이 많이 부니 겉옷 준비 🧥'
      },
      {
        time: '19:00 ~ 20:30',
        title: '저녁: 칭징저 훠궈 (Karuisawa)',
        details: '분위기 좋은 1인 훠궈 🍲',
        tips: '예약 필수, 못했으면 현장 대기'
      },
      {
        time: '20:30 ~ 21:30',
        title: '찻집: 무위초당 (Wuwei Chawtang)',
        details: '도심 속 고즈넉한 전통 찻집 🍵',
        priority: true,
        mustEat: {
          title: '⭐ 미슐랭 2스타 선정',
          items: ['전통 대만차']
        },
        tips: '21:30 마감 유의'
      },
      {
        time: '22:00 ~',
        title: '전신 마사지 후 호텔 복귀',
        details: '춘부라오 등 전신 마사지 추천 💆'
      }
    ]
  },
  {
    id: 'day5',
    dayNumber: 5,
    title: '아쉬움 달래기',
    subtitle: '심계신촌 & 미식 마무리',
    timeline: [
      {
        time: '10:00',
        title: '체크아웃 & 짐 보관',
        details: '호텔 또는 타이중 역에 짐 보관'
      },
      {
        time: '10:30 ~ 12:30',
        title: '심계신촌 (Shenji New Village)',
        details: '첫날 일정에서 아쉽게 빠졌던 힙플레이스\n예쁜 카페에서 커피 한 잔 & 소품샵 구경 ☕',
        location: {
          name: 'Shenji New Village',
          searchQuery: 'Shenji New Village, Taichung, Taiwan',
          lat: 24.1392,
          lng: 120.6617
        }
      },
      {
        time: '12:30 ~ 13:30',
        title: '점심: 미술원길 (Art Garden) 맛집',
        details: '심계신촌 바로 옆, 이국적인 레스토랑 거리',
        mustEat: {
          title: '🍴 추천 메뉴',
          items: ['훠궈, 이탈리안, 또는 대만 가정식']
        }
      },
      {
        time: '13:30 ~ 14:30',
        title: '국립대만미술관 & 녹지 산책',
        details: '식사 후 여유로운 미술관 정원 산책 🌳',
        location: {
          name: 'National Taiwan Museum of Fine Arts',
          searchQuery: 'National Taiwan Museum of Fine Arts, Taichung',
          lat: 24.1408,
          lng: 120.6638
        }
      },
      {
        time: '14:30 ~ 16:00',
        title: '마지막 쇼핑 (타이중 역 근처)',
        details: '타이중 특산품 구매\n편의점/마트 털기 🛍️'
      },
      {
        time: '16:00 ~ 16:30',
        title: '짐 찾기 & 공항 이동 준비',
        details: ''
      },
      {
        time: '16:30',
        title: '공항으로 출발',
        details: '',
        tips: '택시/Uber 추천'
      }
    ],
    flight: {
      departure: '타이중',
      arrival: '인천',
      departureTime: '19:30',
      arrivalTime: '23:05'
    }
  }
];

export const initialChecklist: ChecklistItem[] = [
  { id: '1', label: '여권 (유효기간 확인)', checked: false },
  { id: '2', label: '항공권 예약 확인', checked: false },
  { id: '3', label: '숙소 예약 확인', checked: false },
  { id: '4', label: '유심/이지카드 예약', checked: false },
  { id: '5', label: '환전 (TWD)', checked: false },
  { id: '6', label: '해외여행자보험', checked: false },
  { id: '7', label: '카메라/충전기', checked: false },
  { id: '8', label: '멀미약', checked: false },
  { id: '9', label: '선크림/모자', checked: false },
  { id: '10', label: '겉옷 (고미습지용)', checked: false },
  { id: '11', label: '편한 신발 (많이 걷기)', checked: false },
  { id: '12', label: 'Uber 앱 설치', checked: false }
];
