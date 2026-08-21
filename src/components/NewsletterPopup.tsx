import SharedNewsletterPopup from '../shared/NewsletterPopup';
import { trackNewsletterSignup } from '../lib/analytics';
import { useLang } from '../i18n/useLang'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabase';

export default function NewsletterPopup() {
  const langRaw = useLang();
  return (
    <SharedNewsletterPopup
lang={langRaw as 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv'}
            siteId="laplandnightlife"
      brandWord="NIGHTLIFE"
      supabaseUrl={SUPABASE_URL}
      supabaseAnonKey={SUPABASE_ANON_KEY}
      onSubscribed={(s) => trackNewsletterSignup(s)}
    />
  );
}
