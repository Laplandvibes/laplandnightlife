import { useLang } from '../i18n/useLang';
import type { Lang } from '../i18n/useLang';

/**
 * Hiljainen merkintä siitä, ettei kuva ole valokuva.
 *
 * Vesa 2026-09-09: *"merkkaan sitten pienenpienellä kuvituskuva vasempaan
 * alareunaan kuville jotka ei ole aitoja, siten että melkein vaan näkyy."*
 *
 * 🔴 **Tarkoitus on rehellisyys, ei varoitus.** Merkintä kertoo lukijalle mitä
 * hän katsoo, muttei kilpaile kuvan kanssa: 9 px, 25 % valkoista, vasen alanurkka.
 * Jos se alkaa näkyä, se on liian iso — ei toisin päin.
 *
 * 🔴 **Ei pidä sekoittaa EU:n AI Act art. 50:een.** Se koskee vain sisältöä joka
 * jäljittelee todellisia henkilöitä tai tapahtumia (deepfake); verkoston
 * kuvituskuvat eivät kuulu sen piiriin (auditoitu 8.8.2026, 25/37 pintaa
 * rajattiin ulos). Tämä on siis **vapaaehtoinen** merkintä — ja juuri siksi se
 * saa olla hillitty.
 *
 * 🔴 Käytä VAIN generoidulle kuvitukselle. Aidon valokuvan päälle tämä olisi
 * väärä väite — LV:n omat reissukuvat ja kumppanin omat tiedostot eivät saa tätä.
 */

const LABEL: Record<Lang, string> = {
  en: 'Illustration',
  fi: 'Kuvituskuva',
  de: 'Illustration',
  ja: 'イメージ画像',
  es: 'Ilustración',
  'pt-BR': 'Ilustração',
  'zh-CN': '示意图',
  ko: '이미지 컷',
  fr: 'Illustration',
  it: 'Illustrazione',
  nl: 'Illustratie',
  sv: 'Illustration',
};

export default function IllustrationMark({ className = '' }: { className?: string }) {
  const lang = useLang();
  return (
    <span
      aria-hidden="true"
      className={
        'pointer-events-none absolute bottom-1.5 left-2 z-10 select-none ' +
        'text-[0.5rem] uppercase tracking-[0.14em] text-white/25 ' +
        'mix-blend-luminosity ' +
        className
      }
      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
    >
      {LABEL[lang]}
    </span>
  );
}
