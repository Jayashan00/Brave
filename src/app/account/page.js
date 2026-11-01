'use client';
import Link from 'next/link';
import { useState } from 'react';
import { User, Package, LogOut, Loader2 } from 'lucide-react';
import PageHead from '@/components/PageHead';
import { useStore, useCurrentUser } from '@/lib/store';
import { DISTRICTS } from '@/lib/seed';
import { useT, fmt } from '@/lib/i18n';

const STEPS = ['pending', 'confirmed', 'in_production', 'dispatched', 'delivered'];

export default function Account() {
  const { t } = useT();
  const user = useCurrentUser();
  const hydrated = useStore((s) => s.hydrated);
  const orders = useStore((s) => s.orders.filter((o) => o.userId && o.userId === s.currentUserId));
  const { logout, openAuth, updateUser, showToast } = useStore.getState();
  const [tab, setTab] = useState('orders');

  if (!hydrated) return <div className="grid min-h-[50vh] place-items-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (!user) return (
    <div className="wrap grid place-items-center gap-4 py-24 text-center">
      <h1 className="font-slab text-3xl font-bold">{t('account')}</h1>
      <div className="flex gap-3"><button onClick={() => openAuth('signin')} className="btn-primary">{t('sign_in')}</button><button onClick={() => openAuth('signup')} className="btn-ghost">{t('create_account')}</button></div>
    </div>
  );

  return (
    <>
      <PageHead title={t('welcome', { n: user.name.split(' ')[0] })} crumbs={[{ label: t('account') }]} />
      <div className="wrap grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 lg:flex-col">
          <button onClick={() => setTab('orders')} className={`flex items-center gap-2 rounded-xl px-4 py-3 font-medium ${tab === 'orders' ? 'bg-navy text-white' : 'bg-white ring-1 ring-line'}`}><Package className="h-4 w-4" />{t('my_orders')}</button>
          <button onClick={() => setTab('profile')} className={`flex items-center gap-2 rounded-xl px-4 py-3 font-medium ${tab === 'profile' ? 'bg-navy text-white' : 'bg-white ring-1 ring-line'}`}><User className="h-4 w-4" />{t('account')}</button>
          <button onClick={logout} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-medium ring-1 ring-line hover:text-crimson"><LogOut className="h-4 w-4" />{t('sign_out')}</button>
        </nav>
        {tab === 'orders' ? (
          orders.length === 0 ? (
            <div className="card grid place-items-center gap-4 p-12 text-center"><p className="text-slate">{t('no_orders')}</p><Link href="/shop" className="btn-primary">{t('nav_shop')}</Link></div>
          ) : (
            <ul className="space-y-4">
              {orders.map((o) => {
                const idx = STEPS.indexOf(o.status);
                return (
                  <li key={o.id} className="rounded-2xl bg-white p-5 ring-1 ring-line">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-slab text-xl font-semibold">{o.id}</p>
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${o.status === 'cancelled' ? 'bg-crimson-100 text-crimson' : 'bg-gold-100'}`}>{t('st_' + o.status)}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate">{new Date(o.createdAt).toLocaleDateString('en-LK', { dateStyle: 'medium' })} · {o.items.reduce((s, i) => s + i.qty, 0)} {t('items')} · {fmt(o.total)}</p>
                    {o.status !== 'cancelled' && (
                      <ol className="mt-4 grid grid-cols-5 gap-1">
                        {STEPS.map((s, i) => (
                          <li key={s}><div className={`h-1.5 rounded-full ${i <= idx ? 'bg-navy' : 'bg-line'}`} /><p className={`mt-1.5 text-[11px] leading-tight sm:text-xs ${i <= idx ? 'font-semibold' : 'text-slate'}`}>{t('st_' + s)}</p></li>
                        ))}
                      </ol>
                    )}
                    <ul className="mt-4 space-y-1 text-sm">{o.items.map((i, k) => <li key={k}>{i.name} – {i.size} × {i.qty}</li>)}</ul>
                  </li>
                );
              })}
            </ul>
          )
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); const d = Object.fromEntries(new FormData(e.currentTarget)); updateUser(user.id, d); showToast(t('save')); }} className="grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-line sm:grid-cols-2">
            <div><label className="label">{t('name')}</label><input name="name" defaultValue={user.name} className="input" required /></div>
            <div><label className="label">{t('phone')}</label><input name="phone" defaultValue={user.phone} className="input" /></div>
            <div className="sm:col-span-2"><label className="label">{t('email')}</label><input disabled value={user.email} className="input opacity-60" /></div>
            <div className="sm:col-span-2"><label className="label">{t('address')}</label><input name="address" defaultValue={user.address} className="input" /></div>
            <div><label className="label">{t('city')}</label><input name="city" defaultValue={user.city} className="input" /></div>
            <div><label className="label">{t('district')}</label><select name="district" defaultValue={user.district} className="input">{DISTRICTS.map((d) => <option key={d}>{d}</option>)}</select></div>
            <button className="btn-primary w-fit">{t('save')}</button>
          </form>
        )}
      </div>
    </>
  );
}
