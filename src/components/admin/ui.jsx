'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Upload, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Img from '../Img';
import { fileToDataUrl } from '@/lib/store';

export function Card({ title, action, children, className = '' }) {
  return (
    <section className={`rounded-2xl bg-white p-5 ring-1 ring-line ${className}`}>
      {(title || action) && <div className="mb-4 flex items-center justify-between gap-3"><h2 className="font-slab text-lg font-semibold">{title}</h2>{action}</div>}
      {children}
    </section>
  );
}

export function Field({ label, hint, children, className = '' }) {
  return <div className={className}><label className="label">{label}</label>{children}{hint && <p className="mt-1 text-xs text-slate">{hint}</p>}</div>;
}

const LN = [['en', 'English'], ['si', 'සිංහල'], ['ta', 'தமிழ்']];
export function TriInput({ label, value = {}, onChange, textarea = false, rows = 3, required = false }) {
  const [l, setL] = useState('en');
  const v = typeof value === 'string' ? { en: value } : value || {};
  const C = textarea ? 'textarea' : 'input';
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="label mb-0">{label}</span>
        <div className="flex rounded-full bg-navy-50 p-0.5 text-xs">
          {LN.map(([k, n]) => <button type="button" key={k} onClick={() => setL(k)} className={`rounded-full px-2.5 py-1 font-semibold ${l === k ? 'bg-white shadow-lift' : 'text-slate'}`}>{n}{!v[k] && k !== 'en' && <span className="ml-1 text-crimson">•</span>}</button>)}
        </div>
      </div>
      <C className="input" rows={rows} required={required && l === 'en'} value={v[l] || ''} onChange={(e) => onChange({ ...v, [l]: e.target.value })} placeholder={l === 'en' ? '' : v.en ? `(falls back to English) ${v.en.slice(0, 40)}` : ''} />
    </div>
  );
}

export function ImagePicker({ value, onChange, multiple = false, max = 1400, label = 'Upload', aspect = 'aspect-square' }) {
  const [busy, setBusy] = useState(false);
  const list = multiple ? value || [] : value ? [value] : [];
  const add = async (files) => {
    setBusy(true);
    const urls = [];
    for (const f of files) urls.push(await fileToDataUrl(f, max));
    setBusy(false);
    onChange(multiple ? [...list, ...urls] : urls[0]);
  };
  const move = (i, d) => { const a = [...list]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; onChange(a); };
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {list.map((src, i) => (
        <div key={i} className={`group relative ${aspect} overflow-hidden rounded-xl bg-navy-50 ring-1 ring-line`}>
          <Img src={src} alt="" sizes="120px" className="object-cover" />
          {multiple && i === 0 && <span className="absolute left-1 top-1 rounded bg-navy px-1.5 py-0.5 text-[10px] font-bold text-white">MAIN</span>}
          <div className="absolute inset-x-1 bottom-1 flex justify-between opacity-0 transition group-hover:opacity-100 max-md:opacity-100">
            {multiple ? <span className="flex gap-1"><Mini onClick={() => move(i, -1)}><ChevronLeft className="h-3 w-3" /></Mini><Mini onClick={() => move(i, 1)}><ChevronRight className="h-3 w-3" /></Mini></span> : <span />}
            <Mini onClick={() => onChange(multiple ? list.filter((_, k) => k !== i) : '')} danger><X className="h-3 w-3" /></Mini>
          </div>
        </div>
      ))}
      {(multiple || list.length === 0) && (
        <label className={`grid ${aspect} cursor-pointer place-items-center rounded-xl border-2 border-dashed border-navy/20 text-center text-xs font-semibold text-slate hover:border-navy hover:text-navy`}>
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="grid place-items-center gap-1"><Upload className="h-5 w-5" />{label}</span>}
          <input type="file" accept="image/*" multiple={multiple} className="hidden" onChange={(e) => { const f = [...(e.target.files || [])]; if (f.length) add(f); e.target.value = ''; }} />
        </label>
      )}
    </div>
  );
}
function Mini({ children, onClick, danger }) {
  return <button type="button" onClick={onClick} className={`grid h-6 w-6 place-items-center rounded-full ${danger ? 'bg-crimson text-white' : 'bg-white text-navy'} shadow`}>{children}</button>;
}

export function Modal({ open, onClose, title, children, wide }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-navy-900/55 p-4" onClick={onClose}>
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} onClick={(e) => e.stopPropagation()} className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 ${wide ? 'max-w-3xl' : 'max-w-lg'}`}>
            <div className="mb-5 flex items-center justify-between"><h3 className="font-slab text-xl font-semibold">{title}</h3><button onClick={onClose} aria-label="Close"><X /></button></div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-2.5" aria-pressed={checked}>
      <span className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-[#1FA855]' : 'bg-line'}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${checked ? 'left-[22px]' : 'left-0.5'}`} /></span>
      {label && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}

export const STATUS = { pending: 'bg-gold-100 text-gold-700', confirmed: 'bg-navy-50 text-navy', in_production: 'bg-[#EDE7F6] text-[#5B2C8F]', dispatched: 'bg-[#E0F2FE] text-[#0369A1]', delivered: 'bg-[#DCFCE7] text-[#15803D]', cancelled: 'bg-crimson-100 text-crimson' };
export const STATUS_LABEL = { pending: 'Pending', confirmed: 'Confirmed', in_production: 'In production', dispatched: 'Dispatched', delivered: 'Delivered', cancelled: 'Cancelled' };
export function StatusPill({ s }) { return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS[s] || ''}`}>{STATUS_LABEL[s] || s}</span>; }
