'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Box, Plus } from 'lucide-react';
import Img from './Img';
import { useStore } from '@/lib/store';
import { useT, fmt } from '@/lib/i18n';

export default function ProductCard({ p, priority = false }) {
  const { t, tx } = useT();
  const wish = useStore((s) => s.wishlist.includes(p.id));
  const toggleWish = useStore((s) => s.toggleWish);
  const addToCart = useStore((s) => s.addToCart);
  const showToast = useStore((s) => s.showToast);
  const cat = useStore((s) => s.categories.find((c) => c.id === p.categoryId));
  const [quick, setQuick] = useState(false);
  const off = p.compareAt > p.price ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  const has3d = p.model3d && p.model3d.mode !== 'panel';

  return (
    <article className="group relative" onMouseLeave={() => setQuick(false)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-50">
        <Link href={`/product/${p.slug}`} aria-label={tx(p.name)} className="absolute inset-0">
          <Img src={p.images[0]} alt={tx(p.name)} priority={priority} sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]" />
          {p.images[1] && <Img src={p.images[1]} alt="" sizes="(max-width:640px) 50vw, 25vw" className="object-cover opacity-0 transition duration-500 group-hover:opacity-100" />}
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {off > 0 && <span className="rounded-full bg-crimson px-2.5 py-1 text-xs font-bold text-white">−{off}%</span>}
          {p.isNew && <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-navy">{t('new_in')}</span>}
          {p.madeToOrder && <span className="rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-navy">{t('made_to_order')}</span>}
        </div>
        <button onClick={() => toggleWish(p.id)} aria-label={t('wishlist')} aria-pressed={wish} className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110 ${wish ? 'text-crimson' : 'text-navy'}`}>
          <Heart className="h-[18px] w-[18px]" fill={wish ? 'currentColor' : 'none'} />
        </button>
        {has3d && (
          <Link href={`/product/${p.slug}?view=3d`} className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-navy/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur hover:bg-navy">
            <Box className="h-3.5 w-3.5 text-gold" />3D
          </Link>
        )}
        <div className={`absolute inset-x-2 bottom-2 rounded-xl bg-white/95 p-2 shadow-lift backdrop-blur transition duration-300 ${quick ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
          <div className="flex flex-wrap justify-center gap-1">
            {p.sizes.map((s) => (
              <button key={s} onClick={() => { addToCart(p.id, s, p.colors?.[0]?.name || 'As shown', 1); showToast(`${t('added')} · ${s}`); setQuick(false); }} className="min-w-[38px] rounded-md border border-line px-1.5 py-1 text-xs font-semibold hover:border-navy hover:bg-navy hover:text-white">{s}</button>
            ))}
          </div>
        </div>
        {!quick && (
          <button onClick={() => setQuick(true)} aria-label={t('add_to_cart')} className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-navy text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
            <Plus className="h-[18px] w-[18px]" />
          </button>
        )}
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-xs font-medium text-slate">{tx(cat?.name)}</p>
        <Link href={`/product/${p.slug}`} className="mt-1 line-clamp-2 block font-medium leading-snug hover:text-crimson">{tx(p.name)}</Link>
        <p className="mt-1.5 flex items-baseline gap-2">
          <span className="font-semibold">{fmt(p.price)}</span>
          {off > 0 && <span className="text-sm text-slate line-through">{fmt(p.compareAt)}</span>}
        </p>
      </div>
    </article>
  );
}
