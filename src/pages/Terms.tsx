import TermsContent from '../shared/Legal/TermsContent';
import { useLang } from '../i18n/useLang';
import PageSeo from '../components/PageSeo';

export default function Terms() {
  const lang = useLang();
  return (
    <>
      <PageSeo
        title="Terms of Service"
        description="Terms of service for LaplandNightlife. Editorial standards, affiliate disclosure, content licensing. Operated by Lapeso Oy."
        path="/terms"
      />
      <TermsContent siteName="LaplandNightlife" lang={lang} />
    </>
  );
}
