'use client';
import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Modal, Field, TriInput, ImagePicker } from '@/components/admin/ui';
import Img from '@/components/Img';
import { useStore, slugify } from '@/lib/store';

export default function Categories() {
  const cats = useStore((s) => [...s.categories].sort((a, b) => a.order - b.order));
  const products = useStore((s) => s.products);
  const { saveCategory, deleteCategory, showToast } = useStore.getState();
  const [edit, setEdit] = useState(null);
  const save = (e) => { e.preventDefault(); saveCategory({ ...edit, slug: edit.slug || slugify(edit.name.en), order: +edit.order || cats.length + 1 }); setEdit(null); showToast('Category saved'); };
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-3"><p className="text-slate">Categories appear in the menu, shop filters and the homepage grid.</p><button onClick={() => setEdit({ id: '', slug: '', name: { en: '' }, blurb: { en: '' }, image: '', order: cats.length + 1 })} className="btn-primary"><Plus className="h-4 w-4" />Add category</button></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cats.map((c) => {
          const n = products.filter((p) => p.categoryId === c.id).length;
          return (
            <div key={c.id} className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
              <div className="relative aspect-[16/9] bg-navy-50">{c.image ? <Img src={c.image} alt="" sizes="400px" className="object-cover" /> : <p className="grid h-full place-items-center text-sm text-slate">No image – add one</p>}</div>
              <div className="flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1"><p className="truncate font-semibold">{c.name.en}</p><p className="text-sm text-slate">{n} products · position {c.order}</p></div>
                <button onClick={() => setEdit(structuredClone(c))} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-navy-50" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => { if (n) { showToast('Move or delete its products first', 'err'); return; } if (confirm(`Delete ${c.name.en}?`)) deleteCategory(c.id); }} className="grid h-9 w-9 place-items-center rounded-lg text-crimson hover:bg-crimson-100" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? 'Edit category' : 'New category'}>
        {edit && (
          <form onSubmit={save} className="space-y-4">
            <TriInput label="Name" value={edit.name} onChange={(v) => setEdit({ ...edit, name: v })} required />
            <TriInput label="Short description" value={edit.blurb} onChange={(v) => setEdit({ ...edit, blurb: v })} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Position in menu"><input type="number" className="input" value={edit.order} onChange={(e) => setEdit({ ...edit, order: e.target.value })} /></Field>
              <Field label="Web address"><input className="input" value={edit.slug} placeholder="auto" onChange={(e) => setEdit({ ...edit, slug: slugify(e.target.value) })} /></Field>
            </div>
            <Field label="Image"><ImagePicker value={edit.image} onChange={(v) => setEdit({ ...edit, image: v })} aspect="aspect-video" /></Field>
            <button className="btn-primary w-full">Save category</button>
          </form>
        )}
      </Modal>
    </div>
  );
}
