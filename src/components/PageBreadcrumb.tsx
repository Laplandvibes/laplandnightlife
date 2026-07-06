import Breadcrumbs from '../shared/Breadcrumbs';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

/**
 * Ecosystem breadcrumb, rendered BELOW the hero (mounted once inside PillarHero,
 * and manually after the inline heroes on Cities / CityPage / SummerNights) so it
 * reads as the first strip of page content instead of a bar wedged between the
 * nav and the hero. Self-hides on home + unmapped routes (shared/Breadcrumbs
 * returns null there), so it can be mounted unconditionally.
 */
export default function PageBreadcrumb() {
  const lang = useLang();
  const c = COPY[lang].nav;
  const to = useLocalePath();
  const labelMap: Record<string, string> = {
    '/cities': c.cities,
    '/nightclubs': c.nightclubs,
    '/aurora-bars': c.auroraBars,
    '/events': c.events,
    '/photography': c.photography,
    '/summer-nights': c.summer,
    '/tips': c.tips,
  };
  return (
    <Breadcrumbs
      lang={lang}
      to={to}
      labelMap={labelMap}
      className="bg-night text-white border-b border-white/10"
      accentClassName="hover:text-pink hover:opacity-100"
    />
  );
}
