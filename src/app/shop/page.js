'use client';
import { Suspense, useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import PageHead from '@/components/PageHead';
import { useStore } from '@/lib/store';
import { useT, fmt } from '@/lib/i18n';
import { ADULT_SIZES, KIDS_SIZES } from '@/lib/seed';

export default function ShopPage() {
  return <Suspense fallback={null}><Shop /></Suspense>;
}

function Shop() {
  const { t, tx } = useT();
  const params = useSearchParams();
  const router = useRouter();
  const products = useStore((s) => s.products);
  const categories = useStore((s) => [...s.categories].sort((a, b) => a.order - b.order));
  const cat = params.get('cat') || '';
  const q = params.get('q') || '';
  const [sort, setSort] = useState('pop');
  const [sizes, setSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [stockOnly, setStockOnly] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const priceCap = Math.max(1000, ...products.map((p) => p.price));
  useEffect(() => { setMaxPrice(priceCap); }, [priceCap]);

  const setParam = (k, v) => { const sp = new URLSearchParams(params.toString()); if (v) sp.set(k, v); else sp.delete(k); router.replace(`/shop?${sp.toString()}`, { scroll: false }); };
  const current = categories.find((c) => c.slug === cat);

  const list = useMemo(() => {
    let l = products.filter((p) => p.published);
    if (current) l = l.filter((p) => p.categoryId === current.id);
    if (q) { const s = q.toLowerCase(); l = l.filter((p) => [p.name.en, p.name.si, p.name.ta, p.description?.en, ...(p.tags || [])].join(' ').toLowerCase().includes(s)); }
    if (sizes.length) l = l.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (maxPrice) l = l.filter((p) => p.price <= maxPrice);
    if (stockOnly) l = l.filter((p) => p.stock > 0);
    if (sort === 'low') l = [...l].sort((a, b) => a.price - b.price);
    if (sort === 'high') l = [...l].sort((a, b) => b.price - a.price);
    if (sort === 'new') l = [...l].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || (b.createdAt || 0) - (a.createdAt || 0));
    if (sort === 'pop') l = [...l].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return l;
  }, [products, current, q, sizes, maxPrice, stockOnly, sort]);

  const clear = () => { setSizes([]); setMaxPrice(priceCap); setStockOnly(false); router.replace('/shop', { scroll: false }); };
  const count = (id) => products.filter((p) => p.published && p.categoryId === id).length;

  const Filters = (
    <div className="space-y-8">
      <div>
        <p className="mb-3 font-slab text-lg font-semibold">{t('category')}</p>
        <ul className="space-y-1">
          <li><button onClick={() => setParam('cat', '')} className={`flex w-full justify-between rounded-lg px-3 py-2 text-left hover:bg-navy-50 ${!cat ? 'bg-navy-50 font-semibold' : ''}`}>{t('all')}<span className="text-sm text-slate">{products.filter((p) => p.published).length}</span></button></li>
          {categories.map((c) => (
            <li key={c.id}><button onClick={() => setParam('cat', c.slug)} className={`flex w-full justify-between gap-2 rounded-lg px-3 py-2 text-left hover:bg-navy-50 ${cat === c.slug ? 'bg-navy-50 font-semibold' : ''}`}>{tx(c.name)}<span className="text-sm text-slate">{count(c.id)}</span></button></li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-3 font-slab text-lg font-semibold">{t('size')}</p>
        <div className="flex flex-wrap gap-1.5">
          {[...ADULT_SIZES, ...KIDS_SIZES].map((s) => (
            <button key={s} onClick={() => setSizes((x) => (x.includes(s) ? x.filter((y) => y !== s) : [...x, s]))} className={`rounded-lg border px-2.5 py-1.5 text-sm font-medium ${sizes.includes(s) ? 'border-navy bg-navy text-white' : 'border-line bg-white hover:border-navy'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 flex justify-between font-slab text-lg font-semibold">{t('price')}<span className="font-sans text-sm font-medium text-slate">≤ {fmt(maxPrice)}</span></p>
        <input type="range" min={500} max={priceCap} step={100} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-navy" aria-label={t('price')} />
      </div>
      <label className="flex cursor-pointer items-center gap-3"><input type="checkbox" checked={stockOnly} onChange={(e) => setStockOnly(e.target.checked)} className="h-4 w-4 accent-navy" />{t('in_stock_only')}</label>
      <button onClick={clear} className="btn-ghost w-full">{t('clear')}</button>
    </div>
  );

  return (
    <>
      <PageHead title={q ? t('showing_for', { q }) : current ? tx(current.name) : t('nav_shop')} sub={current ? tx(current.blurb) : ''} crumbs={[{ label: t('nav_shop'), href: current || q ? '/shop' : '' }, ...(current ? [{ label: tx(current.name) }] : [])]} />
      <div className="wrap grid gap-10 py-10 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>
        <div>
          <div className="mb-6 flex items-center justify-between gap-3">
            <button onClick={() => setMobileOpen(true)} className="btn-ghost lg:hidden"><SlidersHorizontal className="h-4 w-4" />{t('filters')}</button>
            <p className="hidden text-slate lg:block">{t('results', { n: list.length })}</p>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input w-auto py-2" aria-label={t('sort')}>
              <option value="pop">{t('sort_pop')}</option><option value="new">{t('sort_new')}</option><option value="low">{t('sort_low')}</option><option value="high">{t('sort_high')}</option>
            </select>
          </div>
          {list.length ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">{list.map((p, i) => <ProductCard key={p.id} p={p} priority={i < 3} />)}</div>
          ) : (
            <div className="card grid place-items-center gap-4 p-14 text-center"><p className="max-w-sm text-slate">{t('no_results')}</p><button onClick={clear} className="btn-primary">{t('clear')}</button></div>
          )}
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-navy-900/50 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between"><p className="font-slab text-2xl font-semibold">{t('filters')}</p><button onClick={() => setMobileOpen(false)} aria-label={t('close')}><X /></button></div>
            {Filters}
          </div>
        </div>
      )}
    </>
  );
}
