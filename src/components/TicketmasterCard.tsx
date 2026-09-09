import { ArrowRight } from 'lucide-react';
import { useLang } from '../i18n/useLang';
import type { Lang } from '../i18n/useLang';

/**
 * Lipunmyynnin tunnistettava nosto.
 *
 * Vesa 2026-09-09: *"ticketmaster pitää olla ihan heidän logollaan ja
 * väreillään, suomalainen varsinkin tunnistaa, ja sivun yläosaan tottakai"*
 * — ja *"ja etusivulle"*.
 *
 * 🔴 **Logo on kumppanin omasta lähteestä**, ei kaavittu eikä piirretty:
 * `uk.tmconst.com/rc-4a6613e5/images/logo/ticketmaster_black.svg`, Ticketmasterin
 * oma CDN. Valkoista varianttia ei ollut saatavilla (403), joten logoa EI
 * väritetä uudelleen — se saa **valkoisen laatan**, mikä on CLAUDE.md:n
 * dokumentoitu ratkaisu tummalle pinnalle ja samalla Ticketmasterin oma
 * esitystapa. Logon muuttaminen olisi sääntörikko.
 *
 * 🔴 **Brändiväriä ei arvattu.** Sääntö: väri mitataan logosta. Haettu tiedosto
 * on yksivärinen musta, joten mitattavaa sävyä ei ole — kortti käyttää sivuston
 * omaa tummaa pohjaa ja valkoista laattaa, ei keksittyä sinistä.
 *
 * 🔴🔴 **Lukijapalvelu, ei tuotto-odotus.** CLAUDE.md: Ticketmaster on
 * dokumentoitu poikkeus, koska Travelpayouts sallii vain valmiin linkin
 * (`Ticketmaster FI: Main Page`) — yksittäiseen tapahtumaan ei voi linkittää.
 * Palkkio on 0,40 € / myynti. Siksi teksti kertoo MIHIN linkki vie eikä lupaa
 * lippua tiettyyn tapahtumaan, ja tämä kuuluu vain tapahtumapinnalle.
 */

const COPY: Record<Lang, { eyebrow: string; h: string; body: string; cta: string }> = {
  en: { eyebrow: 'Where the tickets are', h: 'Finland’s arena and festival tickets', body: 'Most nationwide arena and festival sales run through Ticketmaster Finland. Search by the event name — smaller festivals often sell direct, so check their own page first.', cta: 'Open Ticketmaster Finland' },
  fi: { eyebrow: 'Mistä liput ostetaan', h: 'Suomen areena- ja festivaaliliput', body: 'Valtakunnallinen areena- ja festivaalimyynti kulkee pitkälti Ticketmaster Suomen kautta. Haku toimii tapahtuman nimellä — pienemmät festivaalit myyvät usein suoraan, joten tarkista ensin niiden oma sivu.', cta: 'Avaa Ticketmaster Suomi' },
  de: { eyebrow: 'Wo es die Tickets gibt', h: 'Arena- und Festivaltickets in Finnland', body: 'Der landesweite Arena- und Festivalverkauf läuft weitgehend über Ticketmaster Finnland. Die Suche funktioniert über den Veranstaltungsnamen — kleinere Festivals verkaufen oft direkt.', cta: 'Ticketmaster Finnland öffnen' },
  ja: { eyebrow: 'チケットの購入先', h: 'フィンランドのアリーナ・フェス チケット', body: '全国規模のアリーナ公演やフェスの販売は、主にTicketmaster Finlandを通ります。検索はイベント名で。小規模フェスは直販が多いので、まず公式ページをご確認ください。', cta: 'Ticketmaster Finlandを開く' },
  es: { eyebrow: 'Dónde están las entradas', h: 'Entradas de arenas y festivales en Finlandia', body: 'La venta nacional de arenas y festivales pasa en gran parte por Ticketmaster Finlandia. La búsqueda funciona por el nombre del evento; los festivales pequeños suelen vender directamente.', cta: 'Abrir Ticketmaster Finlandia' },
  'pt-BR': { eyebrow: 'Onde ficam os ingressos', h: 'Ingressos de arenas e festivais na Finlândia', body: 'A venda nacional de arenas e festivais passa em boa parte pelo Ticketmaster Finlândia. A busca funciona pelo nome do evento; festivais menores costumam vender direto.', cta: 'Abrir Ticketmaster Finlândia' },
  'zh-CN': { eyebrow: '在哪里买票', h: '芬兰场馆与音乐节门票', body: '全国性场馆演出和音乐节的售票大多经由 Ticketmaster Finland。按活动名称搜索即可；小型音乐节通常自行售票，建议先看它们的官网。', cta: '打开 Ticketmaster Finland' },
  ko: { eyebrow: '티켓은 어디에서', h: '핀란드 아레나·페스티벌 티켓', body: '전국 규모 아레나 공연과 페스티벌 판매는 대부분 Ticketmaster Finland를 거칩니다. 검색은 행사 이름으로. 소규모 페스티벌은 직접 판매하는 경우가 많습니다.', cta: 'Ticketmaster Finland 열기' },
  fr: { eyebrow: 'Où sont les billets', h: 'Billets d’arénas et de festivals en Finlande', body: 'La vente nationale pour les arénas et les festivals passe surtout par Ticketmaster Finlande. La recherche se fait par le nom de l’événement ; les petits festivals vendent souvent en direct.', cta: 'Ouvrir Ticketmaster Finlande' },
  it: { eyebrow: 'Dove sono i biglietti', h: 'Biglietti per arene e festival in Finlandia', body: 'La vendita nazionale per arene e festival passa in gran parte da Ticketmaster Finlandia. La ricerca funziona con il nome dell’evento; i festival più piccoli vendono spesso in proprio.', cta: 'Apra Ticketmaster Finlandia' },
  nl: { eyebrow: 'Waar de kaarten zijn', h: 'Arena- en festivalkaarten in Finland', body: 'De landelijke arena- en festivalverkoop loopt grotendeels via Ticketmaster Finland. Zoeken gaat op de naam van het evenement; kleinere festivals verkopen vaak rechtstreeks.', cta: 'Ticketmaster Finland openen' },
  sv: { eyebrow: 'Var biljetterna finns', h: 'Arena- och festivalbiljetter i Finland', body: 'Den rikstäckande arena- och festivalförsäljningen går till stor del via Ticketmaster Finland. Sökningen fungerar på evenemangets namn; mindre festivaler säljer ofta direkt.', cta: 'Öppna Ticketmaster Finland' },
};

export default function TicketmasterCard({ sid, compact = false }: { sid: string; compact?: boolean }) {
  const lang = useLang();
  const t = COPY[lang];
  return (
    <div className="overflow-hidden rounded-2xl border border-cream/30 bg-night-light/60 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-cream/10">
      <div className="flex flex-col gap-5 p-5 sm:p-6 sm:flex-row sm:items-center sm:gap-7">
        {/* 🔴 Valkoinen laatta, koska haettu logo on musta eikä sitä väritetä. */}
        <div className="shrink-0 self-start rounded-xl bg-white px-4 py-3 sm:px-5 sm:py-4">
          <img
            src="/images/partners/ticketmaster/ticketmaster-black.svg"
            alt="Ticketmaster"
            width={176}
            height={25}
            loading="lazy"
            className="h-5 w-auto sm:h-6"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-pink font-bold mb-1.5">{t.eyebrow}</p>
          <h2 className="font-heading text-xl sm:text-2xl text-white tracking-wide leading-tight mb-2">{t.h}</h2>
          {!compact && <p className="text-sm text-white/70 leading-relaxed mb-4 max-w-2xl">{t.body}</p>}
          <a
            href={`https://go.laplandvibes.com/go/ticketmaster?sid=${sid}`}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-night transition-transform hover:-translate-y-0.5"
          >
            {t.cta} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
