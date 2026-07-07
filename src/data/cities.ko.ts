import type { CityOverlay } from './cityI18n';

const overlay: Record<string, CityOverlay> = {
  oulu: {
    region: '북오스트로보트니아',
    blurb: '2026 유럽 문화 수도 — 그리고 북부 핀란드에서 유일하게 사계절 내내 돌아가는 진짜 클럽 신.',
    pageTagline: '2026 유럽 문화 수도.',
    venues: {
      '45 Special': { type: '나이트클럽', note: '학생들이 가장 사랑하는 클럽. 수–토 영업, 늦게까지.' },
      'Never Grow Old': { type: '라이브 음악 + 클럽', note: '인디 / 얼터너티브 라인업. 거리에서 가장 작지만 가장 충성스러운 손님층.' },
      'St Michael': { type: '라이브 + 클럽', note: '거리에서 가장 큰 공간. 투어 DJ와 트리뷰트 나이트.' },
    },
    quickFacts: {
      'Population': { label: '인구', value: '210,000' },
      'Closest airport': { label: '가장 가까운 공항', value: 'OUL · 15분' },
      'Last call': { label: '라스트콜', value: '03:30' },
      'Best season': { label: '최적 시즌', value: '사계절 · 2026 ECoC' },
    },
  },
  rovaniemi: {
    region: '라플란드',
    blurb: '북극의 수도 — 관광객의 주말과 현지인만의 평일로 나뉜다.',
    pageTagline: '북극의 수도.',
    venues: {
      'Roy Club': { type: '나이트클럽', note: '1985년 개업. 세 개의 룸 — 도시에서 가장 큰 댄스플로어.' },
      'Bull Bar': { type: '스포츠 바', note: '시끄럽고 꽉 차고, 프리미어리그 테라스에 야식까지.' },
      'Kauppayhtiö': { type: '카페 + 바', note: '빈티지 거실 같은 분위기, 칵테일은 늦게까지.' },
    },
    quickFacts: {
      'Population': { label: '인구', value: '64,000' },
      'Closest airport': { label: '가장 가까운 공항', value: 'RVN · 10분' },
      'Last call': { label: '라스트콜', value: '03:00' },
      'Best season': { label: '최적 시즌', value: '9월~3월 (오로라) · 12월 (산타)' },
    },
  },
  levi: {
    region: 'Kittilä 지자체',
    blurb: 'Hullu Poro Areena: 수용 인원 1,700명, 바 10개, 2층 — 라플란드 최대의 나이트클럽.',
    pageTagline: '핀란드 최대의 스키 리조트 파티.',
    venues: {
      'Hullu Poro Areena': { type: '메가 나이트클럽', note: '수용 1,700명, 바 10개, 2층. 수–토 콘서트장으로도 운영.' },
      'Ihku': { type: '애프터스키', note: '슬로프 베이스의 통나무집. 댄스플로어에서 스키 부츠 환영.' },
    },
    quickFacts: {
      'Beds in resort': { label: '리조트 객실 침대 수', value: '24,000' },
      'Closest airport': { label: '가장 가까운 공항', value: 'KTT · 18km' },
      'Last call': { label: '라스트콜', value: '03:30' },
      'Best season': { label: '최적 시즌', value: '11월~4월 (눈 + Hullu Poro)' },
    },
  },
  saariselka: {
    region: 'Inari 지자체',
    blurb: '글래스 이글루, Kakslauttanen의 Igloo Bar, 그리고 진짜 펍 하나 — Local Pub Panimo.',
    pageTagline: '와일더니스 프리미엄 — 이글루 바 마을.',
    intro: 'Saariselkä는 클럽을 위한 곳이 아니다. 글래스 이글루를 위한 곳이다 — 그게 핵심이다. Kakslauttanen Arctic Resort에는 세계에서 가장 많이 사진에 담긴 바가 있다 (천장이 곧 오로라인 글래스 이글루). 마을 자체는 메인 거리 하나, 식사할 만한 식당 둘, 그리고 라플란드에서 가장 믿을 만한 크래프트 탭 리스트를 갖춘 마이크로브루어리 Local Pub Panimo가 전부다. 해가 진 뒤의 무대는 마을이 아니라 리조트에 있다.',
    venues: {
      'Kakslauttanen Igloo Bar': { type: '글래스 지붕 바', note: '세계적으로 유명한 인증샷. 예약하면 투숙객이 아니어도 입장 가능.' },
      'Local Pub Panimo': { type: '마이크로브루어리 펍', note: '자체 양조 맥주, 마을 유일의 제대로 된 펍.' },
      'Hotel Riekonlinna Bar': { type: '호텔 바', note: '커다란 로비 벽난로, 금요일 밤엔 현지 DJ.' },
    },
    knowList: [
      '독립 클럽 없음 — 나이트라이프는 호텔 중심이다.',
      'Kakslauttanen 투숙객이 아니라면 Igloo Bar는 예약 필수.',
      '공항(Ivalo)에서 도로로 25분 — 마실 거라면 차량 픽업을 예약할 것.',
      '오로라 예보 앱은 필수 — 오로라가 뜨면 직원이 02:00에라도 손님을 깨운다.',
    ],
    quickFacts: {
      'Beds in village': { label: '마을 객실 침대 수', value: '7,500' },
      'Closest airport': { label: '가장 가까운 공항', value: 'IVL · 25분' },
      'Last call': { label: '라스트콜', value: '01:30 (호텔)' },
      'Best season': { label: '최적 시즌', value: '9월~3월 (오로라)' },
    },
  },
  inari: {
    region: 'Inari 지자체',
    blurb: '사미 문화의 수도 — Sajos, Siida, Inari 호수, 그리고 Pielpajärvi 황야의 교회.',
    pageTagline: '사미 문화의 수도.',
    intro: 'Inari는 사미 의회(Sajos)가 자리한 문화의 중심이자, 당신이 사프미(Sápmi)에 대해 몰랐던 모든 것을 설명해 주는 박물관 Siida의 고향이다. 이곳의 "나이트라이프"는 문화적이다: 1월의 원주민 영화제 Skábmagovat, 8월의 사미 음악 축제 Ijahis Idja, 그리고 대부분 저녁 식사를 내는 바 몇 곳. 클럽을 기대하고 오지 말 것. 차가운 호숫물, 요이크(joik) 공연, 그리고 12월이면 14:00에 새카매지는 하늘을 위해 올 것.',
    venues: {
      'Hotel Inari Bar': { type: '호텔 바', note: '호수 전망의 레스토랑 + 바, 01:00까지 영업.' },
      'Sajos Café': { type: '주간', note: '사미 의회 카페 — 커피 + 문화 행사.' },
      'Tradiska': { type: '레스토랑 + 바', note: '사미 요리, 작은 바, 아늑한 분위기.' },
    },
    knowList: [
      '클럽 없음. 바를 갖춘 호텔 두 곳, 주류를 파는 식당 세 곳.',
      '원주민 영화제 Skábmagovat는 1월 말 — 숙소가 동난다.',
      'Ijahis Idja 축제(8월 중순): Inari에 "신"이라 부를 만한 게 있다면 이게 가장 가깝다.',
      '어디서든 마시기 전에 Sajos와 Siida는 꼭 들러야 할 문화 방문지.',
    ],
    quickFacts: {
      'Population': { label: '인구', value: '6,800' },
      'Closest airport': { label: '가장 가까운 공항', value: 'IVL · 40분' },
      'Last call': { label: '라스트콜', value: '01:00' },
      'Best season': { label: '최적 시즌', value: '8월 말 (Ijahis Idja) · 1월 (Skábmagovat)' },
    },
  },
  kemi: {
    region: '바다 라플란드',
    blurb: 'SnowCastle, Sampo 쇄빙선, 그리고 Hotel Merihovi의 층층이 쌓인 레스토랑 복합관.',
    pageTagline: 'SnowCastle, 쇄빙선, 바다 라플란드.',
    intro: 'Kemi는 헬싱키 철도와 라플란드를 잇는 관문이자, 단 하나의 카드를 쥔 도시다: 1996년 이래 매년 겨울 다시 짓는 SnowCastle. 예배당, 호텔, 그리고 얼음 벽으로 둘러싸인 바를 갖췄다. 12월부터 운항하는 Sampo 쇄빙선은 밤마다 투어를 도는데, 그 자체가 바 역할도 한다. 본토 나이트라이프는 작다: Hotel Merihovi가 층층의 복합관(로비 바, 스포츠 테라스, 레스토랑)을 운영하고, 사실상 그게 전부다. 겨울이면 체급 이상으로 한 방 먹이는 산업 항구 도시.',
    venues: {
      'SnowCastle Ice Bar': { type: '아이스 바', note: '1월~4월 영업. 얼음 잔에 보드카 샷, 벽 온도는 –5°C.' },
      'Hotel Merihovi': { type: '호텔 복합관', note: '로비 바 + 스포츠 테라스 + 레스토랑.' },
      'Sampo Icebreaker': { type: '선상 바', note: '시즌엔 12:00 + 18:00 운항, 항해 내내 바가 돌아간다.' },
    },
    knowList: [
      '대부분의 무대는 1월부터 4월까지 SnowCastle 안에 있다.',
      'Sampo 쇄빙선은 성수기엔 2~3일 전 예약이 필요하다.',
      '시내 라스트콜은 02:00, SnowCastle 바는 더 일찍 닫는다 (보통 24:00).',
      '헬싱키에서 기차로 직행 8시간.',
    ],
    quickFacts: {
      'Population': { label: '인구', value: '20,800' },
      'Closest airport': { label: '가장 가까운 공항', value: 'KEM · 5분 · 또는 헬싱키발 철도' },
      'Last call': { label: '라스트콜', value: '02:00' },
      'Best season': { label: '최적 시즌', value: '1월~4월 (SnowCastle + 쇄빙선)' },
    },
  },
  yllas: {
    region: 'Kolari / Muonio',
    blurb: '핀란드에서 두 번째로 큰 스키 구역.',
    pageTagline: '핀란드에서 두 번째로 큰 스키 구역.',
    venues: {
      'Sport Resort Ylläs': { type: '호텔 바', note: 'Äkäslompolo에서 가장 붐비는 애프터스키 바.' },
    },
    quickFacts: {
      'Beds in resort': { label: '리조트 객실 침대 수', value: '23,000' },
      'Closest airport': { label: '가장 가까운 공항', value: 'KTT · 50분' },
      'Last call': { label: '라스트콜', value: '02:00' },
      'Best season': { label: '최적 시즌', value: '11월~4월 (스키) · 3월 (길어진 낮)' },
    },
  },
  ruka: {
    region: '핀란드 북동부',
    blurb: '스키어 이용일 수 기준 핀란드 2위 스키 리조트.',
    pageTagline: '곰의 땅, 스키 리조트.',
    venues: {
      'Zone Bar': { type: '애프터스키', note: '슬로프 베이스 — FIS 월드컵 개막 파티의 본거지.' },
    },
    quickFacts: {
      'Beds in resort': { label: '리조트 객실 침대 수', value: '15,000' },
      'Closest airport': { label: '가장 가까운 공항', value: 'KAO · 30분' },
      'Last call': { label: '라스트콜', value: '03:00 (시즌 중)' },
      'Best season': { label: '최적 시즌', value: '11월 말 (FIS 개막) · 12월~4월' },
    },
  },
  'pyha-luosto': {
    region: 'Pelkosenniemi / Sodankylä',
    blurb: '자수정, 펠(fell), 그리고 라플란드에서 가장 조용한 스키.',
    pageTagline: '자수정의 펠.',
    intro: '35km 떨어진 두 개의 작은 펠이 하나의 국립공원을 공유한다. Pyhä는 스키 구역이 더 크고, Luosto에는 오로라 아래 한밤중에 방문할 수 있는 자수정 광산이 있다. 둘 다 클럽은 없다. 둘 다 벽난로 앞 저녁을 보낼 만한 호텔 바를 갖췄다 — 레스토랑급 식사는 Hotel Pyhätunturi, 오로라 창 바는 Luosto의 Hotel Aurora. 라플란드에서 가장 조용한 "스키 목적지"이며, 그 점을 자랑스러워한다.',
    venues: {
      'Hotel Pyhätunturi Bar': { type: '호텔 바', note: '레스토랑 + 바, 벽난로, 슬로프 옆.' },
      'Hotel Aurora Luosto': { type: '오로라 창 바', note: '북쪽을 향한 유리벽 바 — 오로라가 뜨면 깨워 주는 서비스.' },
      'Pyhän Asteli': { type: '레스토랑 + 바', note: '현지인이 사랑하는 레스토랑 — Pyhä 마을의 유일한 늦은 저녁 식사.' },
    },
    knowList: [
      'Pyhä-Luosto 어디에도 나이트클럽은 없다.',
      '자수정 광산은 오로라 아래 야간 투어를 제공한다 — 사전 예약할 것.',
      'Pyhä-Luosto 국립공원이 조용한 매력의 원천이다.',
      '양쪽 마을 모두 라스트콜은 01:00 무렵.',
    ],
    quickFacts: {
      'Beds in two villages': { label: '두 마을 객실 침대 수', value: '5,000' },
      'Closest airport': { label: '가장 가까운 공항', value: 'RVN · 1시간 30분 · 또는 KTT · 2시간 30분' },
      'Last call': { label: '라스트콜', value: '01:00' },
      'Best season': { label: '최적 시즌', value: '12월~4월 (스키) · 9월~3월 (오로라)' },
    },
  },
  sodankyla: {
    region: '라플란드 중부',
    blurb: '미드나이트 선 영화제 — 환한 대낮에 03:00 상영을 한다.',
    pageTagline: '미드나이트 선 영화제.',
    venues: {
    },
    quickFacts: {
      'Population': { label: '인구', value: '8,600' },
      'Closest airport': { label: '가장 가까운 공항', value: 'RVN · 1시간 45분' },
      'Last call': { label: '라스트콜', value: '01:00 / 축제 중 04:00' },
      'Best season': { label: '최적 시즌', value: '6월 중순 (미드나이트 선 영화제)' },
    },
  },
  kittila: {
    region: 'Kittilä 지자체',
    blurb: '현지인이 실제로 사는 곳 (Levi는 거의 관광객 차지).',
    pageTagline: 'Levi 현지인이 실제로 사는 곳.',
    venues: {
    },
    quickFacts: {
      'Population': { label: '인구', value: '6,500' },
      'Closest airport': { label: '가장 가까운 공항', value: 'KTT · 5분' },
      'Last call': { label: '라스트콜', value: '02:00' },
      'Best season': { label: '최적 시즌', value: '사계절 (Levi 직원 신)' },
    },
  },
  ivalo: {
    region: 'Inari 지자체',
    blurb: 'Hotel Ivalo의 Club Nord + Hotel Kultahippu 펍.',
    pageTagline: '클럽이 있는 최북단 공항.',
    intro: 'Ivalo는 핀란드 최북단 공항이자 Inari, Saariselkä, 사미 본향으로 가는 관문이다. 마을 자체는 인구 4,000명. Hotel Ivalo가 Club Nord를 운영하는데 — 핀란드 본토 최북단 클럽으로, 금·토에 문을 연다. Hotel Kultahippu에는 마을 유일의 제대로 된 펍이 있다. 그 외엔 호텔 바들과 맥주를 파는 주유소 키오스크 하나가 전부다.',
    venues: {
      'Club Nord (Hotel Ivalo)': { type: '나이트클럽', note: '금–토 영업. 핀란드 본토 최북단 클럽.' },
      'Hotel Kultahippu Pub': { type: '펍', note: '매일 영업. 현지인의 퇴근 후 장소.' },
      'Hotel Ivalo Lobby Bar': { type: '호텔 바', note: '더 조용하고, 레스토랑이 딸려 있다.' },
    },
    knowList: [
      '핀란드 본토 최북단 공항.',
      'Saariselkä가 25분 거리 — 많은 Saariselkä 방문객이 Club Nord를 위해 차로 넘어온다.',
      '라스트콜은 평일 02:00, 주말 03:00.',
      '택시 승강장 없음 — 호텔 프런트를 통해 예약할 것.',
    ],
    quickFacts: {
      'Population': { label: '인구', value: '4,000' },
      'Closest airport': { label: '가장 가까운 공항', value: 'IVL · 5분' },
      'Last call': { label: '라스트콜', value: '02:00 / 주말 03:00' },
      'Best season': { label: '최적 시즌', value: '9월~3월 (오로라) · 8월 (축제)' },
    },
  },
  muonio: {
    region: '라플란드 서부',
    blurb: '나이트라이프 없음. 매력은 Pallas-Yllästunturi 국립공원.',
    pageTagline: '국립공원의 관문.',
    venues: {
      'Harriniva Wilderness Hotel': { type: '호텔 바', note: '사우나 + 바, 대부분 사파리 손님.' },
    },
    quickFacts: {
      'Population': { label: '인구', value: '2,300' },
      'Closest airport': { label: '가장 가까운 공항', value: 'KTT · 1시간 15분' },
      'Last call': { label: '라스트콜', value: '23:00 / 주말 01:00' },
      'Best season': { label: '최적 시즌', value: '9월~3월 (오로라 · 낮은 빛 공해)' },
    },
  },
  salla: {
    region: '라플란드 동부',
    blurb: '한복판의 아무것도 없는 곳. 핀란드에서 가장 조용한 스키 리조트.',
    pageTagline: '한복판의 아무것도 없는 곳.',
    venues: {
      'Hotel Revontuli Bar': { type: '호텔 바', note: '유일한 늦은 저녁 매장. 레스토랑 + 바.' },
      'Salla Wilderness Park': { type: '주간 매장', note: '공원 방문객을 위한 점심 + 낮 시간 카페.' },
    },
    quickFacts: {
      'Population': { label: '인구', value: '3,300' },
      'Closest airport': { label: '가장 가까운 공항', value: 'KAO · 1시간 30분' },
      'Last call': { label: '라스트콜', value: '23:00 / 시즌 중 01:00' },
      'Best season': { label: '최적 시즌', value: '12월~4월 (스키 · 2032 올림픽 유치)' },
    },
  },
};

export default overlay;
