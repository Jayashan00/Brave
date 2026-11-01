'use client';
import Link from 'next/link';
import PageHead from '@/components/PageHead';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
export default function Wishlist() {
  const { t } = useT();
  const items = useStore((s) => s.products.filter((p) => s.wishlist.includes(p.id)));
  return (
    <>
      <PageHead title={t('wishlist')} crumbs={[{ label: t('wishlist') }]} />
      <div className="wrap py-10">
        {items.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          : <div className="card grid place-items-center gap-4 p-14 text-center"><p className="text-slate">{t('wishlist_empty')}</p><Link href="/shop" className="btn-primary">{t('nav_shop')}</Link></div>}
      </div>
    </>
  );
}
