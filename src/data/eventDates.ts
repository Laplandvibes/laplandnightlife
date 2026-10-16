import type { Lang } from '../i18n/useLang';

/* Kalenterin päivämäärät muotoillaan tästä, ei kirjoiteta käsin kahteentoista kieleen.
 *
 * Ennen jokainen tapahtuma kantoi 12 käsin kirjoitettua päivämäärää, ja niiden ainoa
 * yhteys koneluettavaan päivään oli EN-listan `endsBy` indeksin kautta. Nyt tapahtumalla
 * on yksi ISO-päivä (alku, loppu) ja jokainen kieli saa saman päivän omassa muodossaan.
 * Muodot ovat ne, jotka natiivitarkastus hyväksyi 28.9.2026 (fi "22.–24.1.2027",
 * de "22.–24. Jan 2027", ja "2027年1月22〜24日", zh "2027 年 1 月 22–24 日" …). */

const SHORT: Record<'en' | 'de' | 'it' | 'fr' | 'es' | 'pt-BR' | 'nl' | 'sv', string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  de: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  it: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'],
  'pt-BR': ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  nl: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  sv: ['jan', 'feb', 'mars', 'apr', 'maj', 'juni', 'juli', 'aug', 'sep', 'okt', 'nov', 'dec'],
};

type Ymd = { y: number; m: number; d: number };

function parse(iso: string): Ymd {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m, d };
}

/** Päivä tai jakso lukijan kielellä. `endIso` puuttuu = yksi päivä. */
export function formatDays(lang: Lang, startIso: string, endIso?: string): string {
  const a = parse(startIso);
  const b = parse(endIso ?? startIso);
  const one = a.y === b.y && a.m === b.m && a.d === b.d;
  const sameMonth = a.y === b.y && a.m === b.m;
  const sameYear = a.y === b.y;

  switch (lang) {
    case 'fi':
      if (one) return `${a.d}.${a.m}.${a.y}`;
      if (sameMonth) return `${a.d}.–${b.d}.${b.m}.${b.y}`;
      if (sameYear) return `${a.d}.${a.m}.–${b.d}.${b.m}.${b.y}`;
      return `${a.d}.${a.m}.${a.y}–${b.d}.${b.m}.${b.y}`;
    case 'ja':
      if (one) return `${a.y}年${a.m}月${a.d}日`;
      if (sameMonth) return `${a.y}年${a.m}月${a.d}〜${b.d}日`;
      if (sameYear) return `${a.y}年${a.m}月${a.d}日〜${b.m}月${b.d}日`;
      return `${a.y}年${a.m}月${a.d}日〜${b.y}年${b.m}月${b.d}日`;
    case 'zh-CN':
      if (one) return `${a.y} 年 ${a.m} 月 ${a.d} 日`;
      if (sameMonth) return `${a.y} 年 ${a.m} 月 ${a.d}–${b.d} 日`;
      if (sameYear) return `${a.y} 年 ${a.m} 月 ${a.d} 日 – ${b.m} 月 ${b.d} 日`;
      return `${a.y} 年 ${a.m} 月 ${a.d} 日 – ${b.y} 年 ${b.m} 月 ${b.d} 日`;
    case 'ko':
      if (one) return `${a.y}년 ${a.m}월 ${a.d}일`;
      if (sameMonth) return `${a.y}년 ${a.m}월 ${a.d}–${b.d}일`;
      if (sameYear) return `${a.y}년 ${a.m}월 ${a.d}일 – ${b.m}월 ${b.d}일`;
      return `${a.y}년 ${a.m}월 ${a.d}일 – ${b.y}년 ${b.m}월 ${b.d}일`;
    case 'en': {
      const M = SHORT.en;
      if (one) return `${M[a.m - 1]} ${a.d}, ${a.y}`;
      if (sameMonth) return `${M[a.m - 1]} ${a.d}–${b.d}, ${b.y}`;
      if (sameYear) return `${M[a.m - 1]} ${a.d} – ${M[b.m - 1]} ${b.d}, ${b.y}`;
      return `${M[a.m - 1]} ${a.d}, ${a.y} – ${M[b.m - 1]} ${b.d}, ${b.y}`;
    }
    case 'de': {
      const M = SHORT.de;
      if (one) return `${a.d}. ${M[a.m - 1]} ${a.y}`;
      if (sameMonth) return `${a.d}.–${b.d}. ${M[b.m - 1]} ${b.y}`;
      if (sameYear) return `${a.d}. ${M[a.m - 1]} – ${b.d}. ${M[b.m - 1]} ${b.y}`;
      return `${a.d}. ${M[a.m - 1]} ${a.y} – ${b.d}. ${M[b.m - 1]} ${b.y}`;
    }
    default: {
      // it, fr, es, pt-BR, nl, sv: päivä ennen kuukautta; es ja pt-BR liittävät vuoden "de":llä.
      const M = SHORT[lang];
      const yr = (y: number) => (lang === 'es' || lang === 'pt-BR' ? `de ${y}` : `${y}`);
      // Ranskassa kuun ensimmäinen päivä on järjestysluku: 1er.
      const day = (d: number) => (lang === 'fr' && d === 1 ? '1er' : String(d));
      if (one) return `${day(a.d)} ${M[a.m - 1]} ${yr(a.y)}`;
      if (sameMonth) return `${day(a.d)}–${b.d} ${M[b.m - 1]} ${yr(b.y)}`;
      if (sameYear) return `${day(a.d)} ${M[a.m - 1]} – ${day(b.d)} ${M[b.m - 1]} ${yr(b.y)}`;
      return `${day(a.d)} ${M[a.m - 1]} ${yr(a.y)} – ${day(b.d)} ${M[b.m - 1]} ${yr(b.y)}`;
    }
  }
}

/** Nimiön ja arvon erotin ("Viimeksi: 28.2.2026"): ja ja zh käyttävät täysleveää kaksoispistettä. */
export function labelSep(lang: Lang): string {
  return lang === 'ja' || lang === 'zh-CN' ? '：' : ': ';
}
