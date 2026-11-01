'use client';
import { useState } from 'react';
import { Upload, CheckCircle2, X } from 'lucide-react';
import PageHead from '@/components/PageHead';
import Img from '@/components/Img';
import { WaIcon } from '@/components/Footer';
import { useStore, waLink, fileToDataUrl, useCurrentUser } from '@/lib/store';
import { useT } from '@/lib/i18n';

export default function CustomOrder() {
  const { t, tx } = useT();
  const s = useStore((st) => st.settings);
  const cats = useStore((st) => st.categories);
  const addInquiry = useStore((st) => st.addInquiry);
  const user = useCurrentUser();
  const [logo, setLogo] = useState('');
  const [sent, setSent] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    delete d.logo;
    addInquiry({ type: 'bulk', ...d, logo });
    setSent(d);
  };

  if (sent) {
    const msg = `${t('wa_hello')} a team order:\n${sent.org} – ${sent.garment}, ~${sent.quantity} pcs, by ${sent.date || '-'}\n${sent.name}, ${sent.phone}\n${sent.message || ''}`;
    return (
      <div className="wrap grid place-items-center py-24 text-center">
        <CheckCircle2 className="h-14 w-14 text-[#1FA855]" />
        <p className="mt-4 max-w-md text-lg">{t('request_sent')}</p>
        <a href={waLink(s.whatsapp, msg)} target="_blank" rel="noreferrer" className="btn-wa mt-6"><WaIcon className="h-5 w-5" />{t('cta_wa')}</a>
      </div>
    );
  }

  return (
    <>
      <PageHead title={t('custom_title')} sub={t('custom_sub')} crumbs={[{ label: t('nav_custom') }]} />
      <div className="wrap grid gap-10 py-10 lg:grid-cols-[1fr_420px]">
        <form onSubmit={submit} className="grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-line sm:grid-cols-2">
          <div><label className="label" htmlFor="o-n">{t('name')}</label><input id="o-n" name="name" required defaultValue={user?.name} className="input" /></div>
          <div><label className="label" htmlFor="o-p">{t('phone')}</label><input id="o-p" name="phone" type="tel" required defaultValue={user?.phone} className="input" /></div>
          <div><label className="label" htmlFor="o-e">{t('email')}</label><input id="o-e" name="email" type="email" defaultValue={user?.email} className="input" /></div>
          <div><label className="label" htmlFor="o-o">{t('org')}</label><input id="o-o" name="org" required className="input" /></div>
          <div><label className="label" htmlFor="o-g">{t('garment')}</label><select id="o-g" name="garment" className="input">{[...cats].sort((a, b) => a.order - b.order).map((c) => <option key={c.id}>{tx(c.name)}</option>)}</select></div>
          <div><label className="label" htmlFor="o-q">{t('quantity')}</label><input id="o-q" name="quantity" type="number" min={1} required defaultValue={20} className="input" /></div>
          <div><label className="label" htmlFor="o-d">{t('needed_by')}</label><input id="o-d" name="date" type="date" className="input" /></div>
          <div>
            <span className="label">{t('upload_logo')}</span>
            <label className="flex h-[46px] cursor-pointer items-center gap-2 rounded-xl border border-dashed border-navy/30 px-3 text-sm hover:border-navy">
              <Upload className="h-4 w-4" />{logo ? 'Image added' : 'PNG / JPG'}
              <input name="logo" type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setLogo(await fileToDataUrl(f, 900)); }} />
            </label>
          </div>
          {logo && <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-navy-50 sm:col-span-2"><Img src={logo} alt="" className="object-contain" /><button type="button" onClick={() => setLogo('')} className="absolute right-1 top-1 rounded-full bg-white p-1" aria-label={t('remove')}><X className="h-3 w-3" /></button></div>}
          <div className="sm:col-span-2"><label className="label" htmlFor="o-m">{t('message')}</label><textarea id="o-m" name="message" rows={4} className="input" placeholder="Colours, names & numbers, collar type…" /></div>
          <button className="btn-primary w-fit px-8 py-3">{t('send_request')}</button>
        </form>
        <aside className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Img src="/images/banners/b12.webp" alt="Team in custom kits" sizes="420px" className="object-cover" /></div>
          <div className="rounded-2xl bg-navy p-6 text-white">
            <p className="font-slab text-xl font-semibold">{t('process_title')}</p>
            <ol className="mt-4 space-y-3">{['p1', 'p2', 'p3', 'p4', 'p5'].map((k, i) => <li key={k} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-sm font-bold text-navy">{i + 1}</span><span><b>{t(k)}</b><br /><span className="text-sm text-white/70">{t(k + 'd')}</span></span></li>)}</ol>
          </div>
        </aside>
      </div>
    </>
  );
}
