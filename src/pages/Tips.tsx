import { Link } from 'react-router-dom';
import { AlertTriangle, Phone, Sparkles, Music, Sun, Star, Calendar, ShieldAlert } from 'lucide-react';
import PageSeo from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function Tips() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].tips;
  // useLocalePath maps pt-BR/zh-CN/ko to /br /cn /kr — raw `/${lang}/…`
  // produced double-prefixed client-side canonicals on those three locales.
  const path = to('/tips');

  const tips = [
    { h: c.t1H, icon: AlertTriangle, body: c.t1Body, to: to('/nightclubs') },
    { h: c.t2H, icon: Sparkles, body: c.t2Body, to: to('/aurora-bars') },
    { h: c.t3H, icon: Music, body: c.t3Body, to: to('/city/rovaniemi') },
    { h: c.t4H, icon: Phone, body: c.t4Body, to: to('/city/rovaniemi') },
    { h: c.t5H, icon: Sun, body: c.t5Body, to: to('/city/rovaniemi') },
    { h: c.t6H, icon: Star, body: c.t6Body, to: to('/aurora-bars') },
    { h: c.t7H, icon: Calendar, body: c.t7Body, to: to('/summer-nights') },
  ];

  const rules = [
    { h: c.r1H, body: c.r1Body },
    { h: c.r2H, body: c.r2Body },
    { h: c.r3H, body: c.r3Body },
    { h: c.r4H, body: c.r4Body },
  ];

  return (
    <>
      <PageSeo title={c.seoTitle} description={c.seoDesc} path={path} />

      <PillarHero
        icon={ShieldAlert}
        iconColor="text-neon-yellow"
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSub}
        intro={c.heroIntro}
      />

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.sevenEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
              {c.sevenH}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((t) => (
              <Link
                key={t.h}
                to={t.to}
                className="group flex flex-col bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/40 hover:-translate-y-0.5 transition-all"
              >
                <t.icon size={22} className="text-pink mb-3" />
                <h3 className="font-heading text-lg text-white tracking-tight mb-2">{t.h}</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-3">{t.body}</p>
                <span className="mt-auto pt-2 text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold">
                  {c.more}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-neon-yellow font-bold mb-3">{c.readEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
              {c.readH}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {rules.map((r) => (
              <div key={r.h} className="bg-night-light/60 border border-neon-yellow/20 rounded-xl p-5">
                <h3 className="font-heading text-lg text-white tracking-tight mb-2">{r.h}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-white/75 mt-8">
            {c.footer}{' '}
            <Link to={to('/terms')} className="text-pink hover:text-pink-dark underline underline-offset-4">
              {c.footerLink}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
