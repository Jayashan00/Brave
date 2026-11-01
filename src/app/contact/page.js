'use client';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import PageHead from '@/components/PageHead';
import { WaIcon } from '@/components/Footer';
import { useStore, waLink } from '@/lib/store';
import { useT } from '@/lib/i18n';

export default function Contact() {
  const { t, tx } = useT();
  const s = useStore((st) => st.settings);
  const addInquiry = useStore((st) => st.addInquiry);
  const [sent, setSent] = useState(false);
  const mapQ = encodeURIComponent('Batagalla, Talathuoya, Kandy, Sri Lanka');
  return (
    <>
      <PageHead title={t('contact_title')} crumbs={[{ label: t('nav_contact') }]} />
      <div className="wrap grid gap-10 py-10 lg:grid-cols-2">
        <div className="space-y-4">
          {[[MapPin, s.address, `https://www.google.com/maps/search/?api=1&query=${mapQ}`], [Phone, s.phone, `tel:${s.phone.replace(/\s/g, '')}`], [Mail, s.email, `mailto:${s.email}`], [Clock, tx(s.hours)]].map(([I, v, href], k) => (
            <a key={k} href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-line hover:ring-navy">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold"><I className="h-5 w-5" /></span><span className="min-w-0 pt-2.5 font-medium [overflow-wrap:anywhere]">{v}</span>
            </a>
          ))}
          <a href={waLink(s.whatsapp, t('wa_hello'))} target="_blank" rel="noreferrer" className="btn-wa w-full py-3.5"><WaIcon className="h-5 w-5" />{t('cta_wa')}</a>
          <div className="overflow-hidden rounded-2xl ring-1 ring-line">
            <iframe title="Map" src={`https://www.google.com/maps?q=${mapQ}&output=embed`} className="h-[300px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
        {sent ? (
          <div className="card grid place-items-center gap-3 p-10 text-center"><CheckCircle2 className="h-12 w-12 text-[#1FA855]" /><p className="text-lg">{t('msg_sent')}</p></div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); addInquiry({ type: 'contact', ...Object.fromEntries(new FormData(e.currentTarget)) }); setSent(true); }} className="h-fit space-y-4 rounded-2xl bg-white p-6 ring-1 ring-line">
            <div><label className="label" htmlFor="m-n">{t('name')}</label><input id="m-n" name="name" required className="input" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label" htmlFor="m-p">{t('phone')}</label><input id="m-p" name="phone" type="tel" required className="input" /></div>
              <div><label className="label" htmlFor="m-e">{t('email')}</label><input id="m-e" name="email" type="email" className="input" /></div>
            </div>
            <div><label className="label" htmlFor="m-m">{t('message')}</label><textarea id="m-m" name="message" rows={6} required className="input" /></div>
            <button className="btn-primary px-8 py-3">{t('send')}</button>
          </form>
        )}
      </div>
    </>
  );
}
