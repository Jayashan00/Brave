'use client';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Save, Box } from 'lucide-react';
import Link from 'next/link';
import { Card, Field, TriInput, ImagePicker, Toggle } from '@/components/admin/ui';
import Viewer3D from '@/components/three/Viewer3D';
import { useStore, uid, slugify } from '@/lib/store';
import { ADULT_SIZES, KIDS_SIZES, PALETTE } from '@/lib/seed';

const blank = () => ({ id: '', slug: '', categoryId: '', name: { en: '', si: '', ta: '' }, description: { en: '', si: '', ta: '' }, price: 0, compareAt: 0, images: [], model3d: { front: '', back: '', mode: 'auto' }, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'As shown', hex: '' }], fabric: '', stock: 50, featured: false, isNew: true, published: true, tags: [], madeToOrder: false });

export default function EditWrap() { return <Suspense fallback={null}><Edit /></Suspense>; }

function Edit() {
  const id = useSearchParams().get('id');
  const router = useRouter();
  const existing = useStore((s) => s.products.find((p) => p.id === id));
  const cats = useStore((s) => s.categories);
  const { saveProduct, showToast } = useStore.getState();
  const [p, setP] = useState(null);
  const [preview, setPreview] = useState(0);
  useEffect(() => { if (!p) setP(existing ? structuredClone(existing) : { ...blank(), categoryId: cats[0]?.id || '' }); }, [existing, cats, p]);
  if (!p) return null;
  const set = (k, v) => setP((x) => ({ ...x, [k]: v }));
  const set3d = (k, v) => setP((x) => ({ ...x, model3d: { ...x.model3d, [k]: v } }));
  const toggleSize = (s) => set('sizes', p.sizes.includes(s) ? p.sizes.filter((x) => x !== s) : [...ADULT_SIZES, ...KIDS_SIZES].filter((x) => x === s || p.sizes.includes(x)));
  const toggleColour = (c) => set('colors', p.colors.some((x) => x.name === c.name) ? p.colors.filter((x) => x.name !== c.name) : [...p.colors, c]);

  const save = (e) => {
    e.preventDefault();
    if (!p.images.length) { showToast('Add at least one photo', 'err'); return; }
    const out = { ...p, id: p.id || uid('p-'), slug: p.slug || slugify(p.name.en), price: +p.price, compareAt: +p.compareAt || 0, stock: +p.stock, createdAt: p.createdAt || Date.now() };
    saveProduct(out); showToast('Product saved'); router.push('/admin/products');
  };
  const frontOpts = p.images;

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/products" className="flex items-center gap-2 font-semibold"><ArrowLeft className="h-4 w-4" />Products</Link>
        <div className="flex items-center gap-4"><Toggle checked={p.published} onChange={(v) => set('published', v)} label="Visible on website" /><button className="btn-primary"><Save className="h-4 w-4" />Save product</button></div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Card title="Details">
            <div className="space-y-4">
              <TriInput label="Product name" value={p.name} onChange={(v) => set('name', v)} required />
              <TriInput label="Description" value={p.description} onChange={(v) => set('description', v)} textarea rows={4} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Category"><select className="input" value={p.categoryId} onChange={(e) => set('categoryId', e.target.value)}>{cats.map((c) => <option key={c.id} value={c.id}>{c.name.en}</option>)}</select></Field>
                <Field label="Fabric"><input className="input" value={p.fabric} onChange={(e) => set('fabric', e.target.value)} placeholder="e.g. Micro-mesh polyester, 160 GSM" /></Field>
                <Field label="Web address" hint={`/product/${p.slug || slugify(p.name.en)}`}><input className="input" value={p.slug} onChange={(e) => set('slug', slugify(e.target.value))} placeholder="auto from name" /></Field>
                <Field label="Search tags" hint="Comma separated"><input className="input" value={(p.tags || []).join(', ')} onChange={(e) => set('tags', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} /></Field>
              </div>
            </div>
          </Card>
          <Card title="Photos">
            <p className="mb-3 text-sm text-slate">The first photo is the main one. Use the arrows to reorder.</p>
            <ImagePicker multiple value={p.images} onChange={(v) => set('images', v)} label="Add photos" />
          </Card>
          <Card title="Price & stock">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Price (Rs.)"><input type="number" min={0} required className="input" value={p.price} onChange={(e) => set('price', e.target.value)} /></Field>
              <Field label="Was price (Rs.)" hint="Shows a sale badge"><input type="number" min={0} className="input" value={p.compareAt} onChange={(e) => set('compareAt', e.target.value)} /></Field>
              <Field label="Stock"><input type="number" min={0} className="input" value={p.stock} onChange={(e) => set('stock', e.target.value)} /></Field>
            </div>
            <div className="mt-4 flex flex-wrap gap-6"><Toggle checked={p.featured} onChange={(v) => set('featured', v)} label="Best seller" /><Toggle checked={p.isNew} onChange={(v) => set('isNew', v)} label="New in" /><Toggle checked={!!p.madeToOrder} onChange={(v) => set('madeToOrder', v)} label="Made to order" /></div>
          </Card>
          <Card title="Sizes & colours">
            <p className="mb-2 text-sm font-semibold">Adult</p>
            <div className="flex flex-wrap gap-1.5">{ADULT_SIZES.map((s) => <Chip key={s} on={p.sizes.includes(s)} onClick={() => toggleSize(s)}>{s}</Chip>)}</div>
            <p className="mb-2 mt-4 text-sm font-semibold">Kids</p>
            <div className="flex flex-wrap gap-1.5">{KIDS_SIZES.map((s) => <Chip key={s} on={p.sizes.includes(s)} onClick={() => toggleSize(s)}>{s}</Chip>)}</div>
            <p className="mb-2 mt-5 text-sm font-semibold">Colour options shown on the product page</p>
            <div className="flex flex-wrap gap-2">
              {[{ name: 'As shown', hex: '' }, ...PALETTE].map((c) => (
                <button type="button" key={c.name} onClick={() => toggleColour(c)} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${p.colors.some((x) => x.name === c.name) ? 'border-navy bg-navy text-white' : 'border-line'}`}>
                  <span className="h-4 w-4 rounded-full border border-white/40" style={{ background: c.hex || 'conic-gradient(#16233F 0 25%,#D9A21B 0 50%,#A62830 0 75%,#fff 0)' }} />{c.name}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title={<span className="flex items-center gap-2"><Box className="h-5 w-5 text-crimson" />3D view</span>}>
            <div className="space-y-4">
              <Field label="How to make the 3D model">
                <select className="input" value={p.model3d.mode} onChange={(e) => set3d('mode', e.target.value)}>
                  <option value="auto">Cut out the garment automatically (plain background photos)</option>
                  <option value="cutout">I will upload a transparent PNG cut-out</option>
                  <option value="panel">Show the photo as a 3D card</option>
                </select>
              </Field>
              {p.model3d.mode === 'cutout' ? (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Front cut-out (PNG)"><ImagePicker value={p.model3d.front} onChange={(v) => set3d('front', v)} label="Front" /></Field>
                  <Field label="Back cut-out (optional)"><ImagePicker value={p.model3d.back} onChange={(v) => set3d('back', v)} label="Back" /></Field>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Front photo">
                    <select className="input" value={frontOpts.indexOf(p.model3d.front)} onChange={(e) => set3d('front', frontOpts[+e.target.value] || '')}>
                      <option value={-1}>Main photo</option>{frontOpts.map((_, i) => <option key={i} value={i}>Photo {i + 1}</option>)}
                    </select>
                  </Field>
                  <Field label="Back photo">
                    <select className="input" value={frontOpts.indexOf(p.model3d.back)} onChange={(e) => set3d('back', frontOpts[+e.target.value] || '')}>
                      <option value={-1}>None (plain back)</option>{frontOpts.map((_, i) => <option key={i} value={i}>Photo {i + 1}</option>)}
                    </select>
                  </Field>
                </div>
              )}
              <p className="text-xs leading-relaxed text-slate">Tip: a garment laid flat on a plain, light background gives the best automatic cut-out. If the cut-out looks wrong, choose “3D card”.</p>
              {(p.model3d.front || p.images[0]) ? (
                <>
                  <button type="button" onClick={() => setPreview((n) => n + 1)} className="btn-ghost w-full">Refresh 3D preview</button>
                  <Viewer3D key={preview + p.model3d.mode + (p.model3d.front || p.images[0]).slice(-40) + (p.model3d.back || '').slice(-20)} product={{ ...p, model3d: { ...p.model3d, front: p.model3d.front || p.images[0] } }} compact showSizes={false} />
                </>
              ) : <p className="rounded-xl bg-navy-50 p-6 text-center text-sm text-slate">Add a photo to see the 3D preview.</p>}
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}

function Chip({ on, onClick, children }) {
  return <button type="button" onClick={onClick} className={`min-w-[44px] rounded-lg border px-2.5 py-1.5 text-sm font-semibold ${on ? 'border-navy bg-navy text-white' : 'border-line hover:border-navy'}`}>{children}</button>;
}
