import CookieContent from '../shared/Legal/CookieContent';
import { useLang } from '../i18n/useLang';
import PageSeo from '../components/PageSeo';
import { getPageSeo } from '../lib/pageSeo';

export default function CookiePolicy() {
  const lang = useLang();
  const seo = getPageSeo('cookie-policy', lang);
  return (
    <>
      <PageSeo title={seo.title} description={seo.description} path="/cookie-policy" />
      <CookieContent siteName="LaplandNightlife" lang={lang} />
    </>
  );
}
