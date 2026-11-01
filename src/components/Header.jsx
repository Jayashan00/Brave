'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import Img from './Img';
import { useStore, useCurrentUser } from '@/lib/store';
import { useT, LANGS } from '@/lib/i18n';

export default function Header() {
  const { t, tx, lang } = useT();
  const settings = useStore((s) => s.settings);
  const categories = useStore((s) => s.categories);
  const products = useStore((s) => s.products);
  const cartCount = useStore((s) => s.cart.reduce((n, c) => n + c.qty, 0));
  const wishCount = useStore((s) => s.wishlist.length);
  const setLang = useStore((s) => s.setLang);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const openAuth = useStore((s) => s.openAuth);
  const user = useCurrentUser();
  const [mobile, setMobile] = useState(false);
  const [mega, setMega] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => { const f = () => setScrolled(window.scrollY > 8); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => { setMobile(false); setMega(false); setSearch(false); }, [pathname]);

  const cats = [...categories].sort((a, b) => a.order - b.order);
  const count = (id) => products.filter((p) => p.categoryId === id && p.published).length;
  const submit = (e) => { e.preventDefault(); if (q.trim()) router.push(`/shop?q=${encodeURIComponent(q.trim())}`); setSearch(false); };

  const links = [
    { href: '/', label: t('nav_home') },
    { href: '/shop', label: t('nav_shop') },
    { mega: true, label: t('nav_categories') },
    { href: '/#showroom', label: t('nav_showroom'), wide: true },
    { href: '/custom-order', label: t('nav_custom') },
    { href: '/about', label: t('nav_about'), wide: true },
    { href: '/contact', label: t('nav_contact') },
  ];

  return (
    <>
      <div className="bg-navy text-white">
        <div className="wrap flex h-9 items-center justify-between gap-4 text-[13px]">
          <div className="relative min-w-0 flex-1 overflow-hidden whitespace-nowrap">
            <span className="hidden text-white/85 md:inline">{tx(settings.announcement)}</span>
            <div className="ann-marquee flex w-max md:hidden"><span className="pr-12 text-white/85">{tx(settings.announcement)}</span><span className="pr-12 text-white/85" aria-hidden="true">{tx(settings.announcement)}</span></div>
          </div>
          <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hidden shrink-0 font-medium text-gold-300 hover:text-white sm:block">{settings.phone}</a>
        </div>
      </div>
      <header className={`sticky top-0 z-40 border-b transition-colors ${scrolled ? 'border-line bg-white/95 backdrop-blur' : 'border-transparent bg-chalk'}`} onMouseLeave={() => setMega(false)}>
        <div className="wrap flex h-16 items-center gap-2 sm:h-[72px] sm:gap-4">
          <button className="-ml-2 grid h-10 w-10 place-items-center rounded-full hover:bg-navy-50 lg:hidden" onClick={() => setMobile(true)} aria-label={t('menu')}><Menu className="h-5 w-5" /></button>
          <Link href="/" aria-label="Brave Sports Wears home"><Logo /></Link>
          <nav className="ml-4 hidden items-center gap-0.5 lg:flex xl:ml-6">
            {links.map((l) => l.mega ? (
              <button key="mega" onMouseEnter={() => setMega(true)} onClick={() => setMega((m) => !m)} className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 font-medium transition hover:bg-navy-50 ${lang === 'en' ? 'text-[15px]' : 'text-[14px]'} ${mega ? 'bg-navy-50' : ''}`}>
                {l.label}<ChevronDown className={`h-4 w-4 transition ${mega ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <Link key={l.href} href={l.href} onMouseEnter={() => setMega(false)} className={`whitespace-nowrap rounded-full px-3 py-2 font-medium transition hover:bg-navy-50 ${lang === 'en' ? 'text-[15px]' : 'text-[14px]'} ${l.wide ? 'hidden xl:block' : ''} ${pathname === l.href ? 'text-crimson' : ''}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <button onClick={() => setSearch((s) => !s)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-navy-50" aria-label={t('search')}><Search className="h-5 w-5" /></button>
            <div className="relative">
              <button onClick={() => setLangOpen((o) => !o)} className="flex h-10 items-center gap-1 rounded-full px-2.5 text-sm font-semibold hover:bg-navy-50" aria-label={t('lang')}>
                <Globe className="h-[18px] w-[18px]" /><span>{LANGS.find((l) => l.code === lang)?.short}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute right-0 top-12 z-50 w-40 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-deep" onMouseLeave={() => setLangOpen(false)}>
                    {LANGS.map((l) => (
                      <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }} className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[15px] hover:bg-navy-50 ${lang === l.code ? 'font-semibold text-crimson' : ''}`}>{l.label}{lang === l.code && <span className="h-1.5 w-1.5 rounded-full bg-crimson" />}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/wishlist" className="relative hidden h-10 w-10 place-items-center rounded-full hover:bg-navy-50 sm:grid" aria-label={t('wishlist')}>
              <Heart className="h-5 w-5" />{wishCount > 0 && <Badge n={wishCount} />}
            </Link>
            {user ? (
              <Link href="/account" className="hidden h-10 items-center gap-2 rounded-full pl-1 pr-3 hover:bg-navy-50 sm:flex" aria-label={t('account')}>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-sm font-bold text-navy">{user.name?.[0]?.toUpperCase()}</span>
                <span className="max-w-[90px] truncate text-sm font-medium">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <button onClick={() => openAuth('signin')} className="hidden h-10 w-10 place-items-center rounded-full hover:bg-navy-50 sm:grid" aria-label={t('account')}><User className="h-5 w-5" /></button>
            )}
            <button onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-full bg-navy text-white hover:bg-navy-700" aria-label={t('cart')}>
              <ShoppingBag className="h-[18px] w-[18px]" />{cartCount > 0 && <Badge n={cartCount} gold />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {search && (
            <motion.form onSubmit={submit} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line bg-white">
              <div className="wrap flex items-center gap-3 py-3">
                <Search className="h-5 w-5 text-slate" />
                <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search_ph')} className="w-full bg-transparent py-2 text-lg outline-none placeholder:text-slate/60" />
                <button className="btn-primary py-2">{t('search')}</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mega && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-deep lg:block">
              <div className="wrap grid grid-cols-[1fr_300px] gap-10 py-8">
                <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                  {cats.map((c) => (
                    <Link key={c.id} href={`/shop?cat=${c.slug}`} className="group flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-navy-50">
                      <span className="font-medium group-hover:text-crimson">{tx(c.name)}</span>
                      <span className="text-xs text-slate">{count(c.id)}</span>
                    </Link>
                  ))}
                </div>
                <Link href="/custom-order" className="group relative block overflow-hidden rounded-2xl bg-navy">
                  <div className="relative h-40"><Img src="/images/banners/b14.webp" alt="" className="object-cover opacity-70 transition duration-700 group-hover:scale-105" sizes="300px" /></div>
                  <div className="p-4 text-white"><p className="font-slab text-lg font-semibold">{t('cta_title')}</p><p className="mt-1 text-sm text-white/75">{t('cta_btn')}</p></div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-navy-900/50" onClick={() => setMobile(false)} />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.25 }} className="fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-white">
              <div className="flex items-center justify-between border-b border-line p-4"><Logo /><button onClick={() => setMobile(false)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-navy-50" aria-label={t('close')}><X className="h-5 w-5" /></button></div>
              <div className="flex-1 overflow-y-auto p-4">
                {links.filter((l) => !l.mega).map((l) => <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-3 text-lg font-medium hover:bg-navy-50">{l.label}</Link>)}
                <p className="mt-4 px-3 text-sm font-semibold text-slate">{t('nav_categories')}</p>
                {cats.map((c) => <Link key={c.id} href={`/shop?cat=${c.slug}`} className="block rounded-lg px-3 py-2.5 hover:bg-navy-50">{tx(c.name)}</Link>)}
              </div>
              <div className="border-t border-line p-4">
                <div className="mb-3 flex gap-2">{LANGS.map((l) => <button key={l.code} onClick={() => setLang(l.code)} className={`flex-1 rounded-full border py-2 text-sm font-semibold ${lang === l.code ? 'border-navy bg-navy text-white' : 'border-line'}`}>{l.label}</button>)}</div>
                {user ? <Link href="/account" className="btn-ghost w-full">{t('account')}</Link> : <button onClick={() => { setMobile(false); openAuth('signin'); }} className="btn-primary w-full">{t('sign_in')}</button>}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Badge({ n, gold }) {
  return <span className={`absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[11px] font-bold ${gold ? 'bg-gold text-navy' : 'bg-crimson text-white'}`}>{n}</span>;
}
