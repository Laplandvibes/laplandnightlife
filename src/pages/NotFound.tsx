import SharedNotFound from '../shared/NotFound';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function NotFound() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].nav;

  return (
    <SharedNotFound
      lang={lang}
      siteName="LaplandNightlife"
      homeHref={to('/')}
      links={[
        { href: to('/cities'), label: c.cities },
        { href: to('/nightclubs'), label: c.nightclubs },
        { href: to('/aurora-bars'), label: c.auroraBars },
      ]}
    />
  );
}
