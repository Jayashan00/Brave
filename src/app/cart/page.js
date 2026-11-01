'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2 } from 'lucide-react';
import PageHead from '@/components/PageHead';
import Img from '@/components/Img';
import { useStore, cartTotals, useCurrentUser } from '@/lib/store';
import { useT, fmt } from '@/lib/i18n';

export default function CartPage() {
  const { t, tx } = useT();
  const state = useStore();
  const user = useCurrentUser();
  const router = useRouter();
  const { lines, subtotal, discount, tierOff, delivery, total, qty } = cartTotals(state);
  const next = (state.settings.bulkTiers || []).slice().sort((a, b) => a.min - b.min).find((x) => x.min > qty);
  const go = () => (user ? router.push('/checkout') : state.openAuth('signin', '/checkout'));
  return (
    <>
      <PageHead title={t('cart_title')} crumbs={[{ label: t('cart_title') }]} />
      <div className="wrap py-10">
        {lines.length === 0 ? (
          <div className="card grid place-items-center gap-4 p-14 text-center"><p className="text-slate">{t('cart_empty')}</p><Link href="/shop" className="btn-primary">{t('continue_shopping')}</Link></div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-line rounded-2xl bg-white px-5 ring-1 ring-line">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 py-5">
                  <Link href={`/product/${l.product.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-navy-50"><Img src={l.product.images[0]} alt="" sizes="96px" className="object-cover" /></Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link href={`/product/${l.product.slug}`} className="font-semibold hover:text-crimson">{tx(l.product.name)}</Link>
                    <p className="mt-1 text-sm text-slate">{t('size')}: {l.size} · {t('colour')}: {l.color}</p>
                    <p className="mt-1 text-sm">{fmt(l.product.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-line">
                        <button onClick={() => state.setQty(l.key, l.qty - 1)} className="grid h-9 w-9 place-items-center" aria-label="-"><Minus className="h-4 w-4" /></button>
                        <span className="w-8 text-center font-semibold">{l.qty}</span>
                        <button onClick={() => state.setQty(l.key, l.qty + 1)} className="grid h-9 w-9 place-items-center" aria-label="+"><Plus className="h-4 w-4" /></button>
                      </div>
                      <div className="flex items-center gap-3"><span className="font-semibold">{fmt(l.product.price * l.qty)}</span><button onClick={() => state.removeFromCart(l.key)} className="text-slate hover:text-crimson" aria-label={t('remove')}><Trash2 className="h-4 w-4" /></button></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <aside className="h-fit space-y-3 rounded-2xl bg-white p-6 ring-1 ring-line lg:sticky lg:top-24">
              <div className="flex justify-between"><span>{t('subtotal')}</span><span>{fmt(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-[#178C46]"><span>{t('bulk_discount', { n: tierOff })}</span><span>− {fmt(discount)}</span></div>}
              <div className="flex justify-between"><span>{t('delivery')}</span><span>{delivery ? fmt(delivery) : t('free')}</span></div>
              <div className="flex justify-between border-t border-line pt-3 text-lg font-bold"><span>{t('total')}</span><span>{fmt(total)}</span></div>
              {next && <p className="rounded-lg bg-gold-100 px-3 py-2 text-sm">Add {next.min - qty} more pieces to get {next.off}% team discount.</p>}
              <button onClick={go} className="btn-primary w-full py-3.5">{t('checkout')}</button>
              <Link href="/shop" className="btn-ghost w-full">{t('continue_shopping')}</Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
