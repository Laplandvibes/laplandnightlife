import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, Wifi, Zap } from 'lucide-react';
import { airaloLink, AIRALO } from '../config/partners';
import { trackAffiliateClick } from '../lib/analytics';
import AffiliateDisclosure from './AffiliateDisclosure';
import { useLang, type Lang } from '../i18n/useLang';

/**
 * Affiliate ad — Airalo (Travelpayouts), global travel eSIM.
 *
 * Why it fits laplandnightlife: the audience is international and young (11
 * languages). They want maps to the bar, a ride home and their stories posted
 * the same night — all of which need data the moment they land, not a roaming
 * bill. Airalo is a download-and-go eSIM, so the angle is "land with data
 * already on your phone."
 *
 * Skinned in AIRALO's OWN brand (premium_design_standard §6): a clean off-white
 * card, Airalo's real coral→magenta mark, their coral accent and a bold coral
 * CTA, so it reads as an authentic Airalo placement framed on the dark page —
 * not as one of our own sections.
 *
 * No product feed exists for a service like this, so per
 * affiliate_ad_creative_process §4 the visual is the real logo + a tasteful
 * brand-CSS "connectivity" stage (signal rings over a globe), NOT a fabricated
 * product photo. Nothing AI-garbled, no fake screenshots.
 *
 * Offer hook: evergreen positioning only — instant eSIM, keep your number,
 * works across Europe. No time-limited "−X %" is shown (it would go stale =
 * fake data, brand rule). Accurate, never expires.
 *
 * Pure CSS/Tailwind animation only (no Framer Motion / GSAP); the scroll reveal
 * is a progressive enhancement (content is always visible pre-JS / no-JS) and is
 * fully disabled under prefers-reduced-motion.
 *
 * Required affiliate attributes (LV spec): target="_blank"
 * rel="sponsored nofollow noopener" — NO `noreferrer`.
 */

/** Airalo brand accents — coral + a deeper rose for AA-legible text/CTA. */
const AIRALO_CORAL = '#F65770';
const AIRALO_DEEP = '#C8344E';

export default function AiraloAd({
  sid = 'connectivity_esim',
  className = '',
}: {
  sid?: string;
  className?: string;
}) {
  const lang = useLang();
  const href = airaloLink(sid);

  const rootRef = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || revealed) return;
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    const t = window.setTimeout(() => setRevealed(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [armed, revealed]);

  const animState = !armed ? 'off' : revealed ? 'in' : 'pending';

  const pick = (m: Record<Lang, string>) => m[lang];

  const adLabel = pick({
    en: 'Ad', fi: 'Mainos', de: 'Anzeige', ja: '広告', es: 'Anuncio',
    'pt-BR': 'Anúncio', 'zh-CN': '广告', ko: '광고', fr: 'Annonce',
    it: 'Annuncio', nl: 'Advertentie',
  });

  const eyebrow = pick({
    en: 'Travel eSIM', fi: 'Matka-eSIM', de: 'Reise-eSIM', ja: '旅行用eSIM',
    es: 'eSIM de viaje', 'pt-BR': 'eSIM de viagem', 'zh-CN': '旅行 eSIM',
    ko: '여행용 eSIM', fr: 'eSIM de voyage', it: 'eSIM da viaggio',
    nl: 'Reis-eSIM',
  });

  // Two short human sentences, no em-dash connector. Speaks to the real moment:
  // land, get data, find the bar / call the ride / post the night.
  const headline = pick({
    en: 'Land in Lapland with data already on your phone. Airalo is an eSIM you set up before the flight.',
    fi: 'Saavu Lappiin niin, että netti on jo puhelimessa. Airalo on eSIM, jonka asennat valmiiksi ennen lentoa.',
    de: 'Komm in Lappland an, mit Daten schon auf dem Handy. Airalo ist eine eSIM, die du vor dem Flug einrichtest.',
    ja: 'ラップランドに着いた瞬間から、スマホでネットを。Airalo はフライト前に設定しておける eSIM です。',
    es: 'Llega a Laponia con datos ya en el móvil. Airalo es una eSIM que configuras antes del vuelo.',
    'pt-BR': 'Chegue à Lapônia com internet já no celular. A Airalo é um eSIM que você configura antes do voo.',
    'zh-CN': '落地拉普兰,手机就已经有网。Airalo 是出发前就能装好的 eSIM。',
    ko: '라플란드에 도착하는 순간 바로 데이터를. Airalo는 비행 전에 미리 설정해 두는 eSIM입니다.',
    fr: 'Arrivez en Laponie avec déjà de la data sur le téléphone. Airalo est une eSIM que vous installez avant le vol.',
    it: 'Arriva in Lapponia con i dati già sul telefono. Airalo è una eSIM che configuri prima del volo.',
    nl: 'Land in Lapland met data al op je telefoon. Airalo is een eSIM die je vóór de vlucht instelt.',
  });

  const sub = pick({
    en: 'No SIM swap, no roaming bill, no shop queue at the airport. Pick a Finland or Europe plan, install it in a couple of minutes, and your maps, ride apps and stories work the second you switch your phone off airplane mode.',
    fi: 'Ei SIM-kortin vaihtoa, ei roaming-laskua, ei jonoa lentokentän liikkeessä. Valitse Suomi- tai Eurooppa-paketti, asenna se parissa minuutissa, ja kartat, kyytisovellukset ja tarinat toimivat heti kun otat lentokonetilan pois.',
    de: 'Kein SIM-Wechsel, keine Roaming-Rechnung, keine Schlange im Flughafen-Shop. Wähle einen Finnland- oder Europa-Tarif, richte ihn in zwei Minuten ein, und Karten, Fahrdienste und Storys laufen, sobald du den Flugmodus ausschaltest.',
    ja: 'SIM の差し替えも、ローミング料金も、空港ショップの行列もなし。フィンランドまたはヨーロッパのプランを選んで数分で設定すれば、機内モードを解除した瞬間から地図も配車アプリもストーリーも使えます。',
    es: 'Sin cambiar de SIM, sin factura de roaming, sin colas en la tienda del aeropuerto. Elige un plan de Finlandia o de Europa, instálalo en un par de minutos y tus mapas, apps de transporte e historias funcionan en cuanto quitas el modo avión.',
    'pt-BR': 'Sem troca de SIM, sem conta de roaming, sem fila na loja do aeroporto. Escolha um plano da Finlândia ou da Europa, instale em dois minutos e seus mapas, apps de transporte e stories funcionam assim que você sai do modo avião.',
    'zh-CN': '不用换卡、不用付漫游费、不用在机场排队。选一个芬兰或欧洲套餐,几分钟装好,一关掉飞行模式,地图、打车软件和动态就都能用。',
    ko: 'SIM 교체도, 로밍 요금도, 공항 매장 줄도 없습니다. 핀란드 또는 유럽 요금제를 골라 몇 분이면 설치되고, 비행기 모드를 끄는 순간 지도와 차량 호출 앱, 스토리가 바로 작동합니다.',
    fr: 'Pas de changement de SIM, pas de facture d’itinérance, pas de file à la boutique de l’aéroport. Choisissez un forfait Finlande ou Europe, installez-le en deux minutes, et vos cartes, applis de transport et stories marchent dès que vous quittez le mode avion.',
    it: 'Niente cambio SIM, niente bolletta in roaming, niente coda al negozio dell’aeroporto. Scegli un piano Finlandia o Europa, installalo in un paio di minuti, e mappe, app per gli spostamenti e storie funzionano appena togli la modalità aereo.',
    nl: 'Geen simwissel, geen roamingrekening, geen rij in de luchthavenwinkel. Kies een Finland- of Europa-bundel, installeer hem in een paar minuten en je kaarten, rit-apps en stories werken zodra je de vliegtuigstand uitzet.',
  });

  const trust: { icon: typeof Globe; label: string }[] = [
    {
      icon: Zap,
      label: pick({
        en: 'Set up in minutes, before you fly',
        fi: 'Asennus minuuteissa ennen lentoa',
        de: 'In Minuten eingerichtet, vor dem Flug',
        ja: 'フライト前に数分で設定',
        es: 'Listo en minutos, antes de volar',
        'pt-BR': 'Pronto em minutos, antes de voar',
        'zh-CN': '出发前几分钟搞定',
        ko: '비행 전 몇 분이면 설정 완료',
        fr: 'Prêt en quelques minutes, avant le vol',
        it: 'Pronto in pochi minuti, prima di volare',
        nl: 'In minuten klaar, vóór je vlucht',
      }),
    },
    {
      icon: Globe,
      label: pick({
        en: 'Finland & Europe-wide plans',
        fi: 'Suomen ja koko Euroopan paketit',
        de: 'Tarife für Finnland & ganz Europa',
        ja: 'フィンランド＆ヨーロッパ全域プラン',
        es: 'Planes de Finlandia y toda Europa',
        'pt-BR': 'Planos da Finlândia e de toda a Europa',
        'zh-CN': '芬兰及全欧洲套餐',
        ko: '핀란드 및 유럽 전역 요금제',
        fr: 'Forfaits Finlande et toute l’Europe',
        it: 'Piani per Finlandia e tutta Europa',
        nl: 'Bundels voor Finland & heel Europa',
      }),
    },
    {
      icon: Wifi,
      label: pick({
        en: 'Keep your own number',
        fi: 'Pidät oman numerosi',
        de: 'Behalte deine eigene Nummer',
        ja: '自分の番号はそのまま',
        es: 'Conserva tu propio número',
        'pt-BR': 'Mantenha seu próprio número',
        'zh-CN': '保留你原来的号码',
        ko: '기존 번호 그대로 사용',
        fr: 'Gardez votre propre numéro',
        it: 'Mantieni il tuo numero',
        nl: 'Houd je eigen nummer',
      }),
    },
  ];

  const cta = pick({
    en: 'Get an eSIM', fi: 'Hanki eSIM', de: 'eSIM holen', ja: 'eSIM を入手',
    es: 'Consigue una eSIM', 'pt-BR': 'Obter um eSIM', 'zh-CN': '获取 eSIM',
    ko: 'eSIM 받기', fr: 'Obtenir une eSIM', it: 'Ottieni una eSIM',
    nl: 'Haal een eSIM',
  });

  const poweredBy = pick({
    en: 'Sold by Airalo', fi: 'Myynti: Airalo', de: 'Verkauf durch Airalo',
    ja: '販売：Airalo', es: 'Vendido por Airalo', 'pt-BR': 'Vendido pela Airalo',
    'zh-CN': '由 Airalo 销售', ko: 'Airalo 판매', fr: 'Vendu par Airalo',
    it: 'Venduto da Airalo', nl: 'Verkocht door Airalo',
  });

  // Evergreen offer chip (no %; always true).
  const chip = pick({
    en: 'Instant digital delivery',
    fi: 'Toimitus heti, sähköisesti',
    de: 'Sofortige digitale Lieferung',
    ja: 'デジタルで即時お届け',
    es: 'Entrega digital al instante',
    'pt-BR': 'Entrega digital na hora',
    'zh-CN': '即时数字交付',
    ko: '즉시 디지털 발급',
    fr: 'Livraison numérique instantanée',
    it: 'Consegna digitale immediata',
    nl: 'Direct digitaal geleverd',
  });

  return (
    <section
      ref={rootRef}
      data-anim={animState}
      className={`ln-airalo-ad group/ad relative overflow-hidden rounded-3xl bg-[#FBF7F6] text-stone-900 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.6)] ring-1 ring-stone-900/5 ${className}`}
      style={{ borderTop: `3px solid ${AIRALO_CORAL}` }}
      aria-label={headline}
    >
      <style>{`
        .ln-airalo-ad[data-anim='pending'] .ln-rise { opacity: 0; transform: translateY(14px); }
        .ln-airalo-ad[data-anim='in'] .ln-rise {
          opacity: 1; transform: none;
          transition: opacity .6s ease, transform .6s cubic-bezier(.22,.61,.36,1);
        }
        .ln-airalo-ad[data-anim='in'] .ln-rise-1 { transition-delay: .05s; }
        .ln-airalo-ad[data-anim='in'] .ln-rise-2 { transition-delay: .13s; }
        .ln-airalo-ad[data-anim='in'] .ln-rise-3 { transition-delay: .21s; }

        .ln-airalo-ad[data-anim='pending'] .ln-stage { opacity: 0; transform: scale(.94); }
        .ln-airalo-ad[data-anim='in'] .ln-stage {
          opacity: 1; transform: scale(1);
          transition: opacity .7s ease, transform .9s cubic-bezier(.22,.61,.36,1);
        }

        /* Concentric signal rings pulsing out from the globe. */
        .ln-airalo-ad .ln-ring {
          position: absolute; left: 50%; top: 50%;
          border-radius: 9999px; border: 2px solid ${AIRALO_CORAL};
          transform: translate(-50%, -50%) scale(.4); opacity: 0;
        }
        .ln-airalo-ad[data-anim='in'] .ln-ring { animation: ln-pulse 3.6s ease-out infinite; }
        .ln-airalo-ad[data-anim='in'] .ln-ring-2 { animation-delay: 1.2s; }
        .ln-airalo-ad[data-anim='in'] .ln-ring-3 { animation-delay: 2.4s; }
        @keyframes ln-pulse {
          0%   { transform: translate(-50%, -50%) scale(.4); opacity: .55; }
          70%  { opacity: .12; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }

        /* Gentle float on the globe badge. */
        .ln-airalo-ad[data-anim='in'] .ln-globe { animation: ln-float 5.5s ease-in-out infinite; }
        @keyframes ln-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

        @media (prefers-reduced-motion: reduce) {
          .ln-airalo-ad .ln-rise,
          .ln-airalo-ad .ln-stage { opacity: 1 !important; transform: none !important; transition: none !important; }
          .ln-airalo-ad .ln-ring,
          .ln-airalo-ad .ln-globe { animation: none !important; opacity: 0 !important; }
          .ln-airalo-ad .ln-ring { display: none; }
        }
      `}</style>

      {/* Soft coral wash, top-right — keeps the off-white card on-brand. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(246,87,112,0.18), transparent)' }}
      />

      <div className="relative grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
        {/* ── Copy column ─────────────────────────────────────────────── */}
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="ln-rise ln-rise-1 mb-5 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <span
                className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
                style={{ backgroundColor: 'rgba(246,87,112,0.14)', color: AIRALO_DEEP }}
              >
                {adLabel}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: AIRALO_DEEP }}>
                {eyebrow}
              </p>
            </div>
            {/* Real Airalo mark + wordmark lockup. */}
            <span className="flex shrink-0 items-center gap-2">
              <img
                src={AIRALO.logo}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
              <span className="text-lg font-bold tracking-tight text-stone-900 sm:text-xl">Airalo</span>
            </span>
          </div>

          <h2 className="ln-rise ln-rise-1 mb-3 max-w-xl text-2xl font-bold leading-tight text-stone-900 sm:text-3xl text-balance">
            {headline}
          </h2>
          <p className="ln-rise ln-rise-2 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
            {sub}
          </p>

          <ul className="ln-rise ln-rise-2 mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-sm text-stone-700">
                <t.icon className="h-4 w-4 shrink-0" style={{ color: AIRALO_DEEP }} aria-hidden="true" />
                <span>{t.label}</span>
              </li>
            ))}
          </ul>

          {/* Evergreen offer chip — Airalo coral. */}
          <div
            className="ln-rise ln-rise-3 mt-6 inline-flex w-fit items-center gap-2 rounded-2xl leading-snug px-3.5 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: 'rgba(246,87,112,0.14)', color: AIRALO_DEEP }}
          >
            <Zap className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{chip}</span>
          </div>

          <div className="ln-rise ln-rise-3 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={href}
              target="_blank"
              rel="sponsored nofollow noopener"
              onClick={() => trackAffiliateClick(AIRALO.slug, `airalo:${sid}`, href)}
              className="group/cta inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-4 font-semibold text-white no-underline shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: AIRALO_DEEP, boxShadow: '0 14px 30px -12px rgba(200,52,78,0.55)' }}
            >
              {cta}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <p className="text-[11px] uppercase tracking-[0.12em] text-stone-400">{poweredBy}</p>
          </div>

          <AffiliateDisclosure variant="compact" className="mt-6 !text-stone-500" />
        </div>

        {/* ── Brand visual stage (no fake product photo) ──────────────── */}
        <div
          className="relative min-h-[18rem] overflow-hidden lg:min-h-full"
          style={{ background: 'linear-gradient(155deg, #FCE7E1 0%, #F9C9C7 55%, #F4A6B4 100%)' }}
          aria-hidden="true"
        >
          <div className="ln-stage relative flex h-full items-center justify-center p-8">
            {/* Pulsing signal rings */}
            <span className="ln-ring ln-ring-1 h-44 w-44" />
            <span className="ln-ring ln-ring-2 h-44 w-44" />
            <span className="ln-ring ln-ring-3 h-44 w-44" />
            {/* Globe badge with the Airalo mark */}
            <div
              className="ln-globe relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-[0_18px_45px_-15px_rgba(200,52,78,0.6)] ring-1 ring-white/70 sm:h-32 sm:w-32"
            >
              <img
                src={AIRALO.logo}
                alt=""
                width={72}
                height={72}
                loading="lazy"
                decoding="async"
                className="h-14 w-14 sm:h-16 sm:w-16"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
