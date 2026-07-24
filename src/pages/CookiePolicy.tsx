import CookieContent from '../shared/Legal/CookieContent';
import { useLang } from '../i18n/useLang';
import PageSeo from '../components/PageSeo';

export default function CookiePolicy() {
  const lang = useLang();
  return (
    <>
      <PageSeo
        title="Cookie Policy"
        description="How LaplandNightlife uses cookies. GDPR compliant. Consent default-denied. Operated by Lapeso Oy."
        path="/cookie-policy"
      />
      <CookieContent siteName="LaplandNightlife" lang={lang} />
    </>
  );
}
