export interface TravelPhrase {
    id: string;
    category: 'greeting' | 'restaurant' | 'shopping' | 'transport' | 'hotel' | 'emergency' | 'tourist' | 'numbers';
    korean: string;
    chinese: string;  // 번체자
    pronunciation: string;  // 한글 발음
    priority?: boolean;
}

export const travelPhrases: TravelPhrase[] = [
    // 기본 인사/예의
    { id: 'g1', category: 'greeting', korean: '안녕하세요', chinese: '你好', pronunciation: '니하오', priority: true },
    { id: 'g2', category: 'greeting', korean: '감사합니다', chinese: '謝謝', pronunciation: '씨에씨에', priority: true },
    { id: 'g3', category: 'greeting', korean: '죄송합니다', chinese: '對不起', pronunciation: '뚜이부치', priority: true },
    { id: 'g4', category: 'greeting', korean: '네', chinese: '是', pronunciation: '스', priority: true },
    { id: 'g5', category: 'greeting', korean: '아니요', chinese: '不是', pronunciation: '부스' },
    { id: 'g6', category: 'greeting', korean: '괜찮아요', chinese: '沒關係', pronunciation: '메이관시' },
    { id: 'g7', category: 'greeting', korean: '도와주세요', chinese: '請幫我', pronunciation: '칭방워', priority: true },
    { id: 'g8', category: 'greeting', korean: '영어 할 수 있나요?', chinese: '你會說英文嗎？', pronunciation: '니후이슈어잉원마?' },
    { id: 'g9', category: 'greeting', korean: '한국어 할 수 있나요?', chinese: '你會說韓文嗎？', pronunciation: '니후이슈어한원마?' },
    { id: 'g10', category: 'greeting', korean: '천천히 말해주세요', chinese: '請說慢一點', pronunciation: '칭슈어만이디엔' },
    { id: 'g11', category: 'greeting', korean: '알겠습니다', chinese: '我知道了', pronunciation: '워즈다오러' },
    { id: 'g12', category: 'greeting', korean: '모르겠어요', chinese: '我不知道', pronunciation: '워부즈다오' },

    // 식당/음식
    { id: 'r1', category: 'restaurant', korean: '메뉴 주세요', chinese: '請給我菜單', pronunciation: '칭게이워차이단', priority: true },
    { id: 'r2', category: 'restaurant', korean: '이거 주세요', chinese: '我要這個', pronunciation: '워야오쩌거', priority: true },
    { id: 'r3', category: 'restaurant', korean: '물 주세요', chinese: '請給我水', pronunciation: '칭게이워슈이', priority: true },
    { id: 'r4', category: 'restaurant', korean: '계산서 주세요', chinese: '買單', pronunciation: '마이단', priority: true },
    { id: 'r5', category: 'restaurant', korean: '맵지 않게 해주세요', chinese: '不要辣', pronunciation: '부야오라' },
    { id: 'r6', category: 'restaurant', korean: '포장 가능한가요?', chinese: '可以外帶嗎？', pronunciation: '커이와이따이마?' },
    { id: 'r7', category: 'restaurant', korean: '추천 메뉴가 뭔가요?', chinese: '有什麼推薦的？', pronunciation: '요우션머투이지엔더?' },
    { id: 'r8', category: 'restaurant', korean: '맛있어요', chinese: '好吃', pronunciation: '하오츠' },
    { id: 'r9', category: 'restaurant', korean: '배불러요', chinese: '我飽了', pronunciation: '워바오러' },
    { id: 'r10', category: 'restaurant', korean: '예약했어요', chinese: '我有訂位', pronunciation: '워요우딩웨이' },
    { id: 'r11', category: 'restaurant', korean: '2명이에요', chinese: '兩位', pronunciation: '량웨이' },
    { id: 'r12', category: 'restaurant', korean: '채식주의자예요', chinese: '我吃素', pronunciation: '워츠수' },
    { id: 'r13', category: 'restaurant', korean: '알레르기 있어요', chinese: '我有過敏', pronunciation: '워요우궈민' },
    { id: 'r14', category: 'restaurant', korean: '영수증 주세요', chinese: '請給我收據', pronunciation: '칭게이워쇼우쥐' },

    // 쇼핑/가격
    { id: 's1', category: 'shopping', korean: '얼마예요?', chinese: '多少錢？', pronunciation: '뚜어샤오치엔?', priority: true },
    { id: 's2', category: 'shopping', korean: '깎아주세요', chinese: '便宜一點', pronunciation: '피엔이이디엔' },
    { id: 's3', category: 'shopping', korean: '카드 되나요?', chinese: '可以刷卡嗎？', pronunciation: '커이슈아카마?', priority: true },
    { id: 's4', category: 'shopping', korean: '영수증 주세요', chinese: '請給我發票', pronunciation: '칭게이워파피아오' },
    { id: 's5', category: 'shopping', korean: '더 큰 사이즈 있나요?', chinese: '有大一點的嗎？', pronunciation: '요우따이디엔더마?' },
    { id: 's6', category: 'shopping', korean: '더 작은 사이즈 있나요?', chinese: '有小一點的嗎？', pronunciation: '요우샤오이디엔더마?' },
    { id: 's7', category: 'shopping', korean: '이거 입어봐도 되나요?', chinese: '可以試穿嗎？', pronunciation: '커이스촨마?' },
    { id: 's8', category: 'shopping', korean: '다른 색 있나요?', chinese: '有其他顏色嗎？', pronunciation: '요우치타옌써마?' },
    { id: 's9', category: 'shopping', korean: '너무 비싸요', chinese: '太貴了', pronunciation: '타이구이러' },
    { id: 's10', category: 'shopping', korean: '생각해볼게요', chinese: '我再想想', pronunciation: '워짜이샹샹' },
    { id: 's11', category: 'shopping', korean: '이거 살게요', chinese: '我要買這個', pronunciation: '워야오마이쩌거' },
    { id: 's12', category: 'shopping', korean: '포장해주세요', chinese: '請幫我包裝', pronunciation: '칭방워바오좡' },

    // 교통/길찾기
    { id: 't1', category: 'transport', korean: '여기 어떻게 가나요?', chinese: '這裡怎麼去？', pronunciation: '쩌리쩐머취?', priority: true },
    { id: 't2', category: 'transport', korean: '택시 불러주세요', chinese: '請幫我叫計程車', pronunciation: '칭방워지아오지청처' },
    { id: 't3', category: 'transport', korean: '지하철역이 어디예요?', chinese: '捷運站在哪裡？', pronunciation: '지에윈잔짜이날리?', priority: true },
    { id: 't4', category: 'transport', korean: '얼마나 걸리나요?', chinese: '要多久？', pronunciation: '야오뚜어지우?' },
    { id: 't5', category: 'transport', korean: '여기서 내려주세요', chinese: '在這裡停', pronunciation: '짜이쩌리팅', priority: true },
    { id: 't6', category: 'transport', korean: '거스름돈이 틀려요', chinese: '找錯錢了', pronunciation: '자오추어치엔러' },
    { id: 't7', category: 'transport', korean: '버스 정류장이 어디예요?', chinese: '公車站在哪裡？', pronunciation: '공처잔짜이날리?' },
    { id: 't8', category: 'transport', korean: '이 버스가 맞나요?', chinese: '是這班車嗎？', pronunciation: '스쩌반처마?' },
    { id: 't9', category: 'transport', korean: '표 어디서 사나요?', chinese: '在哪裡買票？', pronunciation: '짜이날리마이피아오?' },
    { id: 't10', category: 'transport', korean: '공항까지 가주세요', chinese: '請到機場', pronunciation: '칭따오지창' },
    { id: 't11', category: 'transport', korean: '미터기 켜주세요', chinese: '請跳錶', pronunciation: '칭티아오비아오' },
    { id: 't12', category: 'transport', korean: '길이 막혀요', chinese: '塞車了', pronunciation: '싸이처러' },

    // 숙소
    { id: 'h1', category: 'hotel', korean: '체크인 하고 싶어요', chinese: '我要辦理入住', pronunciation: '워야오반리루주', priority: true },
    { id: 'h2', category: 'hotel', korean: '체크아웃 하고 싶어요', chinese: '我要退房', pronunciation: '워야오투이팡', priority: true },
    { id: 'h3', category: 'hotel', korean: '방 열쇠 주세요', chinese: '請給我房間鑰匙', pronunciation: '칭게이워팡지엔야오스' },
    { id: 'h4', category: 'hotel', korean: 'Wi-Fi 비밀번호가 뭐예요?', chinese: 'Wi-Fi密碼是什麼？', pronunciation: '와이파이미마스션머?', priority: true },
    { id: 'h5', category: 'hotel', korean: '짐 맡아주세요', chinese: '請幫我保管行李', pronunciation: '칭방워바오관싱리' },
    { id: 'h6', category: 'hotel', korean: '조식 시간이 언제예요?', chinese: '早餐時間是幾點？', pronunciation: '자오찬스지엔스지디엔?' },
    { id: 'h7', category: 'hotel', korean: '방 청소해주세요', chinese: '請打掃房間', pronunciation: '칭따사오팡지엔' },
    { id: 'h8', category: 'hotel', korean: '수건 더 주세요', chinese: '請多給我毛巾', pronunciation: '칭뚜어게이워마오진' },
    { id: 'h9', category: 'hotel', korean: '에어컨이 안 돼요', chinese: '冷氣壞了', pronunciation: '렁치화이러' },
    { id: 'h10', category: 'hotel', korean: '방을 바꿔주세요', chinese: '請換房間', pronunciation: '칭환팡지엔' },
    { id: 'h11', category: 'hotel', korean: '예약 확인해주세요', chinese: '請確認訂房', pronunciation: '칭취에런딩팡' },

    // 긴급상황
    { id: 'e1', category: 'emergency', korean: '도와주세요!', chinese: '救命！', pronunciation: '지우밍!', priority: true },
    { id: 'e2', category: 'emergency', korean: '병원 어디예요?', chinese: '醫院在哪裡？', pronunciation: '이위안짜이날리?', priority: true },
    { id: 'e3', category: 'emergency', korean: '경찰서 어디예요?', chinese: '警察局在哪裡？', pronunciation: '징차쥐짜이날리?', priority: true },
    { id: 'e4', category: 'emergency', korean: '지갑을 잃어버렸어요', chinese: '我的錢包不見了', pronunciation: '워더치엔바오부지엔러' },
    { id: 'e5', category: 'emergency', korean: '아파요', chinese: '我不舒服', pronunciation: '워부슈푸', priority: true },
    { id: 'e6', category: 'emergency', korean: '약국 어디예요?', chinese: '藥局在哪裡？', pronunciation: '야오쥐짜이날리?' },
    { id: 'e7', category: 'emergency', korean: '구급차 불러주세요', chinese: '請叫救護車', pronunciation: '칭지아오지우후처' },
    { id: 'e8', category: 'emergency', korean: '한국 대사관 연락처 알려주세요', chinese: '請告訴我韓國大使館電話', pronunciation: '칭가오쑤워한궈따스관디엔화' },
    { id: 'e9', category: 'emergency', korean: '여권을 잃어버렸어요', chinese: '我的護照不見了', pronunciation: '워더후자오부지엔러' },
    { id: 'e10', category: 'emergency', korean: '도둑맞았어요', chinese: '我被偷了', pronunciation: '워베이터우러' },

    // 관광지
    { id: 'to1', category: 'tourist', korean: '입장료가 얼마예요?', chinese: '門票多少錢？', pronunciation: '먼피아오뚜어샤오치엔?', priority: true },
    { id: 'to2', category: 'tourist', korean: '사진 찍어주세요', chinese: '請幫我拍照', pronunciation: '칭방워파이자오', priority: true },
    { id: 'to3', category: 'tourist', korean: '화장실이 어디예요?', chinese: '廁所在哪裡？', pronunciation: '처쑤오짜이날리?', priority: true },
    { id: 'to4', category: 'tourist', korean: '몇 시에 닫나요?', chinese: '幾點關門？', pronunciation: '지디엔관먼?' },
    { id: 'to5', category: 'tourist', korean: '가이드 투어 있나요?', chinese: '有導覽嗎？', pronunciation: '요우따오란마?' },
    { id: 'to6', category: 'tourist', korean: '지도 주세요', chinese: '請給我地圖', pronunciation: '칭게이워디투' },
    { id: 'to7', category: 'tourist', korean: '여기서 사진 찍어도 되나요?', chinese: '可以拍照嗎？', pronunciation: '커이파이자오마?' },
    { id: 'to8', category: 'tourist', korean: '할인 있나요?', chinese: '有折扣嗎？', pronunciation: '요우저커우마?' },
    { id: 'to9', category: 'tourist', korean: '학생 할인 되나요?', chinese: '有學生優惠嗎？', pronunciation: '요우슈에성요우후이마?' },
    { id: 'to10', category: 'tourist', korean: '기념품 가게 어디예요?', chinese: '紀念品店在哪裡？', pronunciation: '지니엔핀디엔짜이날리?' },
    { id: 'to11', category: 'tourist', korean: '이거 유명한가요?', chinese: '這個有名嗎？', pronunciation: '쩌거요우밍마?' },
    { id: 'to12', category: 'tourist', korean: '추천 장소 있나요?', chinese: '有推薦的地方嗎？', pronunciation: '요우투이지엔더디팡마?' },

    // 숫자
    { id: 'n1', category: 'numbers', korean: '0', chinese: '零', pronunciation: '링' },
    { id: 'n2', category: 'numbers', korean: '1', chinese: '一', pronunciation: '이' },
    { id: 'n3', category: 'numbers', korean: '2', chinese: '二', pronunciation: '얼' },
    { id: 'n4', category: 'numbers', korean: '3', chinese: '三', pronunciation: '산' },
    { id: 'n5', category: 'numbers', korean: '4', chinese: '四', pronunciation: '쓰' },
    { id: 'n6', category: 'numbers', korean: '5', chinese: '五', pronunciation: '우' },
    { id: 'n7', category: 'numbers', korean: '6', chinese: '六', pronunciation: '리우' },
    { id: 'n8', category: 'numbers', korean: '7', chinese: '七', pronunciation: '치' },
    { id: 'n9', category: 'numbers', korean: '8', chinese: '八', pronunciation: '바' },
    { id: 'n10', category: 'numbers', korean: '9', chinese: '九', pronunciation: '지우' },
    { id: 'n11', category: 'numbers', korean: '10', chinese: '十', pronunciation: '스' },
    { id: 'n12', category: 'numbers', korean: '100', chinese: '一百', pronunciation: '이바이' },
    { id: 'n13', category: 'numbers', korean: '1000', chinese: '一千', pronunciation: '이치엔' },
    { id: 'n14', category: 'numbers', korean: '10000', chinese: '一萬', pronunciation: '이완' },
];

export const categoryNames = {
    greeting: '기본 인사',
    restaurant: '식당/음식',
    shopping: '쇼핑',
    transport: '교통',
    hotel: '숙소',
    emergency: '긴급상황',
    tourist: '관광지',
    numbers: '숫자',
};

export const categoryIcons = {
    greeting: '👋',
    restaurant: '🍜',
    shopping: '🛒',
    transport: '🚕',
    hotel: '🏨',
    emergency: '🚨',
    tourist: '🎯',
    numbers: '🔢',
};
