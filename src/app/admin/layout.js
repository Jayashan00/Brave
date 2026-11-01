'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, Shirt, FolderTree, ShoppingCart, Users, Inbox, Images, Settings, LogOut, ExternalLink, Menu, X, Loader2, Lock } from 'lucide-react';
import Logo from '@/components/Logo';
import { useStore, useIsAdmin, DEFAULT_ADMIN_PASS } from '@/lib/store';

const NAV = [
  ['/admin', 'Dashboard', LayoutDashboard], ['/admin/products', 'Products', Shirt], ['/admin/categories', 'Categories', FolderTree],
  ['/admin/orders', 'Orders', ShoppingCart], ['/admin/customers', 'Customers', Users], ['/admin/enquiries', 'Enquiries', Inbox],
  ['/admin/banners', 'Banners & gallery', Images], ['/admin/settings', 'Site settings', Settings],
];

export default function AdminLayout({ children }) {
  const hydrated = useStore((s) => s.hydrated);
  const isAdmin = useIsAdmin();
  const pathname = usePathname();
  const logout = useStore((s) => s.adminLogout);
  const pending = useStore((s) => s.orders.filter((o) => o.status === 'pending').length);
  const newQ = useStore((s) => s.inquiries.filter((q) => q.status === 'new').length);
  const [open, setOpen] = useState(false);

  if (!hydrated) return <div className="grid min-h-screen place-items-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (!isAdmin) return <Login />;

  const badge = { '/admin/orders': pending, '/admin/enquiries': newQ };
  const Side = (
    <nav className="flex h-full flex-col gap-1 p-4">
      <div className="mb-6 px-2"><Logo light /></div>
      {NAV.map(([href, label, I]) => {
        const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
        return (
          <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition ${active ? 'bg-white text-navy' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>
            <I className="h-[18px] w-[18px]" />{label}{badge[href] > 0 && <span className="ml-auto rounded-full bg-gold px-2 text-xs font-bold text-navy">{badge[href]}</span>}
          </Link>
        );
      })}
      <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/75 hover:bg-white/10 hover:text-white"><ExternalLink className="h-[18px] w-[18px]" />View website</Link>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-white/75 hover:bg-white/10 hover:text-white"><LogOut className="h-[18px] w-[18px]" />Sign out</button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-chalk lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="sticky top-0 hidden h-screen bg-navy lg:block">{Side}</aside>
      {open && <div className="fixed inset-0 z-50 bg-navy-900/50 lg:hidden" onClick={() => setOpen(false)}><aside className="h-full w-[260px] bg-navy" onClick={(e) => e.stopPropagation()}>{Side}</aside></div>}
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Menu"><Menu /></button>
          <p className="font-slab text-lg font-semibold">{NAV.find(([h]) => (h === '/admin' ? pathname === '/admin' : pathname.startsWith(h)))?.[1] || 'Admin'}</p>
          <span className="ml-auto hidden text-sm text-slate sm:block">Signed in as admin</span>
        </header>
        <div className="min-w-0 p-3 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

function Login() {
  const login = useStore((s) => s.adminLogin);
  const email = useStore((s) => s.settings.adminEmail);
  const custom = useStore((s) => !!s.settings.adminPassHash);
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  return (
    <div className="grid min-h-screen place-items-center bg-navy p-4">
      <form onSubmit={async (e) => { e.preventDefault(); if (!(await login(f.email, f.password))) setErr('Email or password is incorrect.'); }} className="w-full max-w-sm rounded-3xl bg-white p-8">
        <Logo />
        <h1 className="mt-6 flex items-center gap-2 font-slab text-2xl font-bold"><Lock className="h-5 w-5" />Admin sign in</h1>
        <div className="mt-5 space-y-3">
          <div><label className="label" htmlFor="ae">Email</label><input id="ae" className="input" type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
          <div><label className="label" htmlFor="ap">Password</label><input id="ap" className="input" type="password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></div>
          {err && <p className="text-sm font-medium text-crimson">{err}</p>}
          <button className="btn-primary w-full py-3">Sign in</button>
        </div>
        {!custom && (
          <button type="button" onClick={() => setF({ email, password: DEFAULT_ADMIN_PASS })} className="mt-5 w-full rounded-xl bg-gold-100 p-3 text-left text-xs leading-relaxed">
            <b>Demo login</b> (tap to fill)<br />{email} / {DEFAULT_ADMIN_PASS}<br />Change it in Site settings.
          </button>
        )}
        <Link href="/" className="mt-4 block text-center text-sm text-slate hover:text-navy">← Back to website</Link>
      </form>
    </div>
  );
}
