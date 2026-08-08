import PrivacyContent from '../shared/Legal/PrivacyContent';
import { useLang } from '../i18n/useLang';
import PageSeo from '../components/PageSeo';
import { getPageSeo } from '../lib/pageSeo';

export default function PrivacyPolicy() {
  const lang = useLang();
  const seo = getPageSeo('privacy', lang);
  return (
    <>
      <PageSeo title={seo.title} description={seo.description} path="/privacy" />
      <PrivacyContent siteName="LaplandNightlife" lang={lang} />
    </>
  );
}
