import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldPlus, Plane, HeartPulse } from 'lucide-react';
import { ektaLink, EKTA } from '../config/partners';
import { trackAffiliateClick } from '../lib/analytics';
import AffiliateDisclosure from './AffiliateDisclosure';
import { useLang, type Lang } from '../i18n/useLang';

/**
 * Affiliate ad — EKTA (Travelpayouts), travel insurance.
 *
 * Why it fits laplandnightlife: a late night on ice, a snowmobile ride between
 * bars, a slip on a −20 °C street. EKTA sells short-trip cover with any-GEO
 * eligibility (no Nordic-residence wall, per affiliate-links.json), so it works
 * for the whole international audience.
 *
 * Compact single-column card by design, so it reads as a clearly DIFFERENT unit
 * from the two-column flagship ads (Airalo / Welcome Pickups) and is never
 * mistaken for a duplicate when distributed on the same site.
 *
 * Skinned in EKTA's OWN brand (premium_design_standard §6): clean white card,
 * their real deep-indigo wordmark, a mint/teal accent and an indigo CTA.
 *
 * Service advertiser → no product feed; the visual is the real wordmark + a
 * brand-CSS shield, NOT a fabricated photo. Offer hook is evergreen positioning
 * (cover from a single day, medical + baggage, buy in minutes) — no time-limited
 * % shown (would go stale). Note the correct domain is ektatraveling.com.
 *
 * Pure CSS/Tailwind animation only; scroll reveal is progressive enhancement and
 * disabled under prefers-reduced-motion. Required affiliate attributes:
 * target="_blank" rel="sponsored nofollow noopener" — NO `noreferrer`.
 */

/** EKTA brand accents — deep indigo wordmark + mint accent (AA on white). */
const EKTA_INK = '#221B37';
const EKTA_MINT = '#0E9C8A';

export default function TravelInsuranceAd({
  sid = 'tips_travel_insurance',
  className = '',
}: {
  sid?: string;
  className?: string;
}) {
  const lang = useLang();
  const href = ektaLink(sid);

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
    en: 'Travel insurance', fi: 'Matkavakuutus', de: 'Reiseversicherung',
    ja: '旅行保険', es: 'Seguro de viaje', 'pt-BR': 'Seguro de viagem',
    'zh-CN': '旅行保险', ko: '여행자 보험', fr: 'Assurance voyage',
    it: 'Assicurazione di viaggio', nl: 'Reisverzekering',
  });

  const headline = pick({
    en: 'Ice underfoot and long nights out. Cover the trip before you go.',
    fi: 'Jäätä jalkojen alla ja pitkiä iltoja. Vakuuta reissu ennen lähtöä.',
    de: 'Eis unter den Füßen, lange Nächte. Versichere die Reise, bevor du fährst.',
    ja: '足元は氷、夜は長い。出発前に旅をカバーしておこう。',
    es: 'Hielo bajo los pies y noches largas. Asegura el viaje antes de salir.',
    'pt-BR': 'Gelo no chão e noites longas. Garanta a viagem antes de ir.',
    'zh-CN': '脚下是冰,夜晚很长。出发前先把这趟行程保起来。',
    ko: '발밑은 빙판, 밤은 깁니다. 떠나기 전에 여행을 보장해 두세요.',
    fr: 'De la glace sous les pieds, de longues nuits. Assurez le voyage avant de partir.',
    it: 'Ghiaccio sotto i piedi e nottate lunghe. Assicura il viaggio prima di partire.',
    nl: 'IJs onder je voeten en lange nachten. Verzeker de reis voordat je gaat.',
  });

  const sub = pick({
    en: 'EKTA covers short Lapland trips with medical care, baggage and trip hiccups, and you can buy it in a few minutes whatever country you live in. A €40 cocktail is one thing; an A&E visit on a winter slip is another.',
    fi: 'EKTA kattaa lyhyet Lapin-reissut: hoito, matkatavarat ja matkan kommellukset, ja sen voi ostaa parissa minuutissa asuinmaasta riippumatta. 40 euron cocktail on yksi juttu, päivystyskäynti talviliukastumisen jälkeen toinen.',
    de: 'EKTA deckt kurze Lappland-Reisen ab: medizinische Versorgung, Gepäck und Reisepannen, und du kannst sie in wenigen Minuten abschließen, egal in welchem Land du wohnst. Ein 40-Euro-Cocktail ist das eine, ein Notaufnahme-Besuch nach einem Sturz im Winter das andere.',
    ja: 'EKTA は短いラップランド旅行をカバー。医療、手荷物、旅行中のトラブルに対応し、居住国を問わず数分で加入できます。40 ユーロのカクテルと、冬の転倒で救急にかかるのとは話が別です。',
    es: 'EKTA cubre viajes cortos a Laponia con asistencia médica, equipaje e imprevistos, y lo contratas en unos minutos vivas donde vivas. Un cóctel de 40 € es una cosa; ir a urgencias por un resbalón en invierno es otra.',
    'pt-BR': 'A EKTA cobre viagens curtas à Lapônia com assistência médica, bagagem e imprevistos, e você contrata em poucos minutos, não importa em que país mora. Um coquetel de 40 € é uma coisa; ir ao pronto-socorro por um escorregão no inverno é outra.',
    'zh-CN': 'EKTA 为短途拉普兰行程提供医疗、行李和行程意外保障,无论你住在哪个国家,几分钟就能买好。40 欧元的鸡尾酒是一回事,冬天滑倒进急诊又是另一回事。',
    ko: 'EKTA는 짧은 라플란드 여행을 의료, 수하물, 여행 중 사고까지 보장하며, 어느 나라에 살든 몇 분이면 가입할 수 있습니다. 40유로짜리 칵테일과, 겨울에 미끄러져 응급실에 가는 것은 다른 이야기입니다.',
    fr: 'EKTA couvre les courts séjours en Laponie avec soins médicaux, bagages et imprévus, et vous y souscrivez en quelques minutes, quel que soit votre pays de résidence. Un cocktail à 40 € est une chose ; un passage aux urgences après une glissade en hiver en est une autre.',
    it: 'EKTA copre i viaggi brevi in Lapponia con assistenza medica, bagagli e imprevisti, e la sottoscrivi in pochi minuti ovunque tu viva. Un cocktail da 40 € è una cosa; il pronto soccorso dopo una scivolata invernale è un’altra.',
    nl: 'EKTA dekt korte Lapland-reizen met medische zorg, bagage en reistegenslag, en je sluit het in een paar minuten af, in welk land je ook woont. Een cocktail van € 40 is één ding; de spoedeisende hulp na een uitglijder in de winter is een ander.',
  });

  const trust: { icon: typeof Plane; label: string }[] = [
    {
      icon: HeartPulse,
      label: pick({
        en: 'Medical & emergency care',
        fi: 'Hoito ja hätätilanteet',
        de: 'Medizinische & Notfallhilfe',
        ja: '医療・緊急対応',
        es: 'Asistencia médica y urgencias',
        'pt-BR': 'Assistência médica e emergências',
        'zh-CN': '医疗与紧急救助',
        ko: '의료 및 응급 지원',
        fr: 'Soins médicaux et urgences',
        it: 'Cure mediche e urgenze',
        nl: 'Medische & noodhulp',
      }),
    },
    {
      icon: Plane,
      label: pick({
        en: 'Cover from a single day',
        fi: 'Turva yhdestä päivästä alkaen',
        de: 'Schutz ab einem einzigen Tag',
        ja: '1日から加入できる補償',
        es: 'Cobertura desde un solo día',
        'pt-BR': 'Cobertura a partir de um dia',
        'zh-CN': '最短可保一天',
        ko: '단 하루부터 보장',
        fr: 'Couverture dès une seule journée',
        it: 'Copertura anche per un solo giorno',
        nl: 'Dekking vanaf één dag',
      }),
    },
    {
      icon: ShieldPlus,
      label: pick({
        en: 'Buy online in minutes, any country',
        fi: 'Osta verkossa minuuteissa, mistä maasta tahansa',
        de: 'In Minuten online, aus jedem Land',
        ja: 'どの国からでも数分でオンライン購入',
        es: 'Cómpralo online en minutos, desde cualquier país',
        'pt-BR': 'Compre online em minutos, de qualquer país',
        'zh-CN': '任意国家,几分钟在线购买',
        ko: '어느 나라서든 몇 분이면 온라인 가입',
        fr: 'Souscription en ligne en minutes, depuis tout pays',
        it: 'Acquisto online in minuti, da qualsiasi paese',
        nl: 'In minuten online, vanuit elk land',
      }),
    },
  ];

  const cta = pick({
    en: 'Get a quote', fi: 'Katso hinta', de: 'Angebot ansehen', ja: '見積もりを見る',
    es: 'Ver precio', 'pt-BR': 'Ver cotação', 'zh-CN': '获取报价',
    ko: '견적 보기', fr: 'Voir le tarif', it: 'Vedi il preventivo',
    nl: 'Bekijk de prijs',
  });

  const poweredBy = pick({
    en: 'By EKTA', fi: 'Tarjoaa EKTA', de: 'Von EKTA', ja: '提供：EKTA',
    es: 'Por EKTA', 'pt-BR': 'Pela EKTA', 'zh-CN': '由 EKTA 提供',
    ko: 'EKTA 제공', fr: 'Par EKTA', it: 'Di EKTA', nl: 'Door EKTA',
  });

  return (
    <section
      ref={rootRef}
      data-anim={animState}
      className={`ln-ekta-ad group/ad relative overflow-hidden rounded-3xl bg-white text-stone-900 shadow-[0_22px_60px_-30px_rgba(0,0,0,0.6)] ring-1 ring-stone-900/10 ${className}`}
      style={{ borderTop: `4px solid ${EKTA_MINT}` }}
      aria-label={headline}
    >
      <style>{`
        .ln-ekta-ad[data-anim='pending'] .ln-rise { opacity: 0; transform: translateY(14px); }
        .ln-ekta-ad[data-anim='in'] .ln-rise {
          opacity: 1; transform: none;
          transition: opacity .6s ease, transform .6s cubic-bezier(.22,.61,.36,1);
        }
        .ln-ekta-ad[data-anim='in'] .ln-rise-1 { transition-delay: .05s; }
        .ln-ekta-ad[data-anim='in'] .ln-rise-2 { transition-delay: .13s; }
        .ln-ekta-ad[data-anim='in'] .ln-rise-3 { transition-delay: .21s; }

        .ln-ekta-ad[data-anim='pending'] .ln-shield { opacity: 0; transform: scale(.9); }
        .ln-ekta-ad[data-anim='in'] .ln-shield {
          opacity: 1; transform: scale(1);
          transition: opacity .7s ease, transform .8s cubic-bezier(.22,.61,.36,1);
        }
        .ln-ekta-ad[data-anim='in'] .ln-shield { animation: ln-shield-float 5s ease-in-out .8s infinite; }
        @keyframes ln-shield-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

        @media (prefers-reduced-motion: reduce) {
          .ln-ekta-ad .ln-rise,
          .ln-ekta-ad .ln-shield { opacity: 1 !important; transform: none !important; transition: none !important; animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(14,156,138,0.16), transparent)' }}
      />

      <div className="relative p-6 sm:p-8">
        <div className="ln-rise ln-rise-1 mb-5 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span
              className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{ backgroundColor: 'rgba(14,156,138,0.12)', color: EKTA_MINT }}
            >
              {adLabel}
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: EKTA_INK }}>
              {eyebrow}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-3">
            {/* Brand shield + real EKTA wordmark. */}
            <span
              className="ln-shield flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ backgroundColor: 'rgba(14,156,138,0.12)' }}
              aria-hidden="true"
            >
              <ShieldPlus className="h-6 w-6" style={{ color: EKTA_MINT }} />
            </span>
            <img
              src={EKTA.logo}
              alt="EKTA"
              width={92}
              height={28}
              loading="lazy"
              decoding="async"
              className="h-5 w-auto sm:h-6"
            />
          </span>
        </div>

        <h2 className="ln-rise ln-rise-1 mb-3 max-w-2xl text-2xl font-bold leading-tight text-stone-900 sm:text-3xl text-balance">
          {headline}
        </h2>
        <p className="ln-rise ln-rise-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
          {sub}
        </p>

        <ul className="ln-rise ln-rise-2 mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
          {trust.map((t) => (
            <li key={t.label} className="flex items-center gap-2 text-sm text-stone-700">
              <t.icon className="h-4 w-4 shrink-0" style={{ color: EKTA_MINT }} aria-hidden="true" />
              <span>{t.label}</span>
            </li>
          ))}
        </ul>

        <div className="ln-rise ln-rise-3 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={href}
            target="_blank"
            rel="sponsored nofollow noopener"
            onClick={() => trackAffiliateClick(EKTA.slug, `travel_insurance:${sid}`, href)}
            className="group/cta inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-4 font-semibold text-white no-underline shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{ backgroundColor: EKTA_INK, boxShadow: '0 14px 30px -12px rgba(34,27,55,0.5)' }}
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
    </section>
  );
}
