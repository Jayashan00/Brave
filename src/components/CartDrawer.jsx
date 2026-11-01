'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, Truck } from 'lucide-react';
import Img from './Img';
import { useStore, cartTotals, useCurrentUser } from '@/lib/store';
import { useT, fmt } from '@/lib/i18n';

export default function CartDrawer() {
  const { t, tx } = useT();
  const open = useStore((s) => s.cartOpen);
  const setOpen = useStore((s) => s.setCartOpen);
  const state = useStore();
  const { lines, subtotal, discount, tierOff, delivery, total } = cartTotals(state);
  const user = useCurrentUser();
  const router = useRouter();
  const left = state.settings.freeDeliveryOver - (subtotal - discount);

  const checkout = () => {
    setOpen(false);
    if (!user) state.openAuth('signin', '/checkout');
    else router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-navy-900/50" onClick={() => setOpen(false)} />
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.28 }} className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white" role="dialog" aria-label={t('cart_title')}>
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-slab text-2xl font-semibold">{t('cart_title')}</h2>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-navy-50" aria-label={t('close')}><X className="h-5 w-5" /></button>
            </div>
            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-navy-50"><ShoppingBag className="h-7 w-7" /></span>
                <p className="max-w-[240px] text-slate">{t('cart_empty')}</p>
                <Link href="/shop" onClick={() => setOpen(false)} className="btn-primary">{t('continue_shopping')}</Link>
              </div>
            ) : (
              <>
                {left > 0 && (
                  <div className="border-b border-line bg-gold-100 px-5 py-3 text-sm">
                    <p className="flex items-center gap-2 font-medium"><Truck className="h-4 w-4" />{t('free_delivery_left', { amt: fmt(left) })}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gold" style={{ width: `${Math.min(100, ((subtotal - discount) / state.settings.freeDeliveryOver) * 100)}%` }} /></div>
                  </div>
                )}
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                  {lines.map((l) => (
                    <li key={l.key} className="flex gap-4 py-4">
                      <Link href={`/product/${l.product.slug}`} onClick={() => setOpen(false)} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-navy-50"><Img src={l.product.images[0]} alt="" className="object-cover" sizes="80px" /></Link>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 font-medium leading-snug">{tx(l.product.name)}</p>
                        <p className="mt-1 text-sm text-slate">{l.size} · {l.color}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-line">
                            <button onClick={() => state.setQty(l.key, l.qty - 1)} className="grid h-8 w-8 place-items-center" aria-label="-"><Minus className="h-3.5 w-3.5" /></button>
                            <span className="w-7 text-center text-sm font-semibold">{l.qty}</span>
                            <button onClick={() => state.setQty(l.key, l.qty + 1)} className="grid h-8 w-8 place-items-center" aria-label="+"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                          <p className="font-semibold">{fmt(l.product.price * l.qty)}</p>
                        </div>
                      </div>
                      <button onClick={() => state.removeFromCart(l.key)} className="self-start p-1 text-slate hover:text-crimson" aria-label={t('remove')}><Trash2 className="h-4 w-4" /></button>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 border-t border-line p-5 text-[15px]">
                  <Row a={t('subtotal')} b={fmt(subtotal)} />
                  {discount > 0 && <Row a={t('bulk_discount', { n: tierOff })} b={`− ${fmt(discount)}`} className="text-[#178C46]" />}
                  <Row a={t('delivery')} b={delivery === 0 ? t('free') : fmt(delivery)} />
                  <Row a={t('total')} b={fmt(total)} className="pt-1 text-lg font-bold" />
                  <button onClick={checkout} className="btn-primary mt-3 w-full py-3.5 text-base">{t('checkout')}</button>
                  <Link href="/cart" onClick={() => setOpen(false)} className="block pt-1 text-center text-sm font-medium text-slate underline-offset-4 hover:underline">{t('cart_title')}</Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({ a, b, className = '' }) {
  return <div className={`flex justify-between ${className}`}><span>{a}</span><span>{b}</span></div>;
}
