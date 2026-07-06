import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Car, ShieldCheck, Clock } from 'lucide-react';
import { welcomePickupsLink, WELCOME_PICKUPS } from '../config/partners';
import { trackAffiliateClick } from '../lib/analytics';
import AffiliateDisclosure from './AffiliateDisclosure';
import { useLang, type Lang } from '../i18n/useLang';

/**
 * Affiliate ad — Welcome Pickups (Travelpayouts), private airport transfers.
 *
 * Why it fits laplandnightlife: a night out in Lapland usually starts and ends
 * with a transfer. There is no late taxi rank at a small northern airport at
 * −20 °C, and the ride back to the hotel at 03:00 matters. A pre-booked driver
 * who meets you at arrivals (and a fixed price agreed up front) is the practical
 * answer. Angle: "land and go straight into town; get home safely after."
 *
 * Skinned in WELCOME PICKUPS' OWN brand (premium_design_standard §6): a clean
 * white card, their real green mark, their bright teal-green accent and a green
 * CTA, framed as a distinct partner unit on the dark page.
 *
 * Service advertiser → no product feed. Per affiliate_ad_creative_process §4 the
 * visual is the real logo + a tasteful brand-CSS "arrivals pickup" stage (a
 * driver pin meeting a marker), NOT a fabricated photo.
 *
 * Offer hook: evergreen only — meet-and-greet at arrivals, fixed price agreed in
 * advance, English-speaking drivers. No time-limited % (would go stale).
 *
 * Pure CSS/Tailwind animation only; scroll reveal is progressive enhancement
 * (always visible pre-JS) and disabled under prefers-reduced-motion.
 *
 * Required affiliate attributes (LV spec): target="_blank"
 * rel="sponsored nofollow noopener" — NO `noreferrer`.
 */

/** Welcome Pickups brand accents — bright green + a deeper green for AA text/CTA. */
const WP_GREEN = '#00D6A0';
const WP_DEEP = '#067A5E';

export default function AirportRideAd({
  sid = 'nightclubs_airport_ride',
  className = '',
}: {
  sid?: string;
  className?: string;
}) {
  const lang = useLang();
  const href = welcomePickupsLink(sid);

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
    en: 'Airport transfer', fi: 'Lentokenttäkuljetus', de: 'Flughafentransfer',
    ja: '空港送迎', es: 'Traslado del aeropuerto', 'pt-BR': 'Traslado do aeroporto',
    'zh-CN': '机场接送', ko: '공항 픽업', fr: 'Transfert aéroport',
    it: 'Transfer aeroporto', nl: 'Luchthaventransfer',
  });

  const headline = pick({
    en: 'Skip the taxi queue at −20 °C. Book a driver who meets you at arrivals and takes you into town.',
    fi: 'Ohita taksijono –20 °C:ssa. Varaa kuljettaja, joka ottaa sinut vastaan saapumisaulassa ja vie keskustaan.',
    de: 'Spar dir die Taxischlange bei −20 °C. Buch einen Fahrer, der dich an der Ankunft abholt und in die Stadt bringt.',
    ja: '−20 °C のタクシー待ちはもう不要。到着ロビーで出迎えて街まで送ってくれるドライバーを予約。',
    es: 'Evita la cola del taxi a −20 °C. Reserva un conductor que te recibe en llegadas y te lleva al centro.',
    'pt-BR': 'Pule a fila de táxi a −20 °C. Reserve um motorista que recebe você no desembarque e leva ao centro.',
    'zh-CN': '−20 °C 不用再排队等出租车。预订一位在到达口接你、直接送进城的司机。',
    ko: '−20 °C에서 택시 줄은 그만. 도착장에서 맞아 시내까지 데려다주는 기사를 예약하세요.',
    fr: 'Évitez la file de taxis à −20 °C. Réservez un chauffeur qui vous accueille à l’arrivée et vous emmène en ville.',
    it: 'Salta la fila dei taxi a −20 °C. Prenota un autista che ti accoglie agli arrivi e ti porta in centro.',
    nl: 'Sla de taxirij over bij −20 °C. Boek een chauffeur die je opwacht bij aankomst en naar de stad brengt.',
  });

  const sub = pick({
    en: 'Welcome Pickups meet you by name in arrivals with the price agreed in advance, so there is no haggling and no surprise meter on the way in. The same fixed-price ride gets you home after the night, which beats waiting outside a club at 3am in the cold.',
    fi: 'Welcome Pickups ottaa sinut vastaan nimikyltillä saapumisaulassa, hinta sovittuna etukäteen, joten ei tinkimistä eikä yllätysmittaria matkalla. Sama kiinteähintainen kyyti vie kotiin yön jälkeen, mikä on parempi kuin seistä klubin edessä kolmelta pakkasessa.',
    de: 'Welcome Pickups empfangen dich mit Namensschild an der Ankunft, der Preis ist vorab vereinbart, also kein Feilschen und kein Überraschungs-Taxameter. Dieselbe Festpreisfahrt bringt dich nach der Nacht heim, besser als um 3 Uhr in der Kälte vor dem Club zu warten.',
    ja: 'Welcome Pickups は到着ロビーで名前のボードを持って出迎え、料金は事前確定。値段交渉も、行きの不安なメーターもありません。同じ定額の送迎が夜遊びのあと家まで運んでくれるので、深夜3時に寒い club の外で待つより安心です。',
    es: 'Welcome Pickups te recibe con tu nombre en llegadas y con el precio acordado de antemano, así que no hay regateos ni taxímetro sorpresa de camino. El mismo viaje a precio fijo te lleva a casa después de la noche, mejor que esperar fuera del club a las 3 de la madrugada con frío.',
    'pt-BR': 'A Welcome Pickups recebe você com o nome no desembarque e o preço combinado antes, então não há pechincha nem taxímetro surpresa na ida. A mesma corrida de preço fixo leva você para casa depois da noite, melhor do que esperar na porta da balada às 3h no frio.',
    'zh-CN': 'Welcome Pickups 会在到达口举牌接你,价格事先谈好,去程不用讲价、也没有意外跳表。同一趟固定价格的车在夜场结束后送你回住处,总比凌晨三点在寒风里等在 club 门口强。',
    ko: 'Welcome Pickups는 도착장에서 이름표를 들고 맞이하며 요금은 미리 정해져 있어, 흥정도 가는 길의 깜짝 미터기도 없습니다. 같은 정액 차량이 밤이 끝난 뒤 숙소까지 데려다주니, 새벽 3시에 추운 클럽 앞에서 기다리는 것보다 낫습니다.',
    fr: 'Welcome Pickups vous accueille avec votre nom à l’arrivée, prix convenu à l’avance, donc pas de marchandage ni de compteur surprise à l’aller. La même course à prix fixe vous ramène après la soirée, mieux que d’attendre devant un club à 3 h dans le froid.',
    it: 'Welcome Pickups ti accoglie con il tuo nome agli arrivi e con il prezzo concordato in anticipo, quindi niente contrattazioni né tassametro a sorpresa all’andata. La stessa corsa a prezzo fisso ti riporta a casa dopo la serata, meglio che aspettare fuori da un club alle 3 al freddo.',
    nl: 'Welcome Pickups ontvangt je met je naam bij aankomst, prijs vooraf afgesproken, dus geen gemarchandeer en geen verrassingsmeter op de heenweg. Diezelfde rit voor een vaste prijs brengt je na de nacht thuis, beter dan om 3 uur in de kou voor een club staan.',
  });

  const trust: { icon: typeof Car; label: string }[] = [
    {
      icon: ShieldCheck,
      label: pick({
        en: 'Fixed price agreed in advance',
        fi: 'Kiinteä hinta sovittu etukäteen',
        de: 'Festpreis vorab vereinbart',
        ja: '料金は事前確定',
        es: 'Precio fijo acordado de antemano',
        'pt-BR': 'Preço fixo combinado antes',
        'zh-CN': '价格事先谈好,固定不变',
        ko: '사전 확정 고정 요금',
        fr: 'Prix fixe convenu à l’avance',
        it: 'Prezzo fisso concordato prima',
        nl: 'Vaste prijs vooraf afgesproken',
      }),
    },
    {
      icon: Car,
      label: pick({
        en: 'Driver meets you at arrivals',
        fi: 'Kuljettaja vastassa aulassa',
        de: 'Fahrer empfängt dich am Gate',
        ja: 'ドライバーが到着口で出迎え',
        es: 'El conductor te espera en llegadas',
        'pt-BR': 'Motorista espera no desembarque',
        'zh-CN': '司机在到达口接你',
        ko: '기사가 도착장에서 대기',
        fr: 'Chauffeur présent à l’arrivée',
        it: 'Autista ti aspetta agli arrivi',
        nl: 'Chauffeur staat klaar bij aankomst',
      }),
    },
    {
      icon: Clock,
      label: pick({
        en: 'Tracks your flight, waits if late',
        fi: 'Seuraa lentoa, odottaa jos myöhässä',
        de: 'Verfolgt deinen Flug, wartet bei Verspätung',
        ja: 'フライトを追跡、遅延時も待機',
        es: 'Sigue tu vuelo y espera si hay retraso',
        'pt-BR': 'Acompanha seu voo e espera se atrasar',
        'zh-CN': '追踪航班,延误也会等',
        ko: '항공편 추적, 지연 시 대기',
        fr: 'Suit votre vol, attend en cas de retard',
        it: 'Monitora il volo, aspetta se in ritardo',
        nl: 'Volgt je vlucht, wacht bij vertraging',
      }),
    },
  ];

  const cta = pick({
    en: 'Book a transfer', fi: 'Varaa kuljetus', de: 'Transfer buchen',
    ja: '送迎を予約', es: 'Reservar traslado', 'pt-BR': 'Reservar traslado',
    'zh-CN': '预订接送', ko: '픽업 예약', fr: 'Réserver un transfert',
    it: 'Prenota un transfer', nl: 'Transfer boeken',
  });

  const poweredBy = pick({
    en: 'By Welcome Pickups', fi: 'Tarjoaa Welcome Pickups', de: 'Von Welcome Pickups',
    ja: '提供：Welcome Pickups', es: 'Por Welcome Pickups', 'pt-BR': 'Pela Welcome Pickups',
    'zh-CN': '由 Welcome Pickups 提供', ko: 'Welcome Pickups 제공', fr: 'Par Welcome Pickups',
    it: 'Di Welcome Pickups', nl: 'Door Welcome Pickups',
  });

  const chip = pick({
    en: 'English-speaking local drivers',
    fi: 'Englantia puhuvat paikalliskuljettajat',
    de: 'Englischsprachige Fahrer vor Ort',
    ja: '英語が話せる地元ドライバー',
    es: 'Conductores locales que hablan inglés',
    'pt-BR': 'Motoristas locais que falam inglês',
    'zh-CN': '会说英语的本地司机',
    ko: '영어 가능한 현지 기사',
    fr: 'Chauffeurs locaux anglophones',
    it: 'Autisti locali che parlano inglese',
    nl: 'Engelssprekende lokale chauffeurs',
  });

  return (
    <section
      ref={rootRef}
      data-anim={animState}
      className={`ln-wp-ad group/ad relative overflow-hidden rounded-3xl bg-white text-stone-900 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.6)] ring-1 ring-stone-900/10 ${className}`}
      style={{ borderTop: `4px solid ${WP_GREEN}` }}
      aria-label={headline}
    >
      <style>{`
        .ln-wp-ad[data-anim='pending'] .ln-rise { opacity: 0; transform: translateY(14px); }
        .ln-wp-ad[data-anim='in'] .ln-rise {
          opacity: 1; transform: none;
          transition: opacity .6s ease, transform .6s cubic-bezier(.22,.61,.36,1);
        }
        .ln-wp-ad[data-anim='in'] .ln-rise-1 { transition-delay: .05s; }
        .ln-wp-ad[data-anim='in'] .ln-rise-2 { transition-delay: .13s; }
        .ln-wp-ad[data-anim='in'] .ln-rise-3 { transition-delay: .21s; }

        .ln-wp-ad[data-anim='pending'] .ln-stage { opacity: 0; transform: scale(.94); }
        .ln-wp-ad[data-anim='in'] .ln-stage {
          opacity: 1; transform: scale(1);
          transition: opacity .7s ease, transform .9s cubic-bezier(.22,.61,.36,1);
        }

        /* A car badge sliding gently toward the meeting pin. */
        .ln-wp-ad[data-anim='in'] .ln-car { animation: ln-drive 4.5s ease-in-out infinite; }
        @keyframes ln-drive {
          0%,100% { transform: translateX(-10px); }
          50%     { transform: translateX(10px); }
        }
        /* Pin bob. */
        .ln-wp-ad[data-anim='in'] .ln-pin { animation: ln-bob 3s ease-in-out infinite; }
        @keyframes ln-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        /* Dashed route draw. */
        .ln-wp-ad .ln-route { stroke-dasharray: 6 7; stroke-dashoffset: 0; }
        .ln-wp-ad[data-anim='in'] .ln-route { animation: ln-dash 1.6s linear infinite; }
        @keyframes ln-dash { to { stroke-dashoffset: -26; } }

        @media (prefers-reduced-motion: reduce) {
          .ln-wp-ad .ln-rise,
          .ln-wp-ad .ln-stage { opacity: 1 !important; transform: none !important; transition: none !important; }
          .ln-wp-ad .ln-car,
          .ln-wp-ad .ln-pin,
          .ln-wp-ad .ln-route { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(0,214,160,0.20), transparent)' }}
      />

      <div className="relative grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
        {/* ── Copy column ─────────────────────────────────────────────── */}
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="ln-rise ln-rise-1 mb-5 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <span
                className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
                style={{ backgroundColor: 'rgba(6,122,94,0.10)', color: WP_DEEP }}
              >
                {adLabel}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: WP_DEEP }}>
                {eyebrow}
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-2">
              <img
                src={WELCOME_PICKUPS.logo}
                alt=""
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
              <span className="text-base font-bold leading-tight tracking-tight text-stone-900 sm:text-lg">
                Welcome
                <br className="hidden sm:block" /> Pickups
              </span>
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
                <t.icon className="h-4 w-4 shrink-0" style={{ color: WP_DEEP }} aria-hidden="true" />
                <span>{t.label}</span>
              </li>
            ))}
          </ul>

          <div
            className="ln-rise ln-rise-3 mt-6 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: 'rgba(0,214,160,0.16)', color: WP_DEEP }}
          >
            <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{chip}</span>
          </div>

          <div className="ln-rise ln-rise-3 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={href}
              target="_blank"
              rel="sponsored nofollow noopener"
              onClick={() => trackAffiliateClick(WELCOME_PICKUPS.slug, `airport_ride:${sid}`, href)}
              className="group/cta inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-4 font-semibold text-white no-underline shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: WP_DEEP, boxShadow: '0 14px 30px -12px rgba(6,122,94,0.5)' }}
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

        {/* ── Brand visual stage (arrivals pickup, no fake photo) ──────── */}
        <div
          className="relative min-h-[18rem] overflow-hidden lg:min-h-full"
          style={{ background: 'linear-gradient(155deg, #E2FBF2 0%, #C2F4E3 55%, #A6ECD6 100%)' }}
          aria-hidden="true"
        >
          <div className="ln-stage relative flex h-full w-full items-center justify-center p-8">
            <div className="relative h-40 w-full max-w-[18rem]">
              {/* Dashed route between car and pin */}
              <svg viewBox="0 0 240 80" className="absolute inset-x-0 top-1/2 -translate-y-1/2" aria-hidden="true">
                <path
                  className="ln-route"
                  d="M40 40 H200"
                  fill="none"
                  stroke={WP_DEEP}
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </svg>
              {/* Car badge (left, slides) */}
              <div className="ln-car absolute left-0 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-[0_14px_36px_-12px_rgba(6,122,94,0.55)] ring-1 ring-white/70">
                <Car className="h-8 w-8" style={{ color: WP_DEEP }} aria-hidden="true" />
              </div>
              {/* Meeting pin (right, bobs) — Welcome Pickups mark */}
              <div className="ln-pin absolute right-0 top-1/2 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_16px_40px_-12px_rgba(6,122,94,0.6)] ring-1 ring-white/70">
                <img
                  src={WELCOME_PICKUPS.logo}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-11"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
