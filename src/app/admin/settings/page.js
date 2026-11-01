'use client';
import { useEffect, useRef, useState } from 'react';
import { Save, Download, Upload, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { Card, Field, TriInput } from '@/components/admin/ui';
import { useStore } from '@/lib/store';

export default function Settings() {
  const settings = useStore((s) => s.settings);
  const { setSettings, setAdminPassword, exportData, importData, resetAll, showToast } = useStore.getState();
  const [s, setS] = useState(null);
  const [pw, setPw] = useState({ a: '', b: '' });
  const file = useRef();
  useEffect(() => { if (!s) setS(structuredClone(settings)); }, [settings, s]);
  if (!s) return null;
  const set = (k, v) => setS({ ...s, [k]: v });
  const save = (e) => { e?.preventDefault(); setSettings({ ...s, deliveryFee: +s.deliveryFee, freeDeliveryOver: +s.freeDeliveryOver, bulkTiers: s.bulkTiers.map((t) => ({ min: +t.min, off: +t.off })).sort((a, b) => a.min - b.min) }); showToast('Settings saved'); };
  const backup = () => { const blob = new Blob([exportData()], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `brave-sports-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click(); };

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex justify-end"><button className="btn-primary"><Save className="h-4 w-4" />Save settings</button></div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Shop details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Shop name"><input className="input" value={s.storeName} onChange={(e) => set('storeName', e.target.value)} /></Field>
            <Field label="Company name"><input className="input" value={s.legalName} onChange={(e) => set('legalName', e.target.value)} /></Field>
            <Field label="Phone"><input className="input" value={s.phone} onChange={(e) => set('phone', e.target.value)} /></Field>
            <Field label="WhatsApp number" hint="Country code, no + (e.g. 94779104767)"><input className="input" value={s.whatsapp} onChange={(e) => set('whatsapp', e.target.value.replace(/\D/g, ''))} /></Field>
            <Field label="Email" className="sm:col-span-2"><input className="input" type="email" value={s.email} onChange={(e) => set('email', e.target.value)} /></Field>
            <Field label="Address" className="sm:col-span-2"><input className="input" value={s.address} onChange={(e) => set('address', e.target.value)} /></Field>
            <Field label="Facebook link"><input className="input" value={s.facebook} onChange={(e) => set('facebook', e.target.value)} /></Field>
            <Field label="Instagram link"><input className="input" value={s.instagram} onChange={(e) => set('instagram', e.target.value)} /></Field>
          </div>
          <div className="mt-4"><TriInput label="Opening hours" value={s.hours} onChange={(v) => set('hours', v)} /></div>
        </Card>
        <Card title="Website text">
          <div className="space-y-4">
            <TriInput label="Top announcement bar" value={s.announcement} onChange={(v) => set('announcement', v)} />
            <TriInput label="About the shop" value={s.about} onChange={(v) => set('about', v)} textarea rows={5} />
          </div>
        </Card>
        <Card title="Delivery & team pricing">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Delivery fee (Rs.)"><input type="number" className="input" value={s.deliveryFee} onChange={(e) => set('deliveryFee', e.target.value)} /></Field>
            <Field label="Free delivery over (Rs.)"><input type="number" className="input" value={s.freeDeliveryOver} onChange={(e) => set('freeDeliveryOver', e.target.value)} /></Field>
          </div>
          <p className="mb-2 mt-5 text-sm font-semibold">Team discounts (applied automatically in the cart)</p>
          <div className="space-y-2">
            {s.bulkTiers.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                From <input type="number" className="input w-24 py-1.5" value={t.min} onChange={(e) => set('bulkTiers', s.bulkTiers.map((x, k) => (k === i ? { ...x, min: e.target.value } : x)))} /> pieces,
                <input type="number" className="input w-20 py-1.5" value={t.off} onChange={(e) => set('bulkTiers', s.bulkTiers.map((x, k) => (k === i ? { ...x, off: e.target.value } : x)))} />% off
                <button type="button" onClick={() => set('bulkTiers', s.bulkTiers.filter((_, k) => k !== i))} className="ml-auto text-crimson" aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => set('bulkTiers', [...s.bulkTiers, { min: 100, off: 20 }])} className="btn-ghost py-1.5 text-sm"><Plus className="h-4 w-4" />Add tier</button>
          </div>
        </Card>
        <Card title="Bank transfer details">
          <div className="grid gap-4 sm:grid-cols-2">
            {[['name', 'Bank'], ['branch', 'Branch'], ['holder', 'Account name'], ['account', 'Account number']].map(([k, l]) => <Field key={k} label={l}><input className="input" value={s.bank[k]} onChange={(e) => set('bank', { ...s.bank, [k]: e.target.value })} /></Field>)}
          </div>
        </Card>
        <Card title="Numbers on the homepage">
          <div className="space-y-3">
            {s.stats.map((st, i) => (
              <div key={i} className="grid grid-cols-[90px_1fr] gap-3">
                <input className="input" value={st.value} onChange={(e) => set('stats', s.stats.map((x, k) => (k === i ? { ...x, value: e.target.value } : x)))} aria-label="Number" />
                <TriInput label="" value={st.label} onChange={(v) => set('stats', s.stats.map((x, k) => (k === i ? { ...x, label: v } : x)))} />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Admin login">
          <Field label="Admin email"><input className="input" type="email" value={s.adminEmail} onChange={(e) => set('adminEmail', e.target.value)} /></Field>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="New password"><input className="input" type="password" value={pw.a} onChange={(e) => setPw({ ...pw, a: e.target.value })} minLength={8} /></Field>
            <Field label="Repeat password"><input className="input" type="password" value={pw.b} onChange={(e) => setPw({ ...pw, b: e.target.value })} /></Field>
          </div>
          <button type="button" onClick={async () => { if (pw.a.length < 8) return showToast('Use at least 8 characters', 'err'); if (pw.a !== pw.b) return showToast('Passwords do not match', 'err'); await setAdminPassword(pw.a); setPw({ a: '', b: '' }); showToast('Password changed'); }} className="btn-ghost mt-3">Change password</button>
        </Card>
        <Card title="Backup & restore" className="xl:col-span-2">
          <p className="mb-4 text-sm text-slate">In this demo version, data is saved in this browser. Download a backup to keep it safe or move it to another computer.</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={backup} className="btn-ghost"><Download className="h-4 w-4" />Download backup</button>
            <button type="button" onClick={() => file.current.click()} className="btn-ghost"><Upload className="h-4 w-4" />Restore from backup</button>
            <input ref={file} type="file" accept="application/json" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; try { importData(await f.text()); setS(null); showToast('Backup restored'); } catch { showToast('That file is not a valid backup', 'err'); } }} />
            <button type="button" onClick={() => { if (confirm('Reset everything to the original demo content? This removes your changes.')) { resetAll(); setS(null); showToast('Reset to demo content'); } }} className="btn ml-auto text-crimson hover:bg-crimson-100"><RotateCcw className="h-4 w-4" />Reset demo</button>
          </div>
        </Card>
      </div>
    </form>
  );
}
