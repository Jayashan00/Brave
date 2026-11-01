'use client';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Trash2, Printer, Phone } from 'lucide-react';
import { Modal, StatusPill, STATUS_LABEL } from '@/components/admin/ui';
import { WaIcon } from '@/components/Footer';
import { useStore, waLink } from '@/lib/store';
import { fmt } from '@/lib/i18n';

export default function OrdersWrap() { return <Suspense fallback={null}><Orders /></Suspense>; }

function Orders() {
  const orders = useStore((s) => s.orders);
  const { setOrderStatus, deleteOrder } = useStore.getState();
  const [status, setStatus] = useState(useSearchParams().get('status') || '');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);
  const list = orders.filter((o) => (!status || o.status === status) && (!q || `${o.id} ${o.customer?.name} ${o.customer?.phone}`.toLowerCase().includes(q.toLowerCase())));
  const o = orders.find((x) => x.id === open);
  const phoneIntl = (p) => { const d = (p || '').replace(/\D/g, ''); return d.startsWith('0') ? '94' + d.slice(1) : d; };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[['', 'All'], ...Object.entries(STATUS_LABEL)].map(([k, l]) => (
          <button key={k} onClick={() => setStatus(k)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${status === k ? 'bg-navy text-white' : 'bg-white ring-1 ring-line'}`}>{l} <span className="opacity-60">{k ? orders.filter((x) => x.status === k).length : orders.length}</span></button>
        ))}
      </div>
      <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Order no, name or phone" className="input pl-9" /></div>
      <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
        <table className="w-full min-w-[760px] text-sm">
          <thead><tr className="border-b border-line text-left text-slate"><th className="p-3 font-medium">Order</th><th className="font-medium">Customer</th><th className="font-medium">Date</th><th className="font-medium">Items</th><th className="font-medium">Total</th><th className="font-medium">Payment</th><th className="font-medium">Status</th></tr></thead>
          <tbody>
            {list.map((x) => (
              <tr key={x.id} onClick={() => setOpen(x.id)} className="cursor-pointer border-b border-line/60 hover:bg-chalk">
                <td className="p-3 font-semibold">{x.id}{x.sample && <span className="ml-1.5 rounded bg-gold-100 px-1.5 text-[10px]">SAMPLE</span>}</td>
                <td>{x.customer?.name}<br /><span className="text-xs text-slate">{x.customer?.district}</span></td>
                <td>{new Date(x.createdAt).toLocaleString('en-LK', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td>{x.items.reduce((s, i) => s + i.qty, 0)}</td><td className="font-semibold">{fmt(x.total)}</td>
                <td className="uppercase">{x.payment}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <select value={x.status} onChange={(e) => setOrderStatus(x.id, e.target.value)} className="rounded-lg border border-line bg-white px-2 py-1">{Object.entries(STATUS_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!list.length && <p className="p-8 text-center text-slate">No orders here yet.</p>}
      </div>

      <Modal open={!!o} onClose={() => setOpen(null)} title={o ? `Order ${o.id}` : ''} wide>
        {o && (
          <div id="invoice" className="space-y-5">
            <div className="flex flex-wrap items-center gap-3"><StatusPill s={o.status} /><span className="text-sm text-slate">{new Date(o.createdAt).toLocaleString('en-LK')}</span></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-chalk p-4 text-sm"><p className="mb-1 font-semibold">Customer</p><p>{o.customer?.name}</p><p>{o.customer?.phone}</p><p>{o.customer?.email}</p></div>
              <div className="rounded-xl bg-chalk p-4 text-sm"><p className="mb-1 font-semibold">Deliver to</p><p>{o.customer?.address}</p><p>{o.customer?.city} {o.customer?.district}</p>{o.customer?.notes && <p className="mt-2 italic">“{o.customer.notes}”</p>}</div>
            </div>
            <table className="w-full text-sm"><tbody>{o.items.map((i, k) => <tr key={k} className="border-b border-line"><td className="py-2">{i.name}<br /><span className="text-slate">{i.size} · {i.color}</span></td><td>× {i.qty}</td><td className="text-right">{fmt(i.price * i.qty)}</td></tr>)}</tbody></table>
            <div className="ml-auto max-w-xs space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{fmt(o.subtotal)}</span></div>
              {o.discount > 0 && <div className="flex justify-between"><span>Team discount</span><span>− {fmt(o.discount)}</span></div>}
              <div className="flex justify-between"><span>Delivery</span><span>{fmt(o.delivery)}</span></div>
              <div className="flex justify-between text-base font-bold"><span>Total</span><span>{fmt(o.total)}</span></div>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-line pt-4 print:hidden">
              <select value={o.status} onChange={(e) => setOrderStatus(o.id, e.target.value)} className="input w-auto">{Object.entries(STATUS_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
              <a href={waLink(phoneIntl(o.customer?.phone), `Hello ${o.customer?.name}, this is Brave Sports Wears about your order ${o.id}. Status: ${STATUS_LABEL[o.status]}.`)} target="_blank" rel="noreferrer" className="btn-wa"><WaIcon className="h-4 w-4" />WhatsApp</a>
              <a href={`tel:${o.customer?.phone}`} className="btn-ghost"><Phone className="h-4 w-4" />Call</a>
              <button onClick={() => window.print()} className="btn-ghost"><Printer className="h-4 w-4" />Print</button>
              <button onClick={() => { if (confirm('Delete this order?')) { deleteOrder(o.id); setOpen(null); } }} className="btn ml-auto text-crimson hover:bg-crimson-100"><Trash2 className="h-4 w-4" />Delete</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
