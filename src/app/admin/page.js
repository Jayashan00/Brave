'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import { Wallet, ShoppingCart, Clock, Users, Shirt, AlertTriangle, Inbox, Plus, Info } from 'lucide-react';
import { Card, StatusPill, STATUS_LABEL } from '@/components/admin/ui';
import Img from '@/components/Img';
import { useStore } from '@/lib/store';
import { fmt } from '@/lib/i18n';

export default function Dashboard() {
  const orders = useStore((s) => s.orders);
  const products = useStore((s) => s.products);
  const users = useStore((s) => s.users);
  const inquiries = useStore((s) => s.inquiries);
  const clearSample = useStore((s) => s.clearSampleOrders);
  const live = orders.filter((o) => o.status !== 'cancelled');
  const revenue = live.reduce((s, o) => s + (o.total || 0), 0);
  const pending = orders.filter((o) => o.status === 'pending').length;
  const lowStock = products.filter((p) => !p.madeToOrder && p.stock < 10);
  const hasSample = orders.some((o) => o.sample);

  const series = useMemo(() => {
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
      const next = d.getTime() + 86400000;
      const dayOrders = live.filter((o) => o.createdAt >= d.getTime() && o.createdAt < next);
      days.push({ day: d.toLocaleDateString('en-LK', { day: 'numeric', month: 'short' }), revenue: dayOrders.reduce((s, o) => s + o.total, 0), orders: dayOrders.length });
    }
    return days;
  }, [live]);
  const byStatus = Object.keys(STATUS_LABEL).map((k) => ({ name: STATUS_LABEL[k], k, v: orders.filter((o) => o.status === k).length }));
  const top = useMemo(() => {
    const m = {};
    live.forEach((o) => o.items.forEach((i) => { m[i.productId] = (m[i.productId] || 0) + i.qty; }));
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, q]) => ({ p: products.find((x) => x.id === id), q })).filter((x) => x.p);
  }, [live, products]);
  const colors = { pending: '#D9A21B', confirmed: '#16233F', in_production: '#5B2C8F', dispatched: '#0369A1', delivered: '#15803D', cancelled: '#A62830' };

  return (
    <div className="space-y-6">
      {hasSample && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-gold-100 p-4 text-sm">
          <Info className="h-5 w-5" /><p className="flex-1">The dashboard is showing <b>sample orders</b> so the charts are not empty in the demo.</p>
          <button onClick={() => confirm('Remove all sample orders?') && clearSample()} className="btn-primary py-2 text-sm">Clear sample orders</button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat icon={Wallet} label="Revenue" value={fmt(revenue)} />
        <Stat icon={ShoppingCart} label="Orders" value={orders.length} />
        <Stat icon={Clock} label="Waiting to confirm" value={pending} href="/admin/orders?status=pending" accent />
        <Stat icon={Users} label="Customers" value={users.length} href="/admin/customers" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card title="Sales – last 14 days">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={series} margin={{ left: 0, right: 8, top: 8 }}>
                <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D9A21B" stopOpacity={0.45} /><stop offset="1" stopColor="#D9A21B" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid stroke="#EEF1F7" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#5B6474' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#5B6474' }} axisLine={false} tickLine={false} tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)} width={40} />
                <Tooltip formatter={(v, n) => (n === 'revenue' ? fmt(v) : v)} contentStyle={{ borderRadius: 12, border: '1px solid #DDE1E8' }} />
                <Area type="monotone" dataKey="revenue" stroke="#16233F" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Orders by status">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={byStatus} layout="vertical" margin={{ left: 10, right: 16 }}>
                <XAxis type="number" hide allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12, fill: '#16233F' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F5F6F8' }} contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="v" name="Orders" radius={[0, 6, 6, 0]}>{byStatus.map((s) => <Cell key={s.k} fill={colors[s.k]} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Recent orders" action={<Link href="/admin/orders" className="text-sm font-semibold underline">All orders</Link>} className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead><tr className="border-b border-line text-left text-slate"><th className="py-2 font-medium">Order</th><th className="font-medium">Customer</th><th className="font-medium">Date</th><th className="font-medium">Total</th><th className="font-medium">Status</th></tr></thead>
              <tbody>{orders.slice(0, 6).map((o) => <tr key={o.id} className="border-b border-line/60"><td className="py-2.5 font-semibold">{o.id}</td><td>{o.customer?.name}</td><td>{new Date(o.createdAt).toLocaleDateString('en-LK')}</td><td>{fmt(o.total)}</td><td><StatusPill s={o.status} /></td></tr>)}</tbody>
            </table>
          </div>
        </Card>
        <div className="space-y-6">
          <Card title="Quick actions">
            <div className="grid gap-2">
              <Link href="/admin/products/edit?id=new" className="btn-primary justify-start"><Plus className="h-4 w-4" />Add a product</Link>
              <Link href="/admin/banners" className="btn-ghost justify-start">Change homepage banners</Link>
              <Link href="/admin/enquiries" className="btn-ghost justify-start"><Inbox className="h-4 w-4" />Enquiries ({inquiries.filter((q) => q.status === 'new').length} new)</Link>
            </div>
          </Card>
          <Card title="Top sellers">
            {top.length ? <ul className="space-y-3">{top.map(({ p, q }) => <li key={p.id} className="flex items-center gap-3"><div className="relative h-10 w-10 overflow-hidden rounded-lg bg-navy-50"><Img src={p.images[0]} alt="" sizes="40px" className="object-cover" /></div><span className="flex-1 truncate text-sm">{p.name.en}</span><span className="text-sm font-semibold">{q} pcs</span></li>)}</ul> : <p className="text-sm text-slate">No sales yet.</p>}
          </Card>
          <Card title={<span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-gold-700" />Low stock</span>}>
            {lowStock.length ? <ul className="space-y-2 text-sm">{lowStock.map((p) => <li key={p.id} className="flex justify-between gap-2"><Link href={`/admin/products/edit?id=${p.id}`} className="truncate hover:underline">{p.name.en}</Link><b className={p.stock <= 0 ? 'text-crimson' : ''}>{p.stock}</b></li>)}</ul> : <p className="flex items-center gap-2 text-sm text-slate"><Shirt className="h-4 w-4" />All products are well stocked.</p>}
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: I, label, value, href, accent }) {
  const C = href ? Link : 'div';
  return (
    <C href={href} className={`rounded-2xl p-5 ring-1 ${accent ? 'bg-navy text-white ring-navy' : 'bg-white ring-line'} ${href ? 'transition hover:-translate-y-0.5' : ''}`}>
      <I className={`h-5 w-5 ${accent ? 'text-gold' : 'text-crimson'}`} />
      <p className="mt-3 font-slab text-2xl font-bold sm:text-3xl">{value}</p>
      <p className={`text-sm ${accent ? 'text-white/70' : 'text-slate'}`}>{label}</p>
    </C>
  );
}
