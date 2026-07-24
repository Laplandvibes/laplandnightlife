import { Camera, Sparkles, Music, Snowflake, Sun } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import { IMG } from '../data/images';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function Photography() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].photo;
  // useLocalePath maps pt-BR/zh-CN/ko to /br /cn /kr — raw `/${lang}/…`
  // produced double-prefixed client-side canonicals on those three locales.
  const path = to('/photography');

  // Icons match the copy: aurora capture, club interior, igloo bar, midnight sun.
  const settings = [
    { h: c.s1H, body: c.s1Body, icon: Sparkles },
    { h: c.s2H, body: c.s2Body, icon: Music },
    { h: c.s3H, body: c.s3Body, icon: Snowflake },
    { h: c.s4H, body: c.s4Body, icon: Sun },
  ];

  const venues = [
    { h: c.pv1H, city: c.pv1City, shot: c.pv1Shot },
    { h: c.pv2H, city: c.pv2City, shot: c.pv2Shot },
    { h: c.pv3H, city: c.pv3City, shot: c.pv3Shot },
    { h: c.pv4H, city: c.pv4City, shot: c.pv4Shot },
    { h: c.pv5H, city: c.pv5City, shot: c.pv5Shot },
    { h: c.pv6H, city: c.pv6City, shot: c.pv6Shot },
  ];

  return (
    <>
      <PageSeo
        title={c.seoTitle}
        description={c.seoDesc}
        path={path}
        jsonLd={[
          articleSchema(c.seoTitle, c.seoDesc, path),
          pillarBreadcrumb(c.heroTitle, path),
        ]}
      />

      <PillarHero
        icon={Camera}
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSub}
        intro={c.heroIntro}
        bgImage={IMG.pillarPhotography}
        accentClass="from-aurora-blue/20 via-night/80 to-night"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight text-center mb-10">{c.cheatH}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {settings.map((s) => (
              <div key={s.h} className="bg-night-light/40 border border-white/10 rounded-xl p-6 hover:border-pink/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-pink/10 border border-pink/30 text-pink shrink-0">
                    <s.icon size={18} strokeWidth={1.8} />
                  </span>
                  <h3 className="font-heading text-2xl text-white tracking-tight">{s.h}</h3>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight text-center mb-10">{c.venuesH}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((v) => (
              <div key={v.h} className="bg-night-light/60 border border-white/10 rounded-xl p-5 hover:border-purple/30 transition-colors">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold mb-1">{v.city}</p>
                <h3 className="font-heading text-xl text-white tracking-tight mb-2">{v.h}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{v.shot}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl text-white tracking-tight mb-6 text-center">{c.ethicsH}</h2>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">{c.e1L}</strong> {c.e1}</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">{c.e2L}</strong> {c.e2}</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">{c.e3L}</strong> {c.e3}</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">{c.e4L}</strong> {c.e4}</li>
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.gygEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">{c.gygH}</h2>
            <p className="text-white/80 max-w-xl mx-auto">{c.gygBody}</p>
          </div>
          <GygWidget query="Lapland photography aurora tour" campaign="photography_pillar" count={6} />
        </div>
      </section>
    </>
  );
}
