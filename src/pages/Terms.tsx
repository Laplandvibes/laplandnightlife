import TermsContent from '../shared/Legal/TermsContent';
import { useLang } from '../i18n/useLang';
import PageSeo from '../components/PageSeo';
import { getPageSeo } from '../lib/pageSeo';

export default function Terms() {
  const lang = useLang();
  const seo = getPageSeo('terms', lang);
  return (
    <>
      <PageSeo title={seo.title} description={seo.description} path="/terms" />
      <TermsContent siteName="LaplandNightlife" lang={lang} />
    </>
  );
}
