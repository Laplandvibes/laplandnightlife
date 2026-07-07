import type { CityOverlay } from './cityI18n';

const overlay: Record<string, CityOverlay> = {
  oulu: {
    region: '北博滕区',
    blurb: '2026 年欧洲文化之都——也是北方唯一一座全年都有真正夜店场景的城市。',
    pageTagline: '2026 年欧洲文化之都。',
    venues: {
      '45 Special': { type: '夜店', note: '学生最爱的夜店。周三至周六营业，开到很晚。' },
      'Never Grow Old': { type: '现场音乐 + 夜店', note: '独立 / 另类风格的演出排期。是这条街上最小的一家，却拥有最忠实的人群。' },
      'St Michael': { type: '现场 + 夜店', note: '这条街上最大的场地。巡演 DJ 和致敬之夜。' },
    },
    quickFacts: {
      'Population': { label: '人口', value: '21 万' },
      'Closest airport': { label: '最近机场', value: 'OUL · 15 分钟' },
      'Last call': { label: '最后点单', value: '03:30' },
      'Best season': { label: '最佳季节', value: '全年 · 2026 欧洲文化之都' },
    },
  },
  rovaniemi: {
    region: '拉普兰',
    blurb: '北极之都——在游客云集的周末和只属于本地人的工作日之间一分为二。',
    pageTagline: '北极之都。',
    venues: {
      'Roy Club': { type: '夜店', note: '1985 年开业至今。三个厅——全城最大的舞池。' },
      'Bull Bar': { type: '体育酒吧', note: '吵闹、人挤人、转播英超的露台，还有深夜餐食。' },
      'Kauppayhtiö': { type: '咖啡馆 + 酒吧', note: '复古客厅风；鸡尾酒供应到深夜。' },
    },
    quickFacts: {
      'Population': { label: '人口', value: '6.4 万' },
      'Closest airport': { label: '最近机场', value: 'RVN · 10 分钟' },
      'Last call': { label: '最后点单', value: '03:00' },
      'Best season': { label: '最佳季节', value: '9 月–3 月（极光）· 12 月（圣诞老人）' },
    },
  },
  levi: {
    region: 'Kittilä 市镇',
    blurb: 'Hullu Poro Areena：1 700 人容量、10 个吧台、2 层楼——拉普兰最大的夜店。',
    pageTagline: '芬兰最盛大的滑雪场派对。',
    venues: {
      'Hullu Poro Areena': { type: '超大夜店', note: '1 700 人容量、10 个吧台、2 层楼。周三至周六兼作演唱会场地。' },
      'Ihku': { type: '滑雪后酒吧', note: '雪道脚下的木屋。可以穿着雪靴上舞池。' },
    },
    quickFacts: {
      'Beds in resort': { label: '度假区床位', value: '2.4 万' },
      'Closest airport': { label: '最近机场', value: 'KTT · 18 公里' },
      'Last call': { label: '最后点单', value: '03:30' },
      'Best season': { label: '最佳季节', value: '11 月–4 月（雪季 + Hullu Poro）' },
    },
  },
  saariselka: {
    region: 'Inari 市镇',
    blurb: '玻璃冰屋、Kakslauttanen 的 Igloo Bar，外加一家真正的酒馆——Local Pub Panimo。',
    pageTagline: '荒野高端——玻璃冰屋酒吧之村。',
    intro: 'Saariselkä 不是一个去蹦迪的地方。它是一个玻璃冰屋的目的地——而这正是重点所在。Kakslauttanen Arctic Resort 拥有全世界被拍得最多的酒吧（一间玻璃冰屋，天花板就是极光）。村子本身只有一条主街、两家值得一吃的餐厅，以及 Local Pub Panimo——一家微型酿酒坊，拥有拉普兰最靠谱的精酿生啤龙头清单。天黑之后，热闹都在各家度假村里，而不在村子里。',
    venues: {
      'Kakslauttanen Igloo Bar': { type: '玻璃顶酒吧', note: '世界闻名的打卡照。非住客凭预约也可进入。' },
      'Local Pub Panimo': { type: '微型酿酒坊酒馆', note: '自家酿造，村里唯一一家像样的酒馆。' },
      'Hotel Riekonlinna Bar': { type: '酒店酒吧', note: '大堂里的大壁炉，周五晚上有本地 DJ。' },
    },
    knowList: [
      '没有独立夜店——夜生活都依托于酒店。',
      '如果你不住在 Kakslauttanen，进 Igloo Bar 需要预约。',
      '从机场（Ivalo）开车 25 分钟；要喝酒就预订接送。',
      '极光预报 App 必不可少——若极光活跃，工作人员会在 02:00 叫醒客人。',
    ],
    quickFacts: {
      'Beds in village': { label: '村内床位', value: '7 500' },
      'Closest airport': { label: '最近机场', value: 'IVL · 25 分钟' },
      'Last call': { label: '最后点单', value: '01:30（酒店）' },
      'Best season': { label: '最佳季节', value: '9 月–3 月（极光）' },
    },
  },
  inari: {
    region: 'Inari 市镇',
    blurb: '萨米文化之都——Sajos、Siida、Inari 湖与 Pielpajärvi 荒野教堂。',
    pageTagline: '萨米文化之都。',
    intro: 'Inari 是萨米议会的文化所在地（Sajos），也是 Siida 的家——这座博物馆会把你对萨普米（Sápmi）一无所知的一切讲清楚。这里的“夜生活”是文化性的：1 月的 Skábmagovat 原住民电影节、8 月的 Ijahis Idja 萨米音乐节，再加上几家主要供应正餐的酒吧。别为蹦迪而来。为冰冷的湖水、约伊克（joik）演唱会，以及 12 月里 14:00 就黑透的天空而来。',
    venues: {
      'Hotel Inari Bar': { type: '酒店酒吧', note: '湖景餐厅 + 酒吧，营业至 01:00。' },
      'Sajos Café': { type: '日间', note: '萨米议会咖啡馆——咖啡 + 文化活动。' },
      'Tradiska': { type: '餐厅 + 酒吧', note: '萨米料理，小酒吧，氛围私密。' },
    },
    knowList: [
      '没有夜店。两家带酒吧的酒店，三家供应酒类的餐厅。',
      'Skábmagovat 原住民电影节在 1 月下旬举办——住宿会订满。',
      'Ijahis Idja 音乐节在 8 月中旬：是 Inari 最接近“场景”的东西。',
      '在你去哪儿喝酒之前，Sajos 和 Siida 都是必看的文化点。',
    ],
    quickFacts: {
      'Population': { label: '人口', value: '6 800' },
      'Closest airport': { label: '最近机场', value: 'IVL · 40 分钟' },
      'Last call': { label: '最后点单', value: '01:00' },
      'Best season': { label: '最佳季节', value: '8 月底（Ijahis Idja）· 1 月（Skábmagovat）' },
    },
  },
  kemi: {
    region: '海拉普兰',
    blurb: '雪堡（SnowCastle）、Sampo 破冰船，以及 Hotel Merihovi 层层叠叠的餐厅综合体。',
    pageTagline: '雪堡、破冰船、海拉普兰。',
    intro: 'Kemi 是赫尔辛基铁路与拉普兰之间的门户——一座只有一招的城镇：雪堡（SnowCastle），自 1996 年起年年重建，内有礼拜堂、酒店和一间冰墙环绕的酒吧。Sampo 破冰船从 12 月起每晚出航，航程本身也兼作酒吧场地。陆地上的夜生活规模很小：Hotel Merihovi 经营着一个多层综合体（大堂吧、体育露台、餐厅），差不多就这些了。一座工业港口小城，冬天却打出了远超身量的拳。',
    venues: {
      'SnowCastle Ice Bar': { type: '冰吧', note: '1 月至 4 月营业。用冰杯喝伏特加，墙壁维持在 –5°C。' },
      'Hotel Merihovi': { type: '酒店综合体', note: '大堂吧 + 体育露台 + 餐厅。' },
      'Sampo Icebreaker': { type: '船上酒吧', note: '旺季 12:00 与 18:00 出航；酒吧全程营业。' },
    },
    knowList: [
      '从 1 月到 4 月，热闹大多集中在雪堡里。',
      '旺季 Sampo 破冰船需提前 2–3 天预订。',
      '镇上最后点单 02:00；雪堡酒吧关得更早（通常 24:00）。',
      '从赫尔辛基乘火车：直达 8 小时。',
    ],
    quickFacts: {
      'Population': { label: '人口', value: '2.08 万' },
      'Closest airport': { label: '最近机场', value: 'KEM · 5 分钟 · 或从赫尔辛基乘火车' },
      'Last call': { label: '最后点单', value: '02:00' },
      'Best season': { label: '最佳季节', value: '1 月–4 月（雪堡 + 破冰船）' },
    },
  },
  yllas: {
    region: 'Kolari / Muonio',
    blurb: '芬兰第二大滑雪区。',
    pageTagline: '芬兰第二大滑雪区。',
    venues: {
      'Sport Resort Ylläs': { type: '酒店酒吧', note: 'Äkäslompolo 最热闹的滑雪后酒吧。' },
    },
    quickFacts: {
      'Beds in resort': { label: '度假区床位', value: '2.3 万' },
      'Closest airport': { label: '最近机场', value: 'KTT · 50 分钟' },
      'Last call': { label: '最后点单', value: '02:00' },
      'Best season': { label: '最佳季节', value: '11 月–4 月（滑雪）· 3 月（日照更长）' },
    },
  },
  ruka: {
    region: '芬兰东北部',
    blurb: '按滑雪人次计算，芬兰第二大滑雪度假区。',
    pageTagline: '熊出没之地的滑雪场。',
    venues: {
      'Zone Bar': { type: '滑雪后酒吧', note: '位于雪道脚下——FIS 世界杯开幕派对的大本营。' },
    },
    quickFacts: {
      'Beds in resort': { label: '度假区床位', value: '1.5 万' },
      'Closest airport': { label: '最近机场', value: 'KAO · 30 分钟' },
      'Last call': { label: '最后点单', value: '03:00（旺季）' },
      'Best season': { label: '最佳季节', value: '11 月下旬（FIS 开幕）· 12 月–4 月' },
    },
  },
  'pyha-luosto': {
    region: 'Pelkosenniemi / Sodankylä',
    blurb: '紫水晶、群峰，以及拉普兰最安静的滑雪。',
    pageTagline: '紫水晶之峰。',
    intro: '两座相距 35 公里的小山峰，共享一座国家公园。Pyhä 的滑雪区更大；Luosto 则有一座可以在午夜、极光之下参观的紫水晶矿。两边都没有夜店。两边都有值得守着壁炉过夜的酒店酒吧——Hotel Pyhätunturi 提供餐厅级的餐饮，Luosto 的 Hotel Aurora 则有面朝极光窗的酒吧。这是拉普兰最安静的“滑雪目的地”，而且引以为傲。',
    venues: {
      'Hotel Pyhätunturi Bar': { type: '酒店酒吧', note: '餐厅 + 酒吧、壁炉，紧邻雪道。' },
      'Hotel Aurora Luosto': { type: '极光窗酒吧', note: '面朝北方的玻璃墙酒吧——极光活跃时提供叫醒服务。' },
      'Pyhän Asteli': { type: '餐厅 + 酒吧', note: '本地人最爱的餐厅；Pyhä 村里唯一供应深夜餐饮的地方。' },
    },
    knowList: [
      'Pyhä-Luosto 全境都没有夜店。',
      '紫水晶矿提供极光下的夜间参观——请提前预订。',
      'Pyhä-Luosto 国家公园才是那份静默的卖点。',
      '两个村子的最后点单都在 01:00 左右。',
    ],
    quickFacts: {
      'Beds in two villages': { label: '两村床位', value: '5 000' },
      'Closest airport': { label: '最近机场', value: 'RVN · 1 小时 30 分 · 或 KTT · 2 小时 30 分' },
      'Last call': { label: '最后点单', value: '01:00' },
      'Best season': { label: '最佳季节', value: '12 月–4 月（滑雪）· 9 月–3 月（极光）' },
    },
  },
  sodankyla: {
    region: '中拉普兰',
    blurb: '午夜阳光电影节——他们在大白天的 03:00 放映电影。',
    pageTagline: '午夜阳光电影节。',
    venues: {
    },
    quickFacts: {
      'Population': { label: '人口', value: '8 600' },
      'Closest airport': { label: '最近机场', value: 'RVN · 1 小时 45 分' },
      'Last call': { label: '最后点单', value: '01:00 / 电影节期间 04:00' },
      'Best season': { label: '最佳季节', value: '6 月中旬（午夜阳光电影节）' },
    },
  },
  kittila: {
    region: 'Kittilä 市镇',
    blurb: '本地人真正生活的地方（Levi 多半是游客）。',
    pageTagline: 'Levi 的本地人真正生活的地方。',
    venues: {
    },
    quickFacts: {
      'Population': { label: '人口', value: '6 500' },
      'Closest airport': { label: '最近机场', value: 'KTT · 5 分钟' },
      'Last call': { label: '最后点单', value: '02:00' },
      'Best season': { label: '最佳季节', value: '全年（Levi 员工场景）' },
    },
  },
  ivalo: {
    region: 'Inari 市镇',
    blurb: 'Hotel Ivalo 的 Club Nord + Hotel Kultahippu 酒馆。',
    pageTagline: '最北的、带夜店的机场。',
    intro: 'Ivalo 是芬兰最北的机场，也是通往 Inari、Saariselkä 和萨米故土的门户。小镇本身只有 4 000 人。Hotel Ivalo 经营着 Club Nord——芬兰大陆最北的夜店，周五、周六营业。Hotel Kultahippu 拥有村里唯一一家像样的酒馆。除此之外，就是酒店酒吧和一家卖啤酒的加油站小卖部了。',
    venues: {
      'Club Nord (Hotel Ivalo)': { type: '夜店', note: '周五至周六营业。芬兰大陆最北的夜店。' },
      'Hotel Kultahippu Pub': { type: '酒馆', note: '每日营业。本地人下班后的去处。' },
      'Hotel Ivalo Lobby Bar': { type: '酒店酒吧', note: '更安静，与餐厅相连。' },
    },
    knowList: [
      '芬兰大陆最北的机场。',
      'Saariselkä 在 25 分钟车程之外——许多 Saariselkä 的访客会开车进城去 Club Nord。',
      '工作日最后点单 02:00，周末 03:00。',
      '没有出租车候客点——请通过酒店前台预订。',
    ],
    quickFacts: {
      'Population': { label: '人口', value: '4 000' },
      'Closest airport': { label: '最近机场', value: 'IVL · 5 分钟' },
      'Last call': { label: '最后点单', value: '02:00 / 周末 03:00' },
      'Best season': { label: '最佳季节', value: '9 月–3 月（极光）· 8 月（音乐节）' },
    },
  },
  muonio: {
    region: '西拉普兰',
    blurb: '没有夜生活。Pallas-Yllästunturi 国家公园才是卖点。',
    pageTagline: '国家公园门户。',
    venues: {
      'Harriniva Wilderness Hotel': { type: '酒店酒吧', note: '桑拿 + 酒吧，主要是雪橇团的客人。' },
    },
    quickFacts: {
      'Population': { label: '人口', value: '2 300' },
      'Closest airport': { label: '最近机场', value: 'KTT · 1 小时 15 分' },
      'Last call': { label: '最后点单', value: '23:00 / 周末 01:00' },
      'Best season': { label: '最佳季节', value: '9 月–3 月（极光 · 光污染极低）' },
    },
  },
  salla: {
    region: '东拉普兰',
    blurb: '位于天涯海角。芬兰最安静的滑雪度假区。',
    pageTagline: '位于天涯海角。',
    venues: {
      'Hotel Revontuli Bar': { type: '酒店酒吧', note: '唯一一家深夜营业的场所。餐厅 + 酒吧。' },
      'Salla Wilderness Park': { type: '日间场所', note: '为公园访客提供午餐 + 日间咖啡馆。' },
    },
    quickFacts: {
      'Population': { label: '人口', value: '3 300' },
      'Closest airport': { label: '最近机场', value: 'KAO · 1 小时 30 分' },
      'Last call': { label: '最后点单', value: '23:00 / 旺季 01:00' },
      'Best season': { label: '最佳季节', value: '12 月–4 月（滑雪 · 申办 2032 奥运）' },
    },
  },
};

export default overlay;
