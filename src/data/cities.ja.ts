import type { CityOverlay } from './cityI18n';

const overlay: Record<string, CityOverlay> = {
  oulu: {
    region: '北ポフヤンマー',
    blurb: '欧州文化首都2026 — そして北部で唯一、一年を通して本物のクラブシーンが回り続ける街。',
    pageTagline: '欧州文化首都2026。',
    venues: {
      '45 Special': { type: 'ナイトクラブ', note: '学生に愛されるクラブ。水〜土、夜遅くまで営業。' },
      'Never Grow Old': { type: 'ライブ音楽＋クラブ', note: 'インディー／オルタナティブのブッキング。この通りで一番小さいが、最も熱心な常連が集まる。' },
      'St Michael': { type: 'ライブ＋クラブ', note: 'この通りで最大のフロア。ツアー中のDJやトリビュートナイトを開催。' },
    },
    quickFacts: {
      'Population': { label: '人口', value: '210 000' },
      'Closest airport': { label: '最寄り空港', value: 'OUL · 15分' },
      'Last call': { label: 'ラストオーダー', value: '03:30' },
      'Best season': { label: 'ベストシーズン', value: '通年 · 2026 ECoC' },
    },
  },
  rovaniemi: {
    region: 'ラップランド',
    blurb: '北極圏の首都 — 観光客の週末と、地元民だけの平日に二分される街。',
    pageTagline: '北極圏の首都。',
    venues: {
      'Roy Club': { type: 'ナイトクラブ', note: '1985年開業。3つのフロアを持つ、街最大のダンスフロア。' },
      'Bull Bar': { type: 'スポーツバー', note: '騒がしく、満員で、プレミアリーグのテラスと深夜の食事あり。' },
      'Kauppayhtiö': { type: 'カフェ＋バー', note: 'ヴィンテージなリビングルーム風の内装。カクテルは夜遅くまで。' },
    },
    quickFacts: {
      'Population': { label: '人口', value: '64 000' },
      'Closest airport': { label: '最寄り空港', value: 'RVN · 10分' },
      'Last call': { label: 'ラストオーダー', value: '03:00' },
      'Best season': { label: 'ベストシーズン', value: '9〜3月（オーロラ） · 12月（サンタ）' },
    },
  },
  levi: {
    region: 'Kittilä自治体',
    blurb: 'Hullu Poro Areena：収容1 700人、バー10軒、2フロア — ラップランド最大のナイトクラブ。',
    pageTagline: 'フィンランド最大のスキーリゾート・パーティー。',
    venues: {
      'Hullu Poro Areena': { type: 'メガナイトクラブ', note: '収容1 700人、バー10軒、2フロア。水〜土はコンサート会場に。' },
      'Ihku': { type: 'アプレスキー', note: 'ゲレンデ麓の木造小屋。スキーブーツのままダンスフロアへ。' },
    },
    quickFacts: {
      'Beds in resort': { label: 'リゾートの宿泊ベッド数', value: '24 000' },
      'Closest airport': { label: '最寄り空港', value: 'KTT · 18 km' },
      'Last call': { label: 'ラストオーダー', value: '03:30' },
      'Best season': { label: 'ベストシーズン', value: '11〜4月（雪＋Hullu Poro）' },
    },
  },
  saariselka: {
    region: 'Inari自治体',
    blurb: 'ガラスのイグルー、KakslauttanenのIgloo Bar、そして本物のパブが1軒 — Local Pub Panimo。',
    pageTagline: 'ウィルダネス・プレミアム — イグルーバーの村。',
    intro: 'Saariselkäはクラブの街ではない。ガラスのイグルーの地であり、それこそが本質だ。Kakslauttanen Arctic Resortには世界で最も写真に撮られるバーがある（天井がオーロラになるガラスのイグルー）。村そのものはメインストリートが一本、食べる価値のあるレストランが二軒、そしてLocal Pub Panimo — ラップランドで最も安定したクラフトタップを揃えたマイクロブルワリーだ。日が暮れてからの賑わいは村ではなくリゾートにある。',
    venues: {
      'Kakslauttanen Igloo Bar': { type: 'ガラス天井のバー', note: '世界的に有名な一枚。宿泊客でなくても予約すれば利用可。' },
      'Local Pub Panimo': { type: 'マイクロブルワリーのパブ', note: '自家醸造ビール。村で唯一のまともなパブ。' },
      'Hotel Riekonlinna Bar': { type: 'ホテルバー', note: 'ロビーに大きな暖炉。金曜の夜は地元DJが入る。' },
    },
    knowList: [
      '独立したクラブはない — ナイトライフはホテル中心。',
      'Kakslauttanenに泊まらない場合、Igloo Barは予約が必要。',
      '空港（Ivalo）からの道のりは25分 — 飲むなら送迎を予約しよう。',
      'オーロラ予報アプリは必携 — オーロラが出ればスタッフが02:00に客を起こしてくれる。',
    ],
    quickFacts: {
      'Beds in village': { label: '村の宿泊ベッド数', value: '7 500' },
      'Closest airport': { label: '最寄り空港', value: 'IVL · 25分' },
      'Last call': { label: 'ラストオーダー', value: '01:30（ホテル）' },
      'Best season': { label: 'ベストシーズン', value: '9〜3月（オーロラ）' },
    },
  },
  inari: {
    region: 'Inari自治体',
    blurb: 'サーミ文化の中心地 — Sajos、Siida、Inari湖、そしてPielpajärviの原野教会。',
    pageTagline: 'サーミ文化の首都。',
    intro: 'Inariはサーミ議会（Sajos）が置かれた文化の拠点であり、Sápmi（サーミの地）について知らなかったすべてを教えてくれる博物館Siidaのある町だ。ここの「ナイトライフ」は文化そのもの — 1月の先住民映画祭Skábmagovat、8月のサーミ音楽祭Ijahis Idja、そしてほとんどがディナーを出すだけの数軒のバー。クラブを目当てに来てはいけない。冷たい湖の水、ヨイクのコンサート、そして12月には14:00に真っ暗になる空を目当てに来よう。',
    venues: {
      'Hotel Inari Bar': { type: 'ホテルバー', note: '湖を望むレストラン＋バー。01:00まで営業。' },
      'Sajos Café': { type: '昼間向け', note: 'サーミ議会のカフェ — コーヒーと文化イベント。' },
      'Tradiska': { type: 'レストラン＋バー', note: 'サーミ料理、小さなバー、親密な雰囲気。' },
    },
    knowList: [
      'クラブはない。バーのあるホテルが二軒、酒を出すレストランが三軒。',
      '先住民映画祭Skábmagovatは1月下旬に開催 — 宿は満室になる。',
      '8月中旬のIjahis Idjaフェスティバル：Inariが「シーン」と呼べる最も近い存在。',
      'どこかで飲む前に、SajosとSiidaは必ず訪れるべき文化スポット。',
    ],
    quickFacts: {
      'Population': { label: '人口', value: '6 800' },
      'Closest airport': { label: '最寄り空港', value: 'IVL · 40分' },
      'Last call': { label: 'ラストオーダー', value: '01:00' },
      'Best season': { label: 'ベストシーズン', value: '8月下旬（Ijahis Idja） · 1月（Skábmagovat）' },
    },
  },
  kemi: {
    region: '海ラップランド',
    blurb: 'SnowCastle、Sampo砕氷船、そしてHotel Merihoviの重層的なレストラン複合施設。',
    pageTagline: 'SnowCastle、砕氷船、海のラップランド。',
    intro: 'Kemiはヘルシンキからの鉄道とラップランドをつなぐ玄関口であり、ひとつの切り札を持つ町だ — 1996年以来毎冬建て直されるSnowCastle。礼拝堂、ホテル、そして氷の壁に囲まれたバーがある。12月から運航するSampo砕氷船は、バー会場を兼ねたツアーを毎晩催す。陸側のナイトライフは小さい — Hotel Merihoviが重層的な複合施設（ロビーバー＋スポーツテラス＋レストラン）を運営しており、ほぼそれだけだ。冬には実力以上の存在感を見せる工業港町。',
    venues: {
      'SnowCastle Ice Bar': { type: 'アイスバー', note: '1〜4月営業。氷のグラスでウォッカショット、壁は–5°C。' },
      'Hotel Merihovi': { type: 'ホテル複合施設', note: 'ロビーバー＋スポーツテラス＋レストラン。' },
      'Sampo Icebreaker': { type: '船上バー', note: 'シーズン中は12:00と18:00に出航。バーは航行中ずっと営業。' },
    },
    knowList: [
      '賑わいの大半は1月から4月のSnowCastleに集まる。',
      'Sampo砕氷船はピークシーズンには2〜3日前の予約が必要。',
      '町のラストオーダーは02:00。SnowCastleのバーはそれより早く閉まる（通常24:00）。',
      'ヘルシンキからの列車：直通で8時間。',
    ],
    quickFacts: {
      'Population': { label: '人口', value: '20 800' },
      'Closest airport': { label: '最寄り空港', value: 'KEM · 5分 · またはヘルシンキから鉄道' },
      'Last call': { label: 'ラストオーダー', value: '02:00' },
      'Best season': { label: 'ベストシーズン', value: '1〜4月（SnowCastle＋砕氷船）' },
    },
  },
  yllas: {
    region: 'Kolari／Muonio',
    blurb: 'フィンランドで2番目に大きいスキーエリア。',
    pageTagline: 'フィンランドで2番目に大きいスキーエリア。',
    venues: {
      'Sport Resort Ylläs': { type: 'ホテルバー', note: 'Äkäslompoloで最も賑わうアプレスバー。' },
    },
    quickFacts: {
      'Beds in resort': { label: 'リゾートの宿泊ベッド数', value: '23 000' },
      'Closest airport': { label: '最寄り空港', value: 'KTT · 50分' },
      'Last call': { label: 'ラストオーダー', value: '02:00' },
      'Best season': { label: 'ベストシーズン', value: '11〜4月（スキー） · 3月（日が長くなる）' },
    },
  },
  ruka: {
    region: 'フィンランド北東部',
    blurb: 'スキーヤー日数でフィンランド第2のスキーリゾート。',
    pageTagline: 'クマの国のスキーリゾート。',
    venues: {
      'Zone Bar': { type: 'アプレスキー', note: 'ゲレンデ麓にある — FISワールドカップ開幕パーティーの本拠地。' },
    },
    quickFacts: {
      'Beds in resort': { label: 'リゾートの宿泊ベッド数', value: '15 000' },
      'Closest airport': { label: '最寄り空港', value: 'KAO · 30分' },
      'Last call': { label: 'ラストオーダー', value: '03:00（シーズン中）' },
      'Best season': { label: 'ベストシーズン', value: '11月下旬（FIS開幕） · 12〜4月' },
    },
  },
  'pyha-luosto': {
    region: 'Pelkosenniemi／Sodankylä',
    blurb: 'アメジスト、フェル（丘）、そしてラップランドで最も静かなスキー。',
    pageTagline: 'アメジストのフェル。',
    intro: '35 km離れた二つの小さなフェルが、ひとつの国立公園を分け合っている。Pyhäの方がスキーエリアは大きく、Luostoにはオーロラの下、真夜中に訪れられるアメジスト鉱山がある。どちらにもクラブはない。どちらにも暖炉のある夜にふさわしいホテルバーがある — レストラン級の食事ならHotel Pyhätunturi、オーロラを望む窓辺のバーならLuostoのHotel Aurora。ラップランドで最も静かな「スキーの地」であり、それを誇りにしている。',
    venues: {
      'Hotel Pyhätunturi Bar': { type: 'ホテルバー', note: 'レストラン＋バー、暖炉、ゲレンデサイド。' },
      'Hotel Aurora Luosto': { type: 'オーロラ窓のバー', note: '北向きのガラス張りバー — オーロラが出れば起こしてくれるサービスあり。' },
      'Pyhän Asteli': { type: 'レストラン＋バー', note: '地元民お気に入りのレストラン。Pyhäの村で唯一、夜遅くまで食事ができる。' },
    },
    knowList: [
      'Pyhä-Luostoのどこにもナイトクラブはない。',
      'アメジスト鉱山はオーロラの下のナイトツアーを催す — 事前予約を。',
      'Pyhä-Luosto国立公園こそが静かな目当て。',
      '両方の村ともラストオーダーは01:00前後。',
    ],
    quickFacts: {
      'Beds in two villages': { label: '二つの村の宿泊ベッド数', value: '5 000' },
      'Closest airport': { label: '最寄り空港', value: 'RVN · 1時間30分 · またはKTT · 2時間30分' },
      'Last call': { label: 'ラストオーダー', value: '01:00' },
      'Best season': { label: 'ベストシーズン', value: '12〜4月（スキー） · 9〜3月（オーロラ）' },
    },
  },
  sodankyla: {
    region: '中央ラップランド',
    blurb: '真夜中の太陽映画祭 — 真昼の明るさの中、03:00に映画を上映する。',
    pageTagline: '真夜中の太陽映画祭。',
    venues: {
    },
    quickFacts: {
      'Population': { label: '人口', value: '8 600' },
      'Closest airport': { label: '最寄り空港', value: 'RVN · 1時間45分' },
      'Last call': { label: 'ラストオーダー', value: '01:00 ／ フェスティバル中は04:00' },
      'Best season': { label: 'ベストシーズン', value: '6月中旬（真夜中の太陽映画祭）' },
    },
  },
  kittila: {
    region: 'Kittilä自治体',
    blurb: '地元民が実際に暮らす場所（Leviはほぼ観光客だ）。',
    pageTagline: 'Leviの地元民が実際に暮らす場所。',
    venues: {
    },
    quickFacts: {
      'Population': { label: '人口', value: '6 500' },
      'Closest airport': { label: '最寄り空港', value: 'KTT · 5分' },
      'Last call': { label: 'ラストオーダー', value: '02:00' },
      'Best season': { label: 'ベストシーズン', value: '通年（Leviスタッフのシーン）' },
    },
  },
  ivalo: {
    region: 'Inari自治体',
    blurb: 'Hotel IvaloのClub NordとHotel Kultahippuのパブ。',
    pageTagline: 'クラブのある最北の空港。',
    intro: 'Ivaloはフィンランド最北の空港であり、Inari、Saariselkä、そしてサーミの故郷への玄関口だ。町そのものは4 000人。Hotel IvaloはClub Nordを運営している — 金曜と土曜に開く、フィンランド本土で最北のクラブだ。Hotel Kultahippuには村で唯一のまともなパブがある。それ以外はホテルバーと、ビールを売るガソリンスタンドの売店が一軒。',
    venues: {
      'Club Nord (Hotel Ivalo)': { type: 'ナイトクラブ', note: '金〜土営業。フィンランド本土で最北のクラブ。' },
      'Hotel Kultahippu Pub': { type: 'パブ', note: '毎日営業。地元の仕事終わりの溜まり場。' },
      'Hotel Ivalo Lobby Bar': { type: 'ホテルバー', note: 'より静かで、レストラン併設。' },
    },
    knowList: [
      'フィンランド本土で最北の空港。',
      'Saariselkäは25分先 — Saariselkäの来訪者の多くがClub Nordのために車でやってくる。',
      'ラストオーダーは平日02:00、週末03:00。',
      'タクシー乗り場はない — ホテルのフロント経由で手配を。',
    ],
    quickFacts: {
      'Population': { label: '人口', value: '4 000' },
      'Closest airport': { label: '最寄り空港', value: 'IVL · 5分' },
      'Last call': { label: 'ラストオーダー', value: '02:00 ／ 週末は03:00' },
      'Best season': { label: 'ベストシーズン', value: '9〜3月（オーロラ） · 8月（フェスティバル）' },
    },
  },
  muonio: {
    region: '西ラップランド',
    blurb: 'ナイトライフはなし。Pallas-Yllästunturi国立公園が目当て。',
    pageTagline: '国立公園の玄関口。',
    venues: {
      'Harriniva Wilderness Hotel': { type: 'ホテルバー', note: 'サウナ＋バー、客のほとんどはサファリ参加者。' },
    },
    quickFacts: {
      'Population': { label: '人口', value: '2 300' },
      'Closest airport': { label: '最寄り空港', value: 'KTT · 1時間15分' },
      'Last call': { label: 'ラストオーダー', value: '23:00 ／ 週末は01:00' },
      'Best season': { label: 'ベストシーズン', value: '9〜3月（オーロラ · 光害が少ない）' },
    },
  },
  salla: {
    region: '東ラップランド',
    blurb: '何もないど真ん中。フィンランドで最も静かなスキーリゾート。',
    pageTagline: '何もないど真ん中。',
    venues: {
      'Hotel Revontuli Bar': { type: 'ホテルバー', note: '唯一の夜遅くまで開く会場。レストラン＋バー。' },
      'Salla Wilderness Park': { type: '昼間の会場', note: '公園の来訪者向けのランチと昼間のカフェ。' },
    },
    quickFacts: {
      'Population': { label: '人口', value: '3 300' },
      'Closest airport': { label: '最寄り空港', value: 'KAO · 1時間30分' },
      'Last call': { label: 'ラストオーダー', value: '23:00 ／ シーズン中は01:00' },
      'Best season': { label: 'ベストシーズン', value: '12〜4月（スキー · 2032年五輪招致）' },
    },
  },
};

export default overlay;
