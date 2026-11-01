'use client';
import { useState } from 'react';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, Modal, Field, TriInput, ImagePicker } from '@/components/admin/ui';
import Img from '@/components/Img';
import { useStore } from '@/lib/store';

export default function Banners() {
  const banners = useStore((s) => s.banners);
  const gallery = useStore((s) => s.gallery);
  const { saveBanner, deleteBanner, moveBanner, addGallery, deleteGallery, showToast } = useStore.getState();
  const [edit, setEdit] = useState(null);
  return (
    <div className="space-y-6">
      <Card title="Homepage slider" action={<button onClick={() => setEdit({ id: '', image: '', title: { en: '' }, subtitle: { en: '' }, cta: { en: 'Shop now' }, link: '/shop', position: 'center' })} className="btn-primary py-2 text-sm"><Plus className="h-4 w-4" />Add slide</button>}>
        <p className="mb-4 text-sm text-slate">Wide photos (landscape) look best. Slides change every 7 seconds.</p>
        <ul className="space-y-3">
          {banners.map((b, i) => (
            <li key={b.id} className="flex items-center gap-4 rounded-xl p-2 ring-1 ring-line">
              <div className="relative aspect-video w-36 shrink-0 overflow-hidden rounded-lg bg-navy-50"><Img src={b.image} alt="" sizes="144px" className="object-cover" /></div>
              <div className="min-w-0 flex-1"><p className="truncate font-semibold">{b.title.en}</p><p className="truncate text-sm text-slate">{b.subtitle?.en}</p><p className="text-xs text-slate">Button: {b.cta?.en} → {b.link}</p></div>
              <div className="flex gap-1">
                <IB onClick={() => moveBanner(b.id, -1)} disabled={i === 0}><ArrowUp className="h-4 w-4" /></IB>
                <IB onClick={() => moveBanner(b.id, 1)} disabled={i === banners.length - 1}><ArrowDown className="h-4 w-4" /></IB>
                <IB onClick={() => setEdit(structuredClone(b))}><Pencil className="h-4 w-4" /></IB>
                <IB danger onClick={() => confirm('Delete this slide?') && deleteBanner(b.id)}><Trash2 className="h-4 w-4" /></IB>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="“Teams in our kits” gallery">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-6">
          {gallery.map((g) => (
            <div key={g.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-50">
              <Img src={g.image} alt="" sizes="200px" className="object-cover" />
              <button onClick={() => deleteGallery(g.id)} className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-crimson text-white opacity-0 group-hover:opacity-100 max-md:opacity-100" aria-label="Remove"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          ))}
          <ImagePicker value="" onChange={(v) => { if (v) { addGallery({ image: v, caption: '' }); showToast('Photo added'); } }} label="Add photo" aspect="aspect-[4/3]" />
        </div>
      </Card>
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? 'Edit slide' : 'New slide'} wide>
        {edit && (
          <form onSubmit={(e) => { e.preventDefault(); if (!edit.image) { showToast('Add an image', 'err'); return; } saveBanner(edit); setEdit(null); showToast('Slide saved'); }} className="space-y-4">
            <Field label="Image"><ImagePicker value={edit.image} onChange={(v) => setEdit({ ...edit, image: v })} max={2000} aspect="aspect-video" /></Field>
            <TriInput label="Heading" value={edit.title} onChange={(v) => setEdit({ ...edit, title: v })} required />
            <TriInput label="Text" value={edit.subtitle} onChange={(v) => setEdit({ ...edit, subtitle: v })} textarea rows={2} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TriInput label="Button text" value={edit.cta} onChange={(v) => setEdit({ ...edit, cta: v })} />
              <Field label="Button goes to"><select className="input" value={edit.link} onChange={(e) => setEdit({ ...edit, link: e.target.value })}>{[['/shop', 'Shop'], ['/custom-order', 'Team orders'], ['/#showroom', '3D showroom'], ['/about', 'About'], ['/contact', 'Contact']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></Field>
            </div>
            <Field label="Photo focus" hint="Which part of the photo stays visible on phones"><select className="input" value={edit.position} onChange={(e) => setEdit({ ...edit, position: e.target.value })}>{['center', 'center 30%', 'left center', 'right center', 'center top'].map((x) => <option key={x}>{x}</option>)}</select></Field>
            <button className="btn-primary w-full">Save slide</button>
          </form>
        )}
      </Modal>
    </div>
  );
}
function IB({ children, onClick, danger, disabled }) {
  return <button type="button" disabled={disabled} onClick={onClick} className={`grid h-9 w-9 place-items-center rounded-lg disabled:opacity-30 ${danger ? 'text-crimson hover:bg-crimson-100' : 'hover:bg-navy-50'}`}>{children}</button>;
}
