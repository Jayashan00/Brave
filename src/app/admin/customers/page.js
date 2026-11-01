'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { WaIcon } from '@/components/Footer';
import { useStore, waLink } from '@/lib/store';
import { fmt } from '@/lib/i18n';
export default function Customers() {
  const users = useStore((s) => s.users);
  const orders = useStore((s) => s.orders);
  const [q, setQ] = useState('');
  const list = users.filter((u) => `${u.name} ${u.email} ${u.phone}`.toLowerCase().includes(q.toLowerCase()));
  const intl = (p) => { const d = (p || '').replace(/\D/g, ''); return d.startsWith('0') ? '94' + d.slice(1) : d; };
  return (
    <div className="space-y-4">
      <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers" className="input pl-9" /></div>
      <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
        <table className="w-full min-w-[700px] text-sm">
          <thead><tr className="border-b border-line text-left text-slate"><th className="p-3 font-medium">Name</th><th className="font-medium">Contact</th><th className="font-medium">District</th><th className="font-medium">Orders</th><th className="font-medium">Spent</th><th className="font-medium">Joined</th><th /></tr></thead>
          <tbody>
            {list.map((u) => {
              const mine = orders.filter((o) => o.userId === u.id && o.status !== 'cancelled');
              return (
                <tr key={u.id} className="border-b border-line/60">
                  <td className="p-3 font-semibold">{u.name}</td><td>{u.email}<br /><span className="text-slate">{u.phone}</span></td><td>{u.district}</td>
                  <td>{mine.length}</td><td>{fmt(mine.reduce((s, o) => s + o.total, 0))}</td><td>{new Date(u.createdAt).toLocaleDateString('en-LK')}</td>
                  <td className="pr-3"><a href={waLink(intl(u.phone), `Hello ${u.name},`)} target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-lg text-[#1FA855] hover:bg-[#DCFCE7]" aria-label="WhatsApp"><WaIcon className="h-4 w-4" /></a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!list.length && <p className="p-8 text-center text-slate">Customers appear here when they create an account at checkout.</p>}
      </div>
    </div>
  );
}
