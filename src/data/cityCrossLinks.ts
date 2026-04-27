import type { City } from './cities';

/** Sister-LV-site ecosystem cross-links derived per city tag.
 *  Drives the "More in Lapland" section on each city page. */
export interface CrossLink {
  site: string;
  url: string;
  label: string;
  why: string;
}

export function getCrossLinks(city: City): CrossLink[] {
  const links: CrossLink[] = [];

  // Ski-resort cities → ski-resort spoke
  if (city.tag === 'Ski resort' || ['levi', 'yllas', 'ruka', 'pyha-luosto', 'saariselka', 'salla'].includes(city.slug)) {
    links.push({
      site: 'LaplandSkiResorts',
      url: 'https://laplandskiresorts.com',
      label: `Ski ${city.name} — slopes, lifts, ski schools`,
      why: 'Slope counts, lift-map, ski-school comparisons.',
    });
  }

  // Wilderness / cultural-anchor → nature spoke
  if (city.tag === 'Wilderness premium' || city.tag === 'Cultural anchor' || ['muonio', 'salla', 'pyha-luosto', 'saariselka'].includes(city.slug)) {
    links.push({
      site: 'LaplandNature',
      url: 'https://laplandnature.com',
      label: `${city.name} national-park access`,
      why: 'Hiking routes, wilderness lodges, viewpoint maps.',
    });
  }

  // Husky safaris are everywhere — anchor cities especially
  if (['rovaniemi', 'levi', 'saariselka', 'yllas', 'kittila', 'ivalo', 'inari'].includes(city.slug)) {
    links.push({
      site: 'LaplandHuskySafaris',
      url: 'https://laplandhuskysafaris.com',
      label: `Husky safaris near ${city.name}`,
      why: 'Day-tour vs multi-day, beginner vs advanced kennels.',
    });
  }

  // Always present:
  links.push(
    {
      site: 'LaplandStays',
      url: 'https://laplandstays.com',
      label: `Where to sleep in ${city.name}`,
      why: 'Hotels, cabins, igloos and wilderness lodges — verified.',
    },
    {
      site: 'LaplandTransport',
      url: 'https://laplandtransport.com',
      label: `How to get to ${city.name}`,
      why: 'Airport transfers, train routes, car rental, taxis.',
    },
    {
      site: 'LaplandBars',
      url: 'https://laplandbars.com',
      label: `${city.name} bars — cocktails & craft beer`,
      why: 'The bar scene before the late-night clubs open.',
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
