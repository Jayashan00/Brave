'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import Viewer3D from './three/Viewer3D';
import Img from './Img';
import { useStore } from '@/lib/store';
import { PALETTE } from '@/lib/seed';
import { useT, fmt } from '@/lib/i18n';

export default function Showroom() {
  const { t, tx } = useT();
  const products = useStore((s) => s.products);
  const addToCart = useStore((s) => s.addToCart);
  const showToast = useStore((s) => s.showToast);
  const list = useMemo(() => products.filter((p) => p.published && p.model3d && p.model3d.mode !== 'panel'), [products]);
  const [id, setId] = useState(null);
  const [colour, setColour] = useState('');
  const [size, setSize] = useState('M');
  const [inView, setInView] = useState(false);
  const p = list.find((x) => x.id === id) || list[0];

  useEffect(() => {
    const el = document.getElementById('showroom'); if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: '300px' });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => { if (p && !p.sizes.includes(size)) setSize(p.sizes[Math.floor(p.sizes.length / 2)]); }, [p, size]);
  if (!p) return null;
  const colourName = PALETTE.find((c) => c.hex === colour)?.name || 'As shown';

  return (
    <section id="showroom" className="relative scroll-mt-24 overflow-hidden bg-navy py-20 text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/5" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-dashed border-gold/20" />
      <div className="wrap">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="flex items-center gap-3 text-sm font-semibold text-gold-300"><span className="stitch w-10 text-gold" />{t('nav_showroom')}</p>
            <h2 className="mt-3 max-w-2xl font-slab text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.05]">{t('showroom_title')}</h2>
            <p className="mt-4 max-w-xl text-white/75">{t('showroom_sub')}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="rounded-[28px] bg-white p-3 text-navy sm:p-4">
            {inView ? <Viewer3D key={p.id} product={p} colour={colour} onColour={setColour} size={size} onSize={setSize} /> : <div className="aspect-square rounded-[22px] bg-navy-50" />}
          </div>

          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div key={p.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
                <h3 className="font-slab text-3xl font-semibold leading-tight">{tx(p.name)}</h3>
                <p className="mt-2 text-2xl font-semibold text-gold-300">{fmt(p.price)}</p>
                <p className="mt-4 line-clamp-4 leading-relaxed text-white/75">{tx(p.description)}</p>
                <p className="mt-3 text-sm text-white/60">{t('fabric')}: {p.fabric}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => { addToCart(p.id, size, colourName, 1); showToast(`${t('added')} · ${size}`); }} className="btn-gold px-6 py-3"><ShoppingBag className="h-[18px] w-[18px]" />{t('add_to_cart')}</button>
                  <Link href={`/product/${p.slug}`} className="btn border border-white/30 px-6 py-3 text-white hover:bg-white hover:text-navy">{t('description')}<ArrowUpRight className="h-4 w-4" /></Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto pt-10">
              <div className="mb-3 stitch w-full text-white/15" />
              <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible">
                {list.map((x) => (
                  <button key={x.id} onClick={() => { setId(x.id); setColour(''); }} aria-label={tx(x.name)} className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-white/95 transition lg:w-auto ${x.id === p.id ? 'ring-2 ring-gold ring-offset-2 ring-offset-navy' : 'opacity-75 hover:opacity-100'}`}>
                    <Img src={x.model3d.front || x.images[0]} alt="" sizes="96px" className="object-contain p-1.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
