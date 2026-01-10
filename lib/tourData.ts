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
        placeInfo: {
          description: '펑지아 야시장은 대만 전역에서 가장 큰 규모를 자랑하는 야시장으로, 타이중을 대표하는 필수 관광 명소입니다. 1960년대 펑지아대학교가 설립되면서 자연스럽게 형성되기 시작했으며, 현재는 400개가 넘는 노점상과 상점들이 밀집해 있는 거대한 먹거리 천국으로 발전했습니다. 매일 저녁이면 현지인과 관광객들로 북적이며, 특히 주말에는 수만 명의 인파가 몰려 활기찬 분위기를 자아냅니다. 대만의 전통 간식부터 창의적인 퓨전 음식까지, 이곳에서만 맛볼 수 있는 독특한 메뉴들이 가득합니다. 단순히 먹거리만이 아니라 의류, 액세서리, 게임 등 다양한 쇼핑과 엔터테인먼트를 즐길 수 있어 "타이중의 밤을 책임지는 곳"이라는 별명을 가지고 있습니다. 대학가 특유의 젊고 자유로운 분위기 속에서 대만의 진정한 야시장 문화와 서민들의 활기찬 일상을 체험할 수 있는 곳입니다.',
          highlights: [
            '대만 전통 간식부터 현대식 퓨전 음식까지 다양한 메뉴',
            '저렴한 가격에 풍부한 양, 1인 200-300 TWD면 배불리',
            '의류, 액세서리, 게임 등 쇼핑도 즐길 수 있음',
            '대학가 분위기로 젠고 활기찬 분위기',
            '대만의 독특한 야시장 문화와 인심 체험'
          ],
          hours: '매일 17:00 ~ 02:00 (노점마다 상이, 피크타임 19:00~23:00)',
          admission: '무료',
          recommendations: '주말과 공휴일은 매우 혼잡하니 평일 방문 추천. 현금 준비 필수! 대부분 카드 불가. 저녁 7시부터 본격적으로 사람이 모이기 시작합니다. 작은 가방 챙기고 다니면 편해요!'
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
        placeInfo: {
          description: '무지개마을은 한 노인의 순수한 열정이 만들어낸 기적 같은 이야기를 간직한 곳입니다. 1949년 국공내전 이후 중국 본토에서 건너온 퇴역 군인들이 정착한 이 작은 마을은 2008년 재개발 계획으로 철거 위기에 처했습니다. 당시 87세였던 황융푸(黃永阜) 할아버지는 마을을 지키기 위해 혼자서 벽과 바닥, 골목 곳곳에 형형색색의 그림을 그리기 시작했습니다. 새, 동물, 사람 등 순수하고 밝은 색채의 캐릭터들과 "평화", "행복" 같은 긍정적인 메시지들이 마을 전체를 뒤덮었고, 이 소식이 알려지면서 전 세계에서 사람들이 찾아오기 시작했습니다. 결국 시민들의 청원과 관심 덕분에 마을은 보존되었고, 현재는 타이중의 대표적인 문화 관광지로 자리잡았습니다. 현재 90대 중반이 된 할아버지는 여전히 마을을 지키며 방문객들을 반갑게 맞이하고 계십니다. 작은 마을이지만 그 안에 담긴 이야기와 예술성, 그리고 한 사람의 집념이 만들어낸 감동은 방문하는 모든 이들의 마음을 따뜻하게 만듭니다.',
          highlights: [
            '할아버지가 직접 그린 독특한 캐릭터와 동물 그림',
            '인스타그램 감성 사진 촬영 명소, 모든 벽면이 포토존',
            '작지만 알찬 기념품 가게, 엽서와 스티커 구매 가능',
            '감동적인 스토리와 함께 즐기는 예술 체험',
            '지역 주민들의 따뜻한 환대'
          ],
          hours: '매일 08:00 ~ 18:00',
          admission: '무료 (기부 환영, 기념품 구매로 지원 가능)',
          recommendations: '아침 일찍 방문하면 사람이 적어 사진 찍기 좋습니다. 운이 좋으면 할아버지를 만날 수도! 마을이 작으니 30분~1시간 정도면 충분합니다. 택시나 Uber로 이동 추천!'
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
        },
        placeInfo: {
          description: '이중제 거리는 타이중 일중고등학교(一中街) 주변에 자연스럽게 형성된 젊음의 거리로, 타이중의 "홍대"라고 불릴 만큼 활기차고 트렌디한 분위기를 자랑합니다. 1980년대부터 학생들을 대상으로 한 작은 가게들이 모이기 시작했고, 지금은 약 500m에 달하는 거리 양쪽으로 수백 개의 상점과 노점들이 빼곡히 들어서 있습니다. 펑지아 야시장과는 달리 낮부터 영업하는 곳이 많아 오후부터 저녁까지 꾸준히 사람들로 붐빕니다. 학생들을 타겟으로 하는 만큼 가격이 매우 저렴하면서도 품질이 좋아 가성비 쇼핑의 천국으로 알려져 있습니다. 특히 한국에서는 보기 힘든 독특한 길거리 음식들이 많아 미식 탐험을 즐기기에 완벽한 곳입니다. 풍인계란 카스테라의 달콤한 향기, 닭발젤리의 쫄깃한 식감, 다양한 수제 도너츠와 음료들이 거리를 가득 채웁니다. 대학가 특유의 안전하고 자유로운 분위기 덕분에 밤늦게까지 편안하게 돌아다닐 수 있으며, 타이중 공원과도 도보 5분 거리에 있어 함께 둘러보기 좋습니다.',
          highlights: [
            '풍인계란 카스테라, 닭발젤리 등 독특한 길거리 음식',
            '저렴한 가격의 의류, 액세서리 쇼핑',
            '한국에서 보기 힘든 도너츠, 디저트 가게들',
            '대학가 분위기로 안전하고 활기찬 분위기',
            '타이중 공원과 가까워 함께 둘러보기 좋음'
          ],
          hours: '매일 11:00 ~ 24:00 (가게마다 상이)',
          admission: '무료',
          recommendations: '저녁 시간대가 가장 활기차요. 현금 준비 필수! 가방은 가볍게 챙기고 다니면 편해요. 타이중 공원에서 걸어서 5분 거리로 가까워요!'
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
        },
        placeInfo: {
          description: '일월담(日月潭, Sun Moon Lake)은 대만에서 가장 크고 아름다운 고산 호수로, 해발 748m에 위치한 대만의 대표적인 관광 명소입니다. 호수의 북쪽은 해처럼 둥글고, 남쪽은 초승달처럼 길어 "일월담"이라는 이름이 붙여졌습니다. 매일 다른 모습을 보여주는 신비로운 호수로, 새벽 안개, 오전의 맑은 하늘, 저녁 노을 등 시간대별로 전혀 다른 풍경을 선사합니다. 호수 둘레는 약 33km로, 유람선을 타고 주요 부두(수이서, 현광사, 이다샤오)를 돌아볼 수 있습니다. 원주민 샤족의 성지로 여겨지며, 호수 주변에는 샤족 문화를 체험할 수 있는 마을들이 있습니다. 특히 현광사는 대만 불교의 중심지로, 아름다운 사찰과 함께 유명한 아샤리나 할머니의 차예단(차로 만든 계란)을 맛볼 수 있습니다. CNN이 선정한 세계에서 가장 아름다운 자전거 길 중 하나로 선정되기도 했으며, 호수 둔레를 돌며 자연을 만끽하는 것도 인기 있는 액티비티입니다. 케이블카를 타고 올라가면 호수 전체를 한눈에 담을 수 있는 전망대도 있습니다.',
          highlights: [
            '대만 최대 고산 호수, 해발 748m의 청정한 자연',
            '유람선으로 주요 부두 투어 (수이서-현광사-이다샤오)',
            '현광사의 아샤리나 할머니 차예단 (필수 먹거리)',
            'CNN 선정 세계에서 가장 아름다운 자전거길',
            '샤족 원주민 문화 체험 가능',
            '케이블카로 호수 전체 조망 가능'
          ],
          hours: '유람선 운행: 09:00 ~ 17:00 (계절별 상이)',
          admission: '유람선 일일권 약 300 TWD',
          recommendations: '유람선은 세 부두를 순환하는 일일권을 구매하면 편리합니다. 현광사에서 차예단은 꼭 먹어보세요! 자전거를 랜트하려면 수이서 부두 근처에 대여점이 많습니다. 산악 지형이라 멀미약 챙기면 좋아요. 아침 일찍 출발하면 안개 낀 호수의 신비로운 모습을 볼 수 있습니다!'
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
        },
        placeInfo: {
          description: '궁원안과(宮原眼科)는 1927년 일제강점기에 일본인 안과의사 미야하라 타카오가 개업한 안과병원으로, 당시 타이중에서 가장 크고 현대적인 안과였습니다. 하지만 세월이 흘러 폐허가 되어 버려졌던 이 건물을 2010년 대만의 유명 제과업체 "일출(日出)"가 인수하여 5년에 걸쳐 복원했습니다. 복고풍 유럽 스타일의 웅장한 내부는 마치 해리포터의 호그와트 도서관을 연상시키며, 천장까지 닿는 높은 서가에는 책과 펑리수(파인애플 케이크) 상자들이 예술작품처럼 진열되어 있습니다. 1층은 펑리수 전문점으로 대만 최고의 펑리수를 판매하며, 2층은 고급 레스토랑으로 운영됩니다. 특히 유명한 것은 아이스크림으로, 타이중을 대표하는 디저트로 자리잡았습니다. 다양한 토핑과 함께 제공되는 화려한 비주얼은 SNS에서 큰 인기를 끌고 있습니다. 단순한 쇼핑 공간을 넘어 타이중의 역사와 현대가 조화롭게 공존하는 문화 공간으로, 방문객들에게 시각적 즉거움과 미각적 만족을 동시에 선사하는 곳입니다.',
          highlights: [
            '해리포터 도서관 같은 웅장한 복고풍 인테리어',
            '대만 최고 품질의 펑리수(파인애플 케이크) 쇼핑',
            '화려한 토핑의 아이스크림, 인스타그램 필수 코스',
            '1927년 일제강점기 건축물의 아름다운 복원',
            '타이중역 바로 앞, 접근성 우수'
          ],
          hours: '매일 10:00 ~ 22:00',
          admission: '무료 (쇼핑 및 식사는 별도)',
          recommendations: '아이스크림은 인기가 많아 대기 시간이 길 수 있으니 여유있게 방문하세요. 펑리수는 선물용으로 인기가 많으며, 여러 종류를 시식해볼 수 있는 세트 상품도 있습니다. 도보 3분 거리의 제4신용합작소도 함께 방문 추천!'
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
        placeInfo: {
          description: '고미습지(高美濕地)는 타이중 서쪽 해안에 위치한 약 1,500헥타르 규모의 해안 습지로, 대만에서 가장 아름다운 일몰 명소로 손꼽힙니다. 1970년대까지는 해수욕장으로 유명했으나, 해안선 변화로 갯벌이 형성되면서 2004년 습지 보호구역으로 지정되었습니다. 이곳의 가장 큰 매력은 하늘과 바다, 갯벌이 하나로 어우러지는 일몰 풍경입니다. 특히 18기의 거대한 흰색 풍력발전기가 줄지어 선 모습은 초현실적인 풍경을 만들어냅니다. 일몰 시간에는 하늘이 주황빛, 분홍빛, 보라빛으로 물들며 갯벌에 반사되어 환상적인 경관을 연출합니다. 약 500m 길이의 목재 산책로가 설치되어 있어 편안하게 갯벌을 걸을 수 있으며, 다양한 갯벌 생물들도 관찰할 수 있습니다. 생태계 보호를 위해 특정 구역은 출입이 제한되어 있으며, 방문객들은 지정된 산책로를 따라 자연을 즉길 수 있습니다. 타이중 시내에서 약 40분 거리에 있어 반나절 투어로 인기가 많으며, 특히 커플들에게 로맨틱한 일몰 명소로 사랑받고 있습니다.',
          highlights: [
            '18기의 거대한 풍력발전기와 갯벌의 조화',
            '대만 최고의 일몰 명소, 하늘과 바다가 붉게 물들는 장관',
            '500m 목재 산책로로 편안한 갯벌 체험',
            '다양한 갯벌 생물 관찰 가능',
            '커플 포토존으로 인기, 로맨틱한 분위기'
          ],
          hours: '매일 24시간 (일몰 1시간 전 방문 추천)',
          admission: '무료',
          recommendations: '일몰 시간 1시간 전에 도착하면 좋습니다. 해안가라 바람이 매우 강하니 겹옷 필수! 갯벌을 걷고 싶다면 샌들이나 슬리퍼 착용 추천. 돌아오는 버스 배차간격이 길어 택시나 투어 이용이 편리합니다. 일몰 시간은 계절마다 다르니 미리 확인하세요!'
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
