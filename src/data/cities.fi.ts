import type { CityOverlay } from './cityI18n';

const overlay: Record<string, CityOverlay> = {
  oulu: {
    region: 'Pohjois-Pohjanmaa',
    blurb: 'Euroopan kulttuuripääkaupunki 2026 — ja pohjoisen ainoa aidosti ympärivuotinen klubikulttuuri.',
    pageTagline: 'Euroopan kulttuuripääkaupunki 2026.',
    venues: {
      '45 Special': { type: 'Yökerho', note: 'Opiskelijoiden suosikkiklubi. Auki ke–la, myöhään.' },
      'Never Grow Old': { type: 'Livemusiikki + klubi', note: 'Indie- ja vaihtoehtokeikat. Kadun pienin paikka mutta uskollisin yleisö.' },
      'St Michael': { type: 'Live + klubi', note: 'Kadun suurin sali. Kiertävät DJ:t ja tribuutti-illat.' },
    },
    quickFacts: {
      'Population': { label: 'Asukasluku', value: '210 000' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'OUL · 15 min' },
      'Last call': { label: 'Anniskelu loppuu', value: '03:30' },
      'Best season': { label: 'Paras kausi', value: 'Ympäri vuoden · 2026 kulttuuripääkaupunki' },
    },
  },
  rovaniemi: {
    region: 'Lappi',
    blurb: 'Arktinen pääkaupunki — jakautuu turistien viikonloppuihin ja paikallisten arkipäiviin.',
    pageTagline: 'Arktinen pääkaupunki.',
    venues: {
      'Roy Club': { type: 'Yökerho', note: 'Auki vuodesta 1985. Kolme salia — kaupungin suurin tanssilattia.' },
      'Bull Bar': { type: 'Urheilubaari', note: 'Äänekäs, täysi, Valioliiga-terassi, myöhäistä ruokaa.' },
      'Kauppayhtiö': { type: 'Kahvila + baari', note: 'Vintage-olohuoneen estetiikkaa; cocktaileja myöhään.' },
    },
    quickFacts: {
      'Population': { label: 'Asukasluku', value: '64 000' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'RVN · 10 min' },
      'Last call': { label: 'Anniskelu loppuu', value: '03:00' },
      'Best season': { label: 'Paras kausi', value: 'Syys–maalis (revontulet) · joulukuu (Joulupukki)' },
    },
  },
  levi: {
    region: 'Kittilän kunta',
    blurb: 'Hullu Poro Areena: 1 700 hengen kapasiteetti, 10 baaria, 2 kerrosta — Lapin suurin yökerho.',
    pageTagline: 'Suomen suurimmat hiihtokeskusbileet.',
    venues: {
      'Hullu Poro Areena': { type: 'Megayökerho', note: '1 700 hengen kapasiteetti, 10 baaria, 2 kerrosta. Konserttipaikka ke–la.' },
      'Ihku': { type: 'Après-ski', note: 'Hirsimökki rinteen juurella. Monot tanssilattialla.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Vuodepaikkoja keskuksessa', value: '24 000' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'KTT · 18 km' },
      'Last call': { label: 'Anniskelu loppuu', value: '03:30' },
      'Best season': { label: 'Paras kausi', value: 'Marras–huhti (lumi + Hullu Poro)' },
    },
  },
  saariselka: {
    region: 'Inarin kunta',
    blurb: 'Lasi-iglut, Kakslauttasen Igloo Bar ja yksi aito pubi — Local Pub Panimo.',
    pageTagline: 'Erämaan premium — iglubaarien kylä.',
    intro: 'Saariselkä ei ole klubikohde. Se on lasi-iglukohde — ja juuri siinä on pointti. Kakslauttanen Arctic Resortilla on maailman valokuvatuin baari (lasi-iglu, jonka kattona ovat revontulet). Itse kylä on yksi pääkatu, kaksi syömisen arvoista ravintolaa ja Local Pub Panimo — pienpanimo, jolla on Lapin luotettavin pienpanimo-oluen hanalista. Pimeän tultua tapahtumat ovat keskuksissa, eivät kylässä.',
    venues: {
      'Kakslauttanen Igloo Bar': { type: 'Lasikattobaari', note: 'Maailmankuulu valokuva. Avoinna myös ulkopuolisille varauksella.' },
      'Local Pub Panimo': { type: 'Pienpanimopubi', note: 'Omat panimotuotteet, kylän ainoa kunnon pubi.' },
      'Hotel Riekonlinna Bar': { type: 'Hotellibaari', note: 'Iso aulan takka, paikallinen DJ perjantai-iltaisin.' },
    },
    knowList: [
      'Ei erillisiä klubeja — yöelämä on hotellien varassa.',
      'Igloo Bar vaatii varauksen, jos et yövy Kakslauttasella.',
      'Matka lentoasemalta (Ivalo) on 25 minuuttia; varaa kuljetus, jos juot.',
      'Revontuliennustesovellus on välttämätön — henkilökunta herättää vieraat klo 02:00, jos revontulet ovat aktiiviset.',
    ],
    quickFacts: {
      'Beds in village': { label: 'Vuodepaikkoja kylässä', value: '7 500' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'IVL · 25 min' },
      'Last call': { label: 'Anniskelu loppuu', value: '01:30 (hotellit)' },
      'Best season': { label: 'Paras kausi', value: 'Syys–maalis (revontulet)' },
    },
  },
  inari: {
    region: 'Inarin kunta',
    blurb: 'Saamelaiskulttuurin pääkaupunki — Sajos, Siida, Inarijärvi ja Pielpajärven erämaakirkko.',
    pageTagline: 'Saamelaiskulttuurin pääkaupunki.',
    intro: 'Inari on saamelaiskäräjien (Sajos) kulttuurinen kotipaikka ja Siidan koti — museon, joka selittää kaiken, mitä et tiennyt Saamenmaasta. \'Yöelämä\' on täällä kulttuuria: Skábmagovat-alkuperäiskansaelokuvafestivaali tammikuussa, Ijahis Idja -saamelaismusiikkifestivaali elokuussa ja kourallinen baareja, jotka pääosin tarjoilevat illallisia. Älä tule klubien takia. Tule kylmän järviveden, joikukonserttien ja taivaan takia, joka pimenee joulukuussa klo 14:00.',
    venues: {
      'Hotel Inari Bar': { type: 'Hotellibaari', note: 'Järvinäkymäravintola ja -baari, auki klo 01:00 asti.' },
      'Sajos Café': { type: 'Päiväpaikka', note: 'Saamelaiskäräjien kahvila — kahvia ja kulttuuritapahtumia.' },
      'Tradiska': { type: 'Ravintola + baari', note: 'Saamelaiskeittiötä, pieni baari, intiimi tunnelma.' },
    },
    knowList: [
      'Ei klubeja. Kaksi hotellia baareineen, kolme alkoholia tarjoilevaa ravintolaa.',
      'Skábmagovat-alkuperäiskansaelokuvafestivaali pyörii tammikuun lopussa — majoitukset myydään loppuun.',
      'Ijahis Idja -festivaali elokuun puolivälissä: lähinnä \'sceneä\', mitä Inarissa on.',
      'Sajos ja Siida ovat pakolliset kulttuurikäynnit ennen kuin juot missään.',
    ],
    quickFacts: {
      'Population': { label: 'Asukasluku', value: '6 800' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'IVL · 40 min' },
      'Last call': { label: 'Anniskelu loppuu', value: '01:00' },
      'Best season': { label: 'Paras kausi', value: 'Elokuun loppu (Ijahis Idja) · tammikuu (Skábmagovat)' },
    },
  },
  kemi: {
    region: 'Meri-Lappi',
    blurb: 'LumiLinna, jäänmurtaja Sampo ja Hotel Merihovin monikerroksinen ravintolakokonaisuus.',
    pageTagline: 'LumiLinna, jäänmurtaja, Meri-Lappi.',
    intro: 'Kemi on portti Helsingin junayhteyden ja Lapin välissä — ja kaupunki, jolla on yksi temppu: LumiLinna, joka on rakennettu uudelleen joka talvi vuodesta 1996, kappeleineen, hotelleineen ja jääseinäisine baareineen. Jäänmurtaja Sampon risteilyt pyörivät joulukuusta lähtien öisin ja toimivat samalla baaripaikkoina. Mantereen yöelämä on pientä: Hotel Merihovi pyörittää monikerroksista kokonaisuutta (aulabaari, urheiluterassi, ravintola) ja siinä se pääosin onkin. Teollinen satamakaupunki, joka lyö talvella yli oman painonsa.',
    venues: {
      'SnowCastle Ice Bar': { type: 'Jääbaari', note: 'Auki tammi–huhti. Vodkashotit jäälaseista, seinät –5 °C:ssa.' },
      'Hotel Merihovi': { type: 'Hotellikokonaisuus', note: 'Aulabaari + urheiluterassi + ravintola.' },
      'Sampo Icebreaker': { type: 'Laivabaari', note: 'Risteilyt 12:00 ja 18:00 sesongissa; baari pyörii koko matkan.' },
    },
    knowList: [
      'Suurin osa tapahtumista on LumiLinnassa tammikuusta huhtikuuhun.',
      'Jäänmurtaja Sampo vaatii varauksen 2–3 päivää etukäteen sesongin huipulla.',
      'Anniskelu loppuu kaupungissa 02:00; LumiLinnan baari sulkee aiemmin (yleensä 24:00).',
      'Juna Helsingistä: 8 h suoraan.',
    ],
    quickFacts: {
      'Population': { label: 'Asukasluku', value: '20 800' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'KEM · 5 min · tai juna Helsingistä' },
      'Last call': { label: 'Anniskelu loppuu', value: '02:00' },
      'Best season': { label: 'Paras kausi', value: 'Tammi–huhti (LumiLinna + jäänmurtaja)' },
    },
  },
  yllas: {
    region: 'Kolari / Muonio',
    blurb: 'Suomen toiseksi suurin hiihtoalue.',
    pageTagline: 'Suomen toiseksi suurin hiihtoalue.',
    venues: {
      'Sport Resort Ylläs': { type: 'Hotellibaari', note: 'Äkäslompolon vilkkain après-baari.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Vuodepaikkoja keskuksessa', value: '23 000' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'KTT · 50 min' },
      'Last call': { label: 'Anniskelu loppuu', value: '02:00' },
      'Best season': { label: 'Paras kausi', value: 'Marras–huhti (hiihto) · maaliskuu (pidemmät päivät)' },
    },
  },
  ruka: {
    region: 'Koillis-Suomi',
    blurb: 'Suomen toiseksi vilkkain hiihtokeskus laskijapäivissä mitattuna.',
    pageTagline: 'Karhumaan hiihtokeskus.',
    venues: {
      'Zone Bar': { type: 'Après-ski', note: 'Rinteen juurella — FIS-maailmancupin avajaisbileiden kotipesä.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Vuodepaikkoja keskuksessa', value: '15 000' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'KAO · 30 min' },
      'Last call': { label: 'Anniskelu loppuu', value: '03:00 (sesongissa)' },
      'Best season': { label: 'Paras kausi', value: 'Marraskuun loppu (FIS-avajaiset) · joulu–huhti' },
    },
  },
  'pyha-luosto': {
    region: 'Pelkosenniemi / Sodankylä',
    blurb: 'Ametistia, tuntureita ja Lapin hiljaisinta hiihtoa.',
    pageTagline: 'Ametistituntureilla.',
    intro: 'Kaksi pientä tunturia, 35 km erillään, jakavat saman kansallispuiston. Pyhällä on suurempi hiihtoalue; Luostolla on ametistikaivos, jolla voi vierailla keskiyöllä revontulien alla. Kummallakaan ei ole klubeja. Molemmilla on hotellibaareja, jotka kannattavat takkaillan — Hotel Pyhätunturi ravintolatason ruokailuun, Hotel Aurora Luostolla revontuli-ikkunabaariin. Lapin hiljaisin \'hiihtokohde\', ja se on siitä ylpeä.',
    venues: {
      'Hotel Pyhätunturi Bar': { type: 'Hotellibaari', note: 'Ravintola + baari, takka, rinteen vieressä.' },
      'Hotel Aurora Luosto': { type: 'Revontuli-ikkunabaari', note: 'Lasiseinäinen baari pohjoiseen — herätyspalvelu, jos revontulet ovat aktiiviset.' },
      'Pyhän Asteli': { type: 'Ravintola + baari', note: 'Paikallisten suosima ravintola; Pyhän kylän ainoa myöhäisillan ruokailu.' },
    },
    knowList: [
      'Yhtään yökerhoa ei ole missään päin Pyhä-Luostoa.',
      'Ametistikaivos tarjoaa yöretkiä revontulien alla — varaa etukäteen.',
      'Pyhä-Luoston kansallispuisto on hiljainen vetonaula.',
      'Anniskelu loppuu molemmissa kylissä noin 01:00.',
    ],
    quickFacts: {
      'Beds in two villages': { label: 'Vuodepaikkoja kahdessa kylässä', value: '5 000' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'RVN · 1 h 30 · tai KTT · 2 h 30' },
      'Last call': { label: 'Anniskelu loppuu', value: '01:00' },
      'Best season': { label: 'Paras kausi', value: 'Joulu–huhti (hiihto) · syys–maalis (revontulet)' },
    },
  },
  sodankyla: {
    region: 'Keski-Lappi',
    blurb: 'Sodankylän elokuvajuhlat — elokuvia näytetään klo 03:00 täydessä päivänvalossa.',
    pageTagline: 'Sodankylän elokuvajuhlat.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Asukasluku', value: '8 600' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'RVN · 1 h 45' },
      'Last call': { label: 'Anniskelu loppuu', value: '01:00 / 04:00 festivaalin aikaan' },
      'Best season': { label: 'Paras kausi', value: 'Kesäkuun puoliväli (Sodankylän elokuvajuhlat)' },
    },
  },
  kittila: {
    region: 'Kittilän kunta',
    blurb: 'Missä paikalliset oikeasti asuvat (Levi on pääosin turisteja).',
    pageTagline: 'Missä Levin paikalliset oikeasti asuvat.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Asukasluku', value: '6 500' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'KTT · 5 min' },
      'Last call': { label: 'Anniskelu loppuu', value: '02:00' },
      'Best season': { label: 'Paras kausi', value: 'Ympäri vuoden (Levin henkilökunnan meininki)' },
    },
  },
  ivalo: {
    region: 'Inarin kunta',
    blurb: 'Hotel Ivalon Club Nord + Hotel Kultahipun pubi.',
    pageTagline: 'Pohjoisin lentoasema, jolla on klubi.',
    intro: 'Ivalo on Suomen pohjoisin lentoasema ja portti Inariin, Saariselälle ja saamelaisten kotiseutualueelle. Itse kylässä on 4 000 asukasta. Hotel Ivalo pyörittää Club Nordia — Manner-Suomen pohjoisinta klubia, joka on auki perjantaina ja lauantaina. Hotel Kultahipulla on kylän ainoa kunnon pubi. Sen lisäksi hotellibaareja ja yksi huoltoaseman kioski, joka myy olutta.',
    venues: {
      'Club Nord (Hotel Ivalo)': { type: 'Yökerho', note: 'Auki pe–la. Manner-Suomen pohjoisin klubi.' },
      'Hotel Kultahippu Pub': { type: 'Pubi', note: 'Auki päivittäin. Paikallisten työn jälkeinen paikka.' },
      'Hotel Ivalo Lobby Bar': { type: 'Hotellibaari', note: 'Rauhallisempi, ravintolan yhteydessä.' },
    },
    knowList: [
      'Manner-Suomen pohjoisin lentoasema.',
      'Saariselkä on 25 minuutin päässä — moni Saariselän vieras ajaa Ivaloon Club Nordia varten.',
      'Anniskelu loppuu arkisin 02:00, viikonloppuisin 03:00.',
      'Ei taksitolppaa — varaa hotellin vastaanoton kautta.',
    ],
    quickFacts: {
      'Population': { label: 'Asukasluku', value: '4 000' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'IVL · 5 min' },
      'Last call': { label: 'Anniskelu loppuu', value: '02:00 / 03:00 viikonloppuisin' },
      'Best season': { label: 'Paras kausi', value: 'Syys–maalis (revontulet) · elokuu (festivaalit)' },
    },
  },
  muonio: {
    region: 'Länsi-Lappi',
    blurb: 'Ei yöelämää. Pallas-Yllästunturin kansallispuisto on vetonaula.',
    pageTagline: 'Portti kansallispuistoon.',
    venues: {
      'Harriniva Wilderness Hotel': { type: 'Hotellibaari', note: 'Sauna + baari, pääosin safarivieraita.' },
    },
    quickFacts: {
      'Population': { label: 'Asukasluku', value: '2 300' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'KTT · 1 h 15' },
      'Last call': { label: 'Anniskelu loppuu', value: '23:00 / 01:00 viikonloppuisin' },
      'Best season': { label: 'Paras kausi', value: 'Syys–maalis (revontulet · vähän valosaastetta)' },
    },
  },
  salla: {
    region: 'Itä-Lappi',
    blurb: 'Keskellä ei-mitään. Suomen hiljaisin hiihtokeskus.',
    pageTagline: 'Keskellä ei-mitään.',
    venues: {
      'Hotel Revontuli Bar': { type: 'Hotellibaari', note: 'Ainoa myöhäisillan menopaikka. Ravintola + baari.' },
      'Salla Wilderness Park': { type: 'Päiväpaikka', note: 'Lounas + päiväkahvila puiston vierailijoille.' },
    },
    quickFacts: {
      'Population': { label: 'Asukasluku', value: '3 300' },
      'Closest airport': { label: 'Lähin lentoasema', value: 'KAO · 1 h 30' },
      'Last call': { label: 'Anniskelu loppuu', value: '23:00 / 01:00 sesongissa' },
      'Best season': { label: 'Paras kausi', value: 'Joulu–huhti (hiihto · 2032 olympiahakemus)' },
    },
  },
};

export default overlay;
