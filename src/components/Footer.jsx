'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Banknote, Truck, Landmark } from 'lucide-react';
import Logo from './Logo';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';

export default function Footer() {
  const { t, tx } = useT();
  const s = useStore((st) => st.settings);
  const cats = useStore((st) => st.categories);
  return (
    <footer className="mt-24 bg-navy text-white/80">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed">{t('footer_about')}</p>
          <div className="mt-5 flex gap-2">
            {s.facebook && <a href={s.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:border-gold hover:text-gold"><Facebook className="h-[18px] w-[18px]" /></a>}
            {s.instagram && <a href={s.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:border-gold hover:text-gold"><Instagram className="h-[18px] w-[18px]" /></a>}
            <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:border-gold hover:text-gold"><WaIcon className="h-[18px] w-[18px]" /></a>
          </div>
        </div>
        <div>
          <p className="font-slab text-lg font-semibold text-white">{t('quick_links')}</p>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {[...cats].sort((a, b) => a.order - b.order).slice(0, 6).map((c) => <li key={c.id}><Link className="hover:text-gold" href={`/shop?cat=${c.slug}`}>{tx(c.name)}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="font-slab text-lg font-semibold text-white">{t('help')}</p>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            <li><Link className="hover:text-gold" href="/size-guide">{t('size_guide_page')}</Link></li>
            <li><Link className="hover:text-gold" href="/faq">{t('faq')}</Link></li>
            <li><Link className="hover:text-gold" href="/account">{t('track')}</Link></li>
            <li><Link className="hover:text-gold" href="/custom-order">{t('nav_custom')}</Link></li>
            <li><Link className="hover:text-gold" href="/policies">{t('delivery_returns')}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-slab text-lg font-semibold text-white">{t('contact_us')}</p>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" />{s.address}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" /><a className="hover:text-gold" href={`tel:${s.phone.replace(/\s/g, '')}`}>{s.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" /><a className="break-all hover:text-gold" href={`mailto:${s.email}`}>{s.email}</a></li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" />{tx(s.hours)}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-5 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} {s.storeName} · {s.legalName}. {t('rights')}</p>
          <div className="flex items-center gap-2">
            <span className="mr-1 text-white/60">{t('pay_methods')}</span>
            <PayChip icon={Banknote} label={t('cod')} />
            <PayChip icon={Landmark} label={t('bank')} />
            <PayChip icon={Truck} label="Islandwide" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function PayChip({ icon: I, label }) {
  return <span className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-xs text-white"><I className="h-3.5 w-3.5 text-gold" />{label}</span>;
}

export function WaIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.31l-.35-.21-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.46-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44M20.1 3.9A11.33 11.33 0 0 0 12.05.55C5.77.55.66 5.66.66 11.94c0 2 .52 3.96 1.52 5.69L.57 23.45l5.96-1.56a11.36 11.36 0 0 0 5.51 1.4h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.34-8.05" />
    </svg>
  );
}
