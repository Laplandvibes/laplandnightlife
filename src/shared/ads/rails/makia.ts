import { Anchor } from 'lucide-react'
import type { RailPartner } from '../ProductRail'

// Makia — Adtraction. Copy follows the COPY RULES in ProductRail.tsx:
// one-clause headline, one-sentence sub, and nothing claimed that the feed
// or the advertiser's own page does not support. Finnish and English only —
// the rail renders nothing in a locale it has no copy for, which is the
// honest outcome for a Finland-market shop.
const makia: RailPartner = {
  key: 'makia',
  categoryUrl: "https://makia.com/fi/",
  accent: '#1B2A3A',
  accentDark: '#9FB3C8',
  icon: Anchor,
  copy: {
    fi: {
      eyebrow: "Makia",
      headline: "Helsinkiläistä arkivaatetta",
      sub: "Paitatakkeja, t-paitoja ja housuja miehille ja naisille.",
      from: 'alk.',
      ctaAll: "Katso koko valikoima",
      note: "Hinnat tarkistettu {date}. Ajantasainen hinta ja koot näkyvät Makiain sivulla.",
    },
    en: {
      eyebrow: "Makia",
      headline: "Everyday clothing from Helsinki",
      sub: "Overshirts, tees and trousers for men and women.",
      from: 'from',
      ctaAll: "See the full range",
      note: "Prices checked {date}. Current price and sizes are shown on Makia’s own page.",
    },
  },
}

export default makia
