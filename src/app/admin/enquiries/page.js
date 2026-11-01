'use client';
import { useState } from 'react';
import { Trash2, Mail, Phone } from 'lucide-react';
import Img from '@/components/Img';
import { WaIcon } from '@/components/Footer';
import { useStore, waLink } from '@/lib/store';
const ST = { new: 'New', replied: 'Replied', quoted: 'Quote sent', won: 'Order won', closed: 'Closed' };
export default function Enquiries() {
  const list = useStore((s) => s.inquiries);
  const { updateInquiry, deleteInquiry } = useStore.getState();
  const [f, setF] = useState('');
  const shown = list.filter((q) => !f || q.status === f);
  const intl = (p) => { const d = (p || '').replace(/\D/g, ''); return d.startsWith('0') ? '94' + d.slice(1) : d; };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{[['', 'All'], ...Object.entries(ST)].map(([k, l]) => <button key={k} onClick={() => setF(k)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${f === k ? 'bg-navy text-white' : 'bg-white ring-1 ring-line'}`}>{l}</button>)}</div>
      {!shown.length && <p className="rounded-2xl bg-white p-10 text-center text-slate ring-1 ring-line">Team-order requests and contact messages from the website appear here.</p>}
      <div className="grid gap-4 xl:grid-cols-2">
        {shown.map((q) => (
          <div key={q.id} className="rounded-2xl bg-white p-5 ring-1 ring-line">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div><p className="font-semibold">{q.name} {q.org && <span className="font-normal text-slate">· {q.org}</span>}</p><p className="text-xs text-slate">{q.type === 'bulk' ? 'Team / bulk order' : 'Contact message'} · {new Date(q.createdAt).toLocaleString('en-LK')}</p></div>
              <select value={q.status} onChange={(e) => updateInquiry(q.id, { status: e.target.value })} className="rounded-lg border border-line px-2 py-1 text-sm">{Object.entries(ST).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
            </div>
            {q.type === 'bulk' && <p className="mt-3 text-sm"><b>{q.garment}</b> · ~{q.quantity} pcs {q.date && `· needed by ${q.date}`}</p>}
            {q.message && <p className="mt-2 whitespace-pre-line text-sm text-navy/80">{q.message}</p>}
            {q.logo && <div className="relative mt-3 h-24 w-24 overflow-hidden rounded-lg bg-navy-50"><Img src={q.logo} alt="Logo" className="object-contain" /></div>}
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={waLink(intl(q.phone), `Hello ${q.name}, thank you for contacting Brave Sports Wears.`)} target="_blank" rel="noreferrer" onClick={() => q.status === 'new' && updateInquiry(q.id, { status: 'replied' })} className="btn-wa py-2 text-sm"><WaIcon className="h-4 w-4" />WhatsApp</a>
              <a href={`tel:${q.phone}`} className="btn-ghost py-2 text-sm"><Phone className="h-4 w-4" />{q.phone}</a>
              {q.email && <a href={`mailto:${q.email}`} className="btn-ghost py-2 text-sm"><Mail className="h-4 w-4" />Email</a>}
              <button onClick={() => confirm('Delete?') && deleteInquiry(q.id)} className="ml-auto grid h-9 w-9 place-items-center rounded-lg text-crimson hover:bg-crimson-100" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
