import type { City } from './cities';

/** Sister-LV-site ecosystem cross-links derived per city tag.
 *  Drives the "More in Lapland" section on each city page. */
export interface CrossLink {
  site: string;
  url: string;
  label: string;
  why: string;
  /** Category accent (hex) — same palette as shared EcosystemMenu dots. */
  accent: string;
}

// Category colours mirrored from shared/EcosystemMenu CAT_RGB so the network
// reads colour-coded everywhere, not as a wall of identical dark cards.
export const ACCENT = {
  stay: '#EC4899',      // vibe pink
  activity: '#06B6D4',  // arctic cyan
  food: '#F97316',      // orange
  transport: '#93C5FD', // sky blue
  guide: '#34D399',     // aurora green
  ski: '#38BDF8',       // aurora blue
} as const;

export function getCrossLinks(city: City): CrossLink[] {
  const links: CrossLink[] = [];

  // Ski-resort cities → ski-resort spoke
  if (city.tag === 'Ski resort' || ['levi', 'yllas', 'ruka', 'pyha-luosto', 'saariselka', 'salla'].includes(city.slug)) {
    links.push({
      site: 'LaplandSkiResorts',
      url: 'https://laplandskiresorts.com',
      label: `Ski ${city.name} — slopes, lifts, ski schools`,
      why: 'Slope counts, lift-map, ski-school comparisons.',
      accent: ACCENT.ski,
    });
  }

  // Wilderness / cultural-anchor → nature spoke
  if (city.tag === 'Wilderness premium' || city.tag === 'Cultural anchor' || ['muonio', 'salla', 'pyha-luosto', 'saariselka'].includes(city.slug)) {
    links.push({
      site: 'LaplandNature',
      url: 'https://laplandnature.com',
      label: `${city.name} national-park access`,
      why: 'Hiking routes, wilderness lodges, viewpoint maps.',
      accent: ACCENT.guide,
    });
  }

  // Husky safaris are everywhere — anchor cities especially
  if (['rovaniemi', 'levi', 'saariselka', 'yllas', 'kittila', 'ivalo', 'inari'].includes(city.slug)) {
    links.push({
      site: 'LaplandHuskySafaris',
      url: 'https://laplandhuskysafaris.com',
      label: `Husky safaris near ${city.name}`,
      why: 'Day-tour vs multi-day, beginner vs advanced kennels.',
      accent: ACCENT.activity,
    });
  }

  // Always present:
  links.push(
    {
      site: 'LaplandStays',
      url: 'https://laplandstays.com',
      label: `Where to sleep in ${city.name}`,
      why: 'Hotels, cabins, igloos and wilderness lodges — verified.',
      accent: ACCENT.stay,
    },
    {
      site: 'LaplandTransport',
      url: 'https://laplandtransport.com',
      label: `How to get to ${city.name}`,
      why: 'Airport transfers, train routes, car rental, taxis.',
      accent: ACCENT.transport,
    },
    {
      site: 'LaplandBars',
      url: 'https://laplandbars.com',
      label: `${city.name} bars — cocktails & craft beer`,
      why: 'The bar scene before the late-night clubs open.',
      accent: ACCENT.food,
    }
  );

  return links;
}

/** Adjacent / nearby cities by region + drive time.
 *  Drives the "Nearby in Lapland" section on each city page. */
export const NEARBY: Record<string, string[]> = {
  oulu: ['kemi', 'ruka'],
  rovaniemi: ['kemi', 'levi', 'sodankyla', 'pyha-luosto'],
  levi: ['kittila', 'yllas', 'muonio', 'rovaniemi'],
  saariselka: ['inari', 'ivalo', 'sodankyla'],
  inari: ['ivalo', 'saariselka'],
  kemi: ['rovaniemi', 'oulu'],
  yllas: ['kittila', 'levi', 'muonio'],
  ruka: ['oulu', 'rovaniemi'],
  'pyha-luosto': ['sodankyla', 'rovaniemi'],
  sodankyla: ['pyha-luosto', 'rovaniemi', 'saariselka'],
  kittila: ['levi', 'yllas', 'muonio'],
  ivalo: ['saariselka', 'inari'],
  muonio: ['yllas', 'levi', 'kittila'],
  salla: ['ruka'],
};
