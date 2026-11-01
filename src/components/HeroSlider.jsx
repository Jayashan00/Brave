'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Img from './Img';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';

const DURATION = 7000;

export default function HeroSlider() {
  const { tx, t } = useT();
  const banners = useStore((s) => s.banners);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(null);
  const n = banners.length;
  const go = useCallback((d) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => { if (paused || n < 2) return; const id = setTimeout(() => go(1), DURATION); return () => clearTimeout(id); }, [i, paused, go, n]);
  useEffect(() => { if (i >= n) setI(0); }, [n, i]);
  if (!n) return null;
  const b = banners[Math.min(i, n - 1)];

  return (
    <section className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touch.current = null; }}>
      <div className="relative h-[min(78svh,720px)] min-h-[500px] overflow-hidden bg-navy">
        <AnimatePresence initial={false}>
          <motion.div key={b.id} className="absolute inset-0" initial={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }} exit={{ opacity: 0.6 }} transition={{ duration: 1.05, ease: [0.7, 0, 0.2, 1] }}>
            <div className="absolute inset-0 animate-kenburns">
              <Img src={b.image} alt="" priority sizes="100vw" className="object-cover" style={{ objectPosition: b.position || 'center' }} />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,23,48,.88)_0%,rgba(14,23,48,.55)_45%,rgba(14,23,48,.05)_80%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(14,23,48,.6),transparent)]" />
            {/* stronger shade on phones where text covers the whole photo */}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,23,48,.92)_0%,rgba(14,23,48,.55)_55%,rgba(14,23,48,.35)_100%)] sm:hidden" />
          </motion.div>
        </AnimatePresence>

        <div className="wrap relative flex h-full items-end pb-24 sm:items-center sm:pb-0">
          <AnimatePresence mode="wait">
            <motion.div key={b.id} className="max-w-[620px] text-white" initial="h" animate="s" exit="x" variants={{ s: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } } }}>
              <motion.div variants={item} className="mb-5 flex items-center gap-3 text-gold-300">
                <span className="stitch w-10 text-gold" /><span className="text-sm font-semibold">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
              </motion.div>
              <motion.h1 variants={item} className="font-slab text-[clamp(2.4rem,5.6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.015em]">{tx(b.title)}</motion.h1>
              <motion.p variants={item} className="mt-4 max-w-[46ch] text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">{tx(b.subtitle)}</motion.p>
              <motion.div variants={item} className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                <Link href={b.link || '/shop'} className="btn-gold px-5 py-3 text-base sm:px-6">{tx(b.cta)}</Link>
                <Link href="/shop" className="btn border border-white/40 px-5 py-3 text-base text-white hover:bg-white hover:text-navy sm:px-6">{t('nav_shop')}</Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-4 sm:bottom-6">
          <div className="wrap flex items-center justify-between gap-6">
            <div className="flex flex-1 gap-2">
              {banners.map((x, k) => (
                <button key={x.id} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} className="group h-8 flex-1 max-w-[120px]">
                  <span className="block h-[3px] overflow-hidden rounded-full bg-white/25">
                    <span className={`block h-full bg-gold ${k === i ? '' : k < i ? 'w-full' : 'w-0'}`} style={k === i ? { animation: paused ? 'none' : `heroProg ${DURATION}ms linear forwards`, width: paused ? '100%' : undefined } : undefined} />
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} aria-label="Previous" className="hidden h-11 w-11 place-items-center rounded-full border border-white/30 text-white hover:bg-white hover:text-navy sm:grid"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => go(1)} aria-label="Next" className="hidden h-11 w-11 place-items-center rounded-full border border-white/30 text-white hover:bg-white hover:text-navy sm:grid"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes heroProg{from{width:0}to{width:100%}}`}</style>
    </section>
  );
}

const item = { h: { opacity: 0, y: 26 }, s: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } }, x: { opacity: 0, y: -12, transition: { duration: 0.3 } } };
