import { Link } from 'react-router-dom';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function NotFound() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].notFound;
  const docTitle =
    lang === 'fi'
      ? '404 — Ei löytynyt | LaplandNightlife'
      : lang === 'de'
      ? '404 — Nicht gefunden | LaplandNightlife'
      : '404 — Not found | LaplandNightlife';

  return (
    <>
      <title>{docTitle}</title>
      <meta name="robots" content="noindex" />
      <section className="min-h-[70vh] flex items-center justify-center px-4 pt-32">
        <div className="max-w-md text-center">
          <p className="text-pink font-heading text-9xl tracking-tight mb-2">404</p>
          <h1 className="font-heading text-3xl text-white tracking-tight mb-4">{c.title}</h1>
          <p className="text-white/65 mb-6">{c.body}</p>
          <Link to={to('/')} className="inline-block bg-pink hover:bg-pink-dark text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wider transition-colors">
            {c.btn}
          </Link>
        </div>
      </section>
    </>
  );
}
