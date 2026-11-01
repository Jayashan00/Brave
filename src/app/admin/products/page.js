'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, Copy, Box, ExternalLink } from 'lucide-react';
import { Toggle } from '@/components/admin/ui';
import Img from '@/components/Img';
import { useStore, uid } from '@/lib/store';
import { fmt } from '@/lib/i18n';

export default function Products() {
  const products = useStore((s) => s.products);
  const cats = useStore((s) => s.categories);
  const { patchProduct, deleteProduct, saveProduct, showToast } = useStore.getState();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const list = products.filter((p) => (!cat || p.categoryId === cat) && (!q || p.name.en.toLowerCase().includes(q.toLowerCase())));
  const dup = (p) => { saveProduct({ ...p, id: uid('p-'), slug: p.slug + '-copy-' + uid().slice(0, 3), name: { ...p.name, en: p.name.en + ' (copy)' }, published: false }); showToast('Product duplicated – it is hidden until you publish it'); };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="input pl-9" /></div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="input w-auto"><option value="">All categories</option>{cats.map((c) => <option key={c.id} value={c.id}>{c.name.en}</option>)}</select>
        <Link href="/admin/products/edit?id=new" className="btn-primary"><Plus className="h-4 w-4" />Add product</Link>
      </div>
      <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
        <table className="w-full min-w-[860px] text-sm">
          <thead><tr className="border-b border-line text-left text-slate"><th className="p-3 font-medium">Product</th><th className="font-medium">Category</th><th className="font-medium">Price</th><th className="font-medium">Stock</th><th className="font-medium">Visible</th><th className="font-medium">Featured</th><th /></tr></thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-b border-line/60 last:border-0">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-navy-50"><Img src={p.images[0]} alt="" sizes="48px" className="object-cover" /></div>
                    <div className="min-w-0"><p className="truncate font-semibold">{p.name.en}</p><p className="flex items-center gap-1 text-xs text-slate">{p.images.length} photos{p.model3d?.mode !== 'panel' && <><Box className="ml-1 h-3 w-3" />3D</>}</p></div>
                  </div>
                </td>
                <td>{cats.find((c) => c.id === p.categoryId)?.name.en || '—'}</td>
                <td>{fmt(p.price)}</td>
                <td><input type="number" value={p.stock} onChange={(e) => patchProduct(p.id, { stock: +e.target.value })} className={`w-20 rounded-lg border px-2 py-1 ${p.stock < 10 && !p.madeToOrder ? 'border-gold text-gold-700' : 'border-line'}`} aria-label="Stock" /></td>
                <td><Toggle checked={p.published} onChange={(v) => patchProduct(p.id, { published: v })} /></td>
                <td><Toggle checked={p.featured} onChange={(v) => patchProduct(p.id, { featured: v })} /></td>
                <td className="pr-3">
                  <div className="flex justify-end gap-1">
                    <Link href={`/product/${p.slug}`} target="_blank" className="grid h-8 w-8 place-items-center rounded-lg hover:bg-navy-50" title="View"><ExternalLink className="h-4 w-4" /></Link>
                    <button onClick={() => dup(p)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-navy-50" title="Duplicate"><Copy className="h-4 w-4" /></button>
                    <Link href={`/admin/products/edit?id=${p.id}`} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-navy-50" title="Edit"><Pencil className="h-4 w-4" /></Link>
                    <button onClick={() => confirm(`Delete "${p.name.en}"?`) && deleteProduct(p.id)} className="grid h-8 w-8 place-items-center rounded-lg text-crimson hover:bg-crimson-100" title="Delete"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!list.length && <p className="p-8 text-center text-slate">No products match. <Link href="/admin/products/edit?id=new" className="font-semibold underline">Add one</Link>.</p>}
      </div>
    </div>
  );
}
