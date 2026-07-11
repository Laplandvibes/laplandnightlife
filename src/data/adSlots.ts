/**
 * Mainospaikkojen data — laplandnightlife (LV Media -inventaari).
 *
 * Myyntiprosessi:
 *   1. Kumppani ostaa mainospaikan (LV Media -portaali → lasku → lv_bookings)
 *   2. Agentti täyttää sopivan paikan tässä tiedostossa Partner-objektilla
 *   3. `npm run build` + deploy → kortti/banneri ilmestyy sivulle
 *
 * Tyhjä paikka (null) renderöi house-adin ("Haluatko mainoksesi tähän?")
 * joka linkittää LV Media -portaaliin:
 *   https://laplandvibes.com/media/site/laplandnightlife
 *
 * Esimerkki täytetystä pääkumppanipaikasta:
 *   sponsors: [
 *     { name: 'Roy Club', tagline: 'Rovaniemen legendaarisin yökerho', url: 'https://...' },
 *     null,
 *   ],
 */

import type { HomeAdSlotsConfig } from '../shared/HomeAdSlots';
import { DEFAULT_PREMIUM_SPOTS } from '../shared/PremiumSpotGrid';

export const AD_SLOTS: HomeAdSlotsConfig = {
  siteSlug: 'laplandnightlife',
  // [0] = pääkumppani (banneri heron alla), [1] = kakkospääkumppani (osion kortti)
  sponsors: [null, null],
  // 6 kohdekohtaista premium-paikkaa (Rovaniemi, Levi, Ylläs, Saariselkä, Kittilä, Inari)
  spots: DEFAULT_PREMIUM_SPOTS,
};
