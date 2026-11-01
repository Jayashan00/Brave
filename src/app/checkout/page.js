'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CheckCircle2, Lock, Banknote, Landmark, CreditCard, Loader2 } from 'lucide-react';
import PageHead from '@/components/PageHead';
import Img from '@/components/Img';
import { WaIcon } from '@/components/Footer';
import { useStore, cartTotals, useCurrentUser, waLink } from '@/lib/store';
import { DISTRICTS } from '@/lib/seed';
import { useT, fmt } from '@/lib/i18n';

export default function Checkout() {
  const { t, tx } = useT();
  const state = useStore();
  const user = useCurrentUser();
  const totals = cartTotals(state);
  const [f, setF] = useState({ name: '', phone: '', email: '', address: '', city: '', district: 'Kandy', notes: '' });
  const [pay, setPay] = useState('cod');
  const [done, setDone] = useState(null);
  useEffect(() => { if (user) setF((x) => ({ ...x, name: x.name || user.name, phone: x.phone || user.phone, email: x.email || user.email, address: x.address || user.address || '', city: x.city || user.city || '', district: user.district || x.district })); }, [user]);

  if (!state.hydrated) return <div className="grid min-h-[50vh] place-items-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  if (done) {
    const msg = `Order ${done.id}\n${done.items.map((i) => `• ${i.name} (${i.size}, ${i.color}) × ${i.qty}`).join('\n')}\nTotal: ${fmt(done.total)}\n${done.customer.name}, ${done.customer.phone}\n${done.customer.address}, ${done.customer.city}, ${done.customer.district}\nPayment: ${done.payment}`;
    return (
      <div className="wrap grid place-items-center py-20 text-center">
        <CheckCircle2 className="h-16 w-16 text-[#1FA855]" />
        <h1 className="mt-4 font-slab text-4xl font-bold">{t('order_placed')}</h1>
        <p className="mt-3 max-w-md text-slate">{t('order_placed_sub', { id: done.id })}</p>
        {done.payment === 'bank' && <BankBox />}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={waLink(state.settings.whatsapp, msg)} target="_blank" rel="noreferrer" className="btn-wa"><WaIcon className="h-5 w-5" />{t('send_wa_copy')}</a>
          <Link href="/account" className="btn-ghost">{t('my_orders')}</Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="wrap grid place-items-center py-24 text-center">
        <Lock className="h-10 w-10" />
        <h1 className="mt-4 font-slab text-3xl font-bold">{t('signin_needed')}</h1>
        <p className="mt-2 max-w-md text-slate">{t('signin_needed_sub')}</p>
        <div className="mt-6 flex gap-3"><button onClick={() => state.openAuth('signin', '/checkout')} className="btn-primary">{t('sign_in')}</button><button onClick={() => state.openAuth('signup', '/checkout')} className="btn-ghost">{t('create_account')}</button></div>
      </div>
    );
  }

  if (!totals.lines.length) return <div className="wrap grid place-items-center gap-4 py-24 text-center"><p className="text-slate">{t('cart_empty')}</p><Link href="/shop" className="btn-primary">{t('continue_shopping')}</Link></div>;

  const submit = (e) => {
    e.preventDefault();
    const order = state.placeOrder({
      userId: user.id, customer: { ...f }, payment: pay,
      items: totals.lines.map((l) => ({ productId: l.productId, name: tx(l.product.name), price: l.product.price, qty: l.qty, size: l.size, color: l.color, image: l.product.images[0] })),
      subtotal: totals.subtotal, discount: totals.discount, delivery: totals.delivery, total: totals.total,
    });
    state.updateUser(user.id, { address: f.address, city: f.city, district: f.district, phone: f.phone });
    setDone(order); window.scrollTo(0, 0);
  };
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <>
      <PageHead title={t('checkout')} crumbs={[{ label: t('cart_title'), href: '/cart' }, { label: t('checkout') }]} />
      <form onSubmit={submit} className="wrap grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section className="rounded-2xl bg-white p-6 ring-1 ring-line">
            <h2 className="font-slab text-2xl font-semibold">{t('shipping')}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><label className="label" htmlFor="c-n">{t('name')}</label><input id="c-n" className="input" required value={f.name} onChange={on('name')} /></div>
              <div><label className="label" htmlFor="c-p">{t('phone')}</label><input id="c-p" className="input" type="tel" required value={f.phone} onChange={on('phone')} /></div>
              <div className="sm:col-span-2"><label className="label" htmlFor="c-a">{t('address')}</label><input id="c-a" className="input" required value={f.address} onChange={on('address')} /></div>
              <div><label className="label" htmlFor="c-c">{t('city')}</label><input id="c-c" className="input" required value={f.city} onChange={on('city')} /></div>
              <div><label className="label" htmlFor="c-d">{t('district')}</label><select id="c-d" className="input" value={f.district} onChange={on('district')}>{DISTRICTS.map((d) => <option key={d}>{d}</option>)}</select></div>
              <div className="sm:col-span-2"><label className="label" htmlFor="c-no">{t('notes')}</label><textarea id="c-no" rows={3} className="input" value={f.notes} onChange={on('notes')} /></div>
            </div>
          </section>
          <section className="rounded-2xl bg-white p-6 ring-1 ring-line">
            <h2 className="font-slab text-2xl font-semibold">{t('payment')}</h2>
            <div className="mt-5 grid gap-3">
              {[['cod', Banknote, t('cod')], ['bank', Landmark, t('bank')], ['card', CreditCard, t('card')]].map(([k, I, l]) => (
                <label key={k} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${pay === k ? 'border-navy bg-navy-50' : 'border-line'} ${k === 'card' ? 'pointer-events-none opacity-50' : ''}`}>
                  <input type="radio" name="pay" checked={pay === k} onChange={() => setPay(k)} disabled={k === 'card'} className="accent-navy" /><I className="h-5 w-5" /><span className="font-medium">{l}</span>
                </label>
              ))}
              {pay === 'bank' && <BankBox />}
            </div>
          </section>
        </div>
        <aside className="h-fit rounded-2xl bg-white p-6 ring-1 ring-line lg:sticky lg:top-24">
          <ul className="space-y-3">
            {totals.lines.map((l) => (
              <li key={l.key} className="flex gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-navy-50"><Img src={l.product.images[0]} alt="" sizes="56px" className="object-cover" /><span className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-navy px-1 text-[11px] font-bold text-white">{l.qty}</span></div>
                <div className="min-w-0 flex-1 text-sm"><p className="line-clamp-2 font-medium">{tx(l.product.name)}</p><p className="text-slate">{l.size} · {l.color}</p></div>
                <span className="text-sm font-semibold">{fmt(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t border-line pt-4 text-[15px]">
            <div className="flex justify-between"><span>{t('subtotal')}</span><span>{fmt(totals.subtotal)}</span></div>
            {totals.discount > 0 && <div className="flex justify-between text-[#178C46]"><span>{t('bulk_discount', { n: totals.tierOff })}</span><span>− {fmt(totals.discount)}</span></div>}
            <div className="flex justify-between"><span>{t('delivery')}</span><span>{totals.delivery ? fmt(totals.delivery) : t('free')}</span></div>
            <div className="flex justify-between pt-2 text-lg font-bold"><span>{t('total')}</span><span>{fmt(totals.total)}</span></div>
          </div>
          <button className="btn-primary mt-5 w-full py-3.5 text-base">{t('place_order')}</button>
        </aside>
      </form>
    </>
  );
}

function BankBox() {
  const { t } = useT();
  const b = useStore((s) => s.settings.bank);
  return (
    <div className="mt-2 rounded-xl bg-gold-100 p-4 text-left text-sm">
      <p className="mb-2">{t('bank_details')}</p>
      <p><b>{b.name}</b> – {b.branch}</p><p>{b.holder}</p><p className="font-mono font-semibold">{b.account}</p>
    </div>
  );
}
