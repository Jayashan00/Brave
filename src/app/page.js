'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Droplets, Layers, MessagesSquare, BadgePercent, X, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';
import Showroom from '@/components/Showroom';
import ProductCard from '@/components/ProductCard';
import Img from '@/components/Img';
import { WaIcon } from '@/components/Footer';
import { useStore, waLink } from '@/lib/store';
import { useT } from '@/lib/i18n';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Categories />
      <Featured />
      <Showroom />
      <Why />
      <Process />
      <Teams />
      <Cta />
    </>
  );
}

function SecHead({ title, sub, link, linkLabel }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="h-sec">{title}</h2>
        {sub && <p className="mt-3 max-w-xl text-slate">{sub}</p>}
        <div className="stitch mt-4 w-16 text-gold" />
      </div>
      {link && <Link href={link} className="group flex items-center gap-1.5 font-semibold hover:text-crimson">{linkLabel}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>}
    </div>
  );
}

function Categories() {
  const { t, tx } = useT();
  const cats = useStore((s) => s.categories);
  const products = useStore((s) => s.products);
  const s = useStore((st) => st.settings);
  const sorted = [...cats].sort((a, b) => a.order - b.order);
  const withImg = sorted.filter((c) => c.image);
  const noImg = sorted.filter((c) => !c.image);
  const count = (id) => products.filter((p) => p.categoryId === id && p.published).length;
  return (
    <section className="wrap pt-20">
      <SecHead title={t('shop_by_cat')} link="/shop" linkLabel={t('view_all')} />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {withImg.map((c, i) => (
          <Link key={c.id} href={`/shop?cat=${c.slug}`} className={`group relative overflow-hidden rounded-2xl bg-navy ${i === 0 ? 'col-span-2 row-span-2 aspect-square lg:aspect-auto' : 'aspect-[4/5] lg:aspect-auto lg:min-h-[250px]'}`}>
            <Img src={c.image} alt={tx(c.name)} sizes={i === 0 ? '(max-width:1024px) 100vw, 50vw' : '(max-width:1024px) 50vw, 25vw'} className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,23,48,.9)_0%,rgba(14,23,48,.15)_55%,transparent)]" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
              <p className={`font-slab font-semibold leading-tight ${i === 0 ? 'text-3xl' : 'text-lg sm:text-xl'}`}>{tx(c.name)}</p>
              {i === 0 && <p className="mt-2 max-w-sm text-white/80">{tx(c.blurb)}</p>}
              <p className="mt-1.5 text-sm text-gold-300">{t('products_count', { n: count(c.id) })}</p>
            </div>
          </Link>
        ))}
      </div>
      {noImg.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {noImg.map((c) => (
            <a key={c.id} href={waLink(s.whatsapp, `${t('wa_hello')} ${tx(c.name)}`)} target="_blank" rel="noreferrer" className="stitch-box group flex items-center justify-between rounded-2xl bg-white p-5 ring-1 ring-line hover:ring-navy">
              <div><p className="font-slab text-xl font-semibold">{tx(c.name)}</p><p className="mt-1 text-sm text-slate">{t('ask_stock')}</p></div>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1FA855] text-white"><WaIcon className="h-5 w-5" /></span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

function Featured() {
  const { t } = useT();
  const products = useStore((s) => s.products);
  const [tab, setTab] = useState('featured');
  const list = useMemo(() => {
    const pub = products.filter((p) => p.published);
    if (tab === 'new') return pub.filter((p) => p.isNew);
    if (tab === 'sale') return pub.filter((p) => p.compareAt > p.price);
    return pub.filter((p) => p.featured);
  }, [products, tab]);
  const tabs = [['featured', t('sort_pop')], ['new', t('new_in')], ['sale', t('sale')]];
  return (
    <section className="wrap py-20">
      <SecHead title={t('featured')} link="/shop" linkLabel={t('view_all')} />
      <div className="mb-6 flex gap-2">
        {tabs.map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tab === k ? 'bg-navy text-white' : 'bg-white text-navy ring-1 ring-line hover:ring-navy'}`}>{l}</button>)}
      </div>
      <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {list.slice(0, 8).map((p, i) => <ProductCard key={p.id} p={p} priority={i < 4} />)}
      </motion.div>
    </section>
  );
}

function Why() {
  const { t, tx } = useT();
  const stats = useStore((s) => s.settings.stats);
  const items = [[Droplets, 'why1'], [Layers, 'why2'], [MessagesSquare, 'why3'], [BadgePercent, 'why4']];
  return (
    <section className="wrap py-20">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[380px] overflow-hidden rounded-3xl">
          <Img src="/images/products/p24.webp" alt="School athletics polo with running horse print" sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
            {stats.map((s, i) => (
              <div key={i} className="rounded-xl bg-white/95 p-3 backdrop-blur">
                <p className="font-slab text-3xl font-bold leading-none text-crimson">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-navy/80">{tx(s.label)}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="h-sec">{t('why_title')}</h2>
          <div className="stitch mt-4 w-16 text-gold" />
          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {items.map(([I, k]) => (
              <div key={k}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold"><I className="h-6 w-6" /></span>
                <h3 className="mt-4 font-slab text-xl font-semibold">{t(k)}</h3>
                <p className="mt-1.5 leading-relaxed text-slate">{t(k + 'd')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useT();
  const steps = ['p1', 'p2', 'p3', 'p4', 'p5'];
  return (
    <section className="border-y border-line bg-white py-20">
      <div className="wrap">
        <h2 className="h-sec">{t('process_title')}</h2>
        <div className="stitch mt-4 w-16 text-gold" />
        <ol className="relative mt-12 grid gap-8 md:grid-cols-5 md:gap-4">
          <div className="stitch absolute left-0 right-0 top-6 hidden text-navy/20 md:block" />
          {steps.map((k, i) => (
            <li key={k} className="relative">
              <span className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-navy bg-white font-slab text-xl font-bold">{i + 1}</span>
              <h3 className="mt-4 font-slab text-lg font-semibold">{t(k)}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-slate">{t(k + 'd')}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Teams() {
  const { t } = useT();
  const gallery = useStore((s) => s.gallery);
  const [open, setOpen] = useState(-1);
  const loop = [...gallery, ...gallery];
  return (
    <section className="py-20">
      <div className="wrap"><SecHead title={t('teams_title')} sub={t('teams_sub')} /></div>
      <div className="group relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {loop.map((g, i) => (
            <button key={i} onClick={() => setOpen(i % gallery.length)} className="relative h-[240px] w-[360px] shrink-0 overflow-hidden rounded-2xl sm:h-[300px] sm:w-[450px]">
              <Img src={g.image} alt={g.caption} sizes="450px" className="object-cover transition duration-500 hover:scale-105" />
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open >= 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-navy-900/90 p-4" onClick={() => setOpen(-1)}>
            <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white" aria-label={t('close')}><X /></button>
            <button onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + gallery.length) % gallery.length); }} className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white" aria-label="Previous"><ChevronLeft /></button>
            <button onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % gallery.length); }} className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white" aria-label="Next"><ChevronRight /></button>
            <motion.div key={open} initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative aspect-[3/2] w-full max-w-5xl overflow-hidden rounded-xl" onClick={(e) => e.stopPropagation()}>
              <Img src={gallery[open].image} alt={gallery[open].caption} sizes="100vw" className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Cta() {
  const { t } = useT();
  const s = useStore((st) => st.settings);
  return (
    <section className="wrap">
      <div className="relative overflow-hidden rounded-[28px] bg-crimson px-6 py-14 text-white sm:px-12">
        <div className="absolute inset-y-0 right-0 hidden w-[45%] md:block">
          <Img src="/images/banners/b17.webp" alt="" sizes="45vw" className="object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#A62830,transparent)]" />
        </div>
        <div className="relative max-w-xl">
          <h2 className="font-slab text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05]">{t('cta_title')}</h2>
          <p className="mt-4 text-lg text-white/85">{t('cta_sub')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/custom-order" className="btn-gold px-6 py-3">{t('cta_btn')}</Link>
            <a href={waLink(s.whatsapp, t('wa_hello') + ' team kits')} target="_blank" rel="noreferrer" className="btn bg-white px-6 py-3 text-navy hover:bg-gold-100"><WaIcon className="h-5 w-5 text-[#1FA855]" />{t('cta_wa')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
