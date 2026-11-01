'use client';
import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Img from '@/components/Img';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
const WORK = ['/images/products/p3.webp', '/images/products/p42.webp', '/images/products/p24.webp', '/images/products/p6.webp', '/images/products/p28.webp', '/images/products/p0.webp', '/images/products/p38.webp', '/images/products/p2.webp'];
export default function About() {
  const { t, tx } = useT();
  const s = useStore((st) => st.settings);
  return (
    <>
      <PageHead title={t('about_title')} crumbs={[{ label: t('nav_about') }]} />
      <div className="wrap py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="max-w-[60ch] font-slab text-2xl leading-relaxed">{tx(s.about)}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {s.stats.map((x, i) => <div key={i} className="border-l-2 border-gold pl-4"><p className="font-slab text-4xl font-bold text-crimson">{x.value}</p><p className="text-sm text-slate">{tx(x.label)}</p></div>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/custom-order" className="btn-primary">{t('cta_btn')}</Link><Link href="/contact" className="btn-ghost">{t('nav_contact')}</Link></div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl"><Img src="/images/banners/b16.webp" alt="Team in Brave kits" sizes="50vw" className="object-cover" /></div>
        </div>
        <h2 className="h-sec mt-20">{t('our_work')}</h2><div className="stitch mb-8 mt-4 w-16 text-gold" />
        <div className="columns-2 gap-4 md:columns-4 [&>div]:mb-4">
          {WORK.map((src, i) => <div key={src} className={`relative overflow-hidden rounded-2xl ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}><Img src={src} alt="" sizes="25vw" className="object-cover transition duration-700 hover:scale-105" /></div>)}
        </div>
      </div>
    </>
  );
}
