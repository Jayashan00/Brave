'use client';
import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Minus, Plus, Box, Images, Ruler, Truck, ShieldCheck, Star, X, ChevronDown, Loader2 } from 'lucide-react';
import Img from '@/components/Img';
import ProductCard from '@/components/ProductCard';
import Viewer3D from '@/components/three/Viewer3D';
import SizeGuideTable from '@/components/SizeGuideTable';
import { WaIcon } from '@/components/Footer';
import { useStore, useCurrentUser, waLink } from '@/lib/store';
import { useT, fmt } from '@/lib/i18n';
import { PALETTE, KIDS_SIZES } from '@/lib/seed';

export default function ProductPageWrap() {
  return <Suspense fallback={null}><ProductPage /></Suspense>;
}

function ProductPage() {
  const { t, tx } = useT();
  const { slug } = useParams();
  const params = useSearchParams();
  const router = useRouter();
  const hydrated = useStore((s) => s.hydrated);
  const p = useStore((s) => s.products.find((x) => x.slug === slug));
  const products = useStore((s) => s.products);
  const cat = useStore((s) => s.categories.find((c) => c.id === p?.categoryId));
  const settings = useStore((s) => s.settings);
  const wish = useStore((s) => s.wishlist.includes(p?.id));
  const { toggleWish, addToCart, showToast, openAuth, setCartOpen } = useStore.getState();
  const user = useCurrentUser();
  const [mode, setMode] = useState(params.get('view') === '3d' ? '3d' : 'photos');
  const [img, setImg] = useState(0);
  const [size, setSize] = useState('');
  const [colour, setColour] = useState('');
  const [qty, setQty] = useState(1);
  const [guide, setGuide] = useState(false);
  const [sizeErr, setSizeErr] = useState(false);

  useEffect(() => { setImg(0); setSize(''); setColour(''); setQty(1); }, [slug]);
  const related = useMemo(() => (p ? products.filter((x) => x.published && x.id !== p.id && x.categoryId === p.categoryId).concat(products.filter((x) => x.published && x.featured && x.categoryId !== p.categoryId)).slice(0, 4) : []), [p, products]);

  if (!p) {
    return (
      <div className="wrap grid min-h-[50vh] place-items-center py-20 text-center">
        {!hydrated ? <Loader2 className="h-8 w-8 animate-spin" /> : <div><p className="font-slab text-3xl font-semibold">{t('not_found')}</p><Link href="/shop" className="btn-primary mt-6">{t('nav_shop')}</Link></div>}
      </div>
    );
  }

  const off = p.compareAt > p.price ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  const colourName = PALETTE.find((c) => c.hex === colour)?.name || (p.colors?.[0]?.name ?? 'As shown');
  const tiers = settings.bulkTiers || [];
  const isKids = p.sizes.every((s) => KIDS_SIZES.includes(s));

  const add = (buy) => {
    if (!size) { setSizeErr(true); showToast(t('choose_size'), 'err'); return; }
    addToCart(p.id, size, colourName, qty);
    if (buy) { if (!user) openAuth('signin', '/checkout'); else router.push('/checkout'); }
    else { showToast(`${t('added')} · ${size} × ${qty}`); setCartOpen(true); }
  };
  const waText = `${t('wa_hello')}: ${tx(p.name)}\n${t('size')}: ${size || '-'}\n${t('colour')}: ${colourName}\n${t('qty')}: ${qty}\n${typeof window !== 'undefined' ? window.location.href : ''}`;

  return (
    <div className="wrap py-8">
      <nav className="mb-6 flex flex-wrap gap-1.5 text-sm text-slate" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-navy">Home</Link>/<Link href="/shop" className="hover:text-navy">{t('nav_shop')}</Link>/
        {cat && <><Link href={`/shop?cat=${cat.slug}`} className="hover:text-navy">{tx(cat.name)}</Link>/</>}<span className="text-navy">{tx(p.name)}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-3 flex w-fit rounded-full bg-white p-1 ring-1 ring-line">
            <button onClick={() => setMode('photos')} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${mode === 'photos' ? 'bg-navy text-white' : ''}`}><Images className="h-4 w-4" />{t('photos')}</button>
            <button onClick={() => setMode('3d')} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${mode === '3d' ? 'bg-navy text-white' : ''}`}><Box className="h-4 w-4" />{t('view_3d')}</button>
          </div>
          {mode === 'photos' ? (
            <div className="grid gap-3 sm:grid-cols-[76px_1fr]">
              <div className="no-scrollbar order-2 flex gap-2 overflow-x-auto sm:order-1 sm:max-h-[640px] sm:flex-col sm:overflow-y-auto">
                {p.images.map((src, i) => (
                  <button key={i} onClick={() => setImg(i)} className={`relative aspect-square w-[76px] shrink-0 overflow-hidden rounded-xl bg-navy-50 ${img === i ? 'ring-2 ring-navy' : 'opacity-70 hover:opacity-100'}`} aria-label={`Photo ${i + 1}`}><Img src={src} alt="" sizes="76px" className="object-cover" /></button>
                ))}
              </div>
              <ZoomImage src={p.images[img]} alt={tx(p.name)} />
            </div>
          ) : (
            <Viewer3D product={p} colour={colour} onColour={setColour} size={size || (isKids ? '6-7Y' : 'M')} onSize={(s) => { setSize(s); setSizeErr(false); }} />
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-crimson">{tx(cat?.name)}</p>
          <h1 className="mt-2 font-slab text-[clamp(1.9rem,3.4vw,2.7rem)] font-bold leading-[1.1]">{tx(p.name)}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-semibold">{fmt(p.price)}</span>
            {off > 0 && <><span className="text-lg text-slate line-through">{fmt(p.compareAt)}</span><span className="rounded-full bg-crimson px-2.5 py-1 text-sm font-bold text-white">−{off}%</span></>}
          </div>
          <p className={`mt-2 text-sm font-semibold ${p.stock <= 0 ? 'text-crimson' : p.stock < 10 ? 'text-gold-700' : 'text-[#178C46]'}`}>
            {p.madeToOrder ? t('made_to_order') : p.stock <= 0 ? t('out_stock') : p.stock < 10 ? t('low_stock', { n: p.stock }) : t('in_stock')}
          </p>
          <p className="mt-5 leading-relaxed text-navy/85">{tx(p.description)}</p>

          <div className="mt-7">
            <p className="mb-2 text-sm font-semibold">{t('colour')}: <span className="font-normal text-slate">{colourName}</span></p>
            <div className="flex flex-wrap gap-2">
              {(p.colors || []).map((c) => (
                <button key={c.name} onClick={() => { setColour(c.hex || ''); if (c.hex) setMode('3d'); }} title={c.name} aria-label={c.name}
                  className={`h-9 w-9 rounded-full border border-line ${colour === (c.hex || '') ? 'ring-2 ring-gold ring-offset-2' : ''}`}
                  style={{ background: c.hex || `url(${p.images[0]}) center/cover` }} />
              ))}
            </div>
            {p.colors?.length > 1 && <p className="mt-2 text-xs text-slate">Other colours are made to order – preview them in 3D.</p>}
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className={`text-sm font-semibold ${sizeErr ? 'text-crimson' : ''}`}>{t('size')}{sizeErr && ` – ${t('choose_size')}`}</p>
              <button onClick={() => setGuide(true)} className="flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"><Ruler className="h-4 w-4" />{t('size_guide')}</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s) => <button key={s} onClick={() => { setSize(s); setSizeErr(false); }} className={`min-w-[52px] rounded-xl border px-3 py-2.5 font-semibold transition ${size === s ? 'border-navy bg-navy text-white' : `bg-white hover:border-navy ${sizeErr ? 'border-crimson' : 'border-line'}`}`}>{s}</button>)}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center rounded-full border border-line bg-white">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-11 place-items-center" aria-label="-"><Minus className="h-4 w-4" /></button>
              <input value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} className="w-12 bg-transparent text-center font-semibold outline-none" aria-label={t('qty')} inputMode="numeric" />
              <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-11 place-items-center" aria-label="+"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => add(false)} disabled={p.stock <= 0 && !p.madeToOrder} className="btn-primary flex-1 py-3 text-base">{t('add_to_cart')}</button>
            <button onClick={() => toggleWish(p.id)} aria-label={t('wishlist')} className={`grid h-12 w-12 place-items-center rounded-full border border-line bg-white ${wish ? 'text-crimson' : ''}`}><Heart className="h-5 w-5" fill={wish ? 'currentColor' : 'none'} /></button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button onClick={() => add(true)} disabled={p.stock <= 0 && !p.madeToOrder} className="btn-gold py-3">{t('buy_now')}</button>
            <a href={waLink(settings.whatsapp, waText)} target="_blank" rel="noreferrer" className="btn-wa py-3"><WaIcon className="h-5 w-5" />{t('order_whatsapp')}</a>
          </div>
          {tiers.length >= 2 && <p className="mt-4 rounded-xl bg-gold-100 px-4 py-3 text-sm">{t('bulk_note', { a: tiers[0].off, b: tiers[0].min, c: tiers[1].off, d: tiers[1].min })}</p>}

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2.5 rounded-xl bg-white p-3 ring-1 ring-line"><Truck className="h-5 w-5 text-crimson" />Islandwide delivery</div>
            <div className="flex items-center gap-2.5 rounded-xl bg-white p-3 ring-1 ring-line"><ShieldCheck className="h-5 w-5 text-crimson" />Made in Kandy</div>
          </div>

          <div className="mt-8 divide-y divide-line border-y border-line">
            <Acc title={t('fabric')} open><p>{p.fabric}</p></Acc>
            <Acc title={t('delivery_returns')}><p>Standard delivery {fmt(settings.deliveryFee)}, free over {fmt(settings.freeDeliveryOver)}. Ready-stock items usually arrive in 2–4 working days; custom orders are confirmed with a delivery date. Exchanges for size on unworn ready-stock items within 7 days – custom printed items cannot be returned unless faulty.</p></Acc>
          </div>
          <Reviews p={p} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="h-sec">{t('related')}</h2><div className="stitch mb-8 mt-4 w-16 text-gold" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      )}

      <AnimatePresence>
        {guide && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-navy-900/55 p-4" onClick={() => setGuide(false)}>
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setGuide(false)} className="absolute right-4 top-4" aria-label={t('close')}><X /></button>
              <h3 className="mb-5 font-slab text-2xl font-semibold">{t('size_guide')}</h3>
              <SizeGuideTable kids={isKids} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ZoomImage({ src, alt }) {
  const [z, setZ] = useState(null);
  return (
    <div className="relative order-1 aspect-[4/5] cursor-zoom-in overflow-hidden rounded-[22px] bg-navy-50 sm:order-2"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZ({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }} onMouseLeave={() => setZ(null)}>
      <AnimatePresence mode="wait">
        <motion.div key={src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 transition-transform duration-200" style={z ? { transform: 'scale(2)', transformOrigin: `${z.x}% ${z.y}%` } : undefined}>
          <Img src={src} alt={alt} priority sizes="(max-width:1024px) 100vw, 55vw" className="object-cover" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Acc({ title, children, open = false }) {
  const [o, setO] = useState(open);
  return (
    <div>
      <button onClick={() => setO(!o)} className="flex w-full items-center justify-between py-4 font-semibold">{title}<ChevronDown className={`h-5 w-5 transition ${o ? 'rotate-180' : ''}`} /></button>
      {o && <div className="pb-4 leading-relaxed text-navy/80">{children}</div>}
    </div>
  );
}

function Reviews({ p }) {
  const { t } = useT();
  const reviews = useStore((s) => s.reviews.filter((r) => r.productId === p.id));
  const addReview = useStore((s) => s.addReview);
  const openAuth = useStore((s) => s.openAuth);
  const user = useCurrentUser();
  const [form, setForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="font-slab text-xl font-semibold">{t('reviews')} {reviews.length > 0 && <span className="text-base font-normal text-slate">({avg.toFixed(1)} ★ · {reviews.length})</span>}</h3>
        <button onClick={() => (user ? setForm(!form) : openAuth('signin'))} className="text-sm font-semibold underline underline-offset-4">{t('write_review')}</button>
      </div>
      {form && (
        <form onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; addReview({ productId: p.id, userId: user.id, name: user.name, rating, text }); setText(''); setForm(false); }} className="mt-4 space-y-3 rounded-2xl bg-white p-4 ring-1 ring-line">
          <div className="flex gap-1">{[1, 2, 3, 4, 5].map((n) => <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n}`}><Star className={`h-6 w-6 ${n <= rating ? 'fill-gold text-gold' : 'text-line'}`} /></button>)}</div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="input" required />
          <button className="btn-primary">{t('save')}</button>
        </form>
      )}
      <ul className="mt-4 space-y-4">
        {reviews.map((r) => (
          <li key={r.id} className="border-b border-line pb-4">
            <div className="flex items-center gap-2"><span className="font-semibold">{r.name}</span><span className="text-gold">{'★'.repeat(r.rating)}<span className="text-line">{'★'.repeat(5 - r.rating)}</span></span></div>
            <p className="mt-1 text-navy/80">{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
