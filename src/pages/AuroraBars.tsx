import { Sparkles } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';
import { useLang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function AuroraBars() {
  const lang = useLang();
  const c = COPY[lang].aurora;
  const path = lang === 'en' ? '/aurora-bars' : `/${lang}/aurora-bars`;

  const venues = [
    { h: c.v1H, where: c.v1Where, body: c.v1Body, type: c.v1Type },
    { h: c.v2H, where: c.v2Where, body: c.v2Body, type: c.v2Type },
    { h: c.v3H, where: c.v3Where, body: c.v3Body, type: c.v3Type },
    { h: c.v4H, where: c.v4Where, body: c.v4Body, type: c.v4Type },
    { h: c.v5H, where: c.v5Where, body: c.v5Body, type: c.v5Type },
    { h: c.v6H, where: c.v6Where, body: c.v6Body, type: c.v6Type },
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
        icon={Sparkles}
        iconColor="text-purple-light"
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSub}
        intro={c.heroIntro}
        bgImage={IMG.pillarAuroraBars}
        accentClass="from-purple/30 via-night/70 to-night"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {venues.map((v) => (
            <div key={v.h} className="relative overflow-hidden bg-night-light/40 border border-white/10 rounded-2xl p-6 hover:border-purple/40 hover:-translate-y-1 transition-all">
              <div className="absolute -top-20 -right-10 w-40 h-40 bg-purple/20 rounded-full blur-[60px]" />
              <div className="relative">
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-purple-light font-bold mb-2">{v.type}</p>
                <h2 className="font-heading text-xl text-white tracking-tight mb-1">{v.h}</h2>
                <p className="text-pink text-xs uppercase tracking-wider font-semibold mb-3">{v.where}</p>
                <p className="text-sm text-white/70 leading-relaxed">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl text-white tracking-tight mb-6 text-center">{c.planH}</h2>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">{c.plan1L}</strong> {c.plan1}</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">{c.plan2L}</strong> {c.plan2}</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">{c.plan3L}</strong> {c.plan3}</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">{c.plan4L}</strong> {c.plan4}</li>
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-purple-light font-bold mb-3">{c.gygEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">{c.gygH}</h2>
            <p className="text-white/80 max-w-xl mx-auto">{c.gygBody}</p>
          </div>
          <GygWidget query="Lapland aurora hunt igloo" campaign="aurora_pillar" count={6} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-white tracking-tight mb-3">{c.ctaH}</h2>
          <p className="text-white/65 mb-6">{c.ctaBody}</p>
          <AffiliateCTA partner="hotels" sid="aurora_bars_cta" destination="Saariselkä" className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5">
            {c.ctaBtn}
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
