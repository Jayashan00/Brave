'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PageHead from '@/components/PageHead';
import { useStore } from '@/lib/store';
import { useT, fmt } from '@/lib/i18n';
export default function Faq() {
  const { t } = useT();
  const s = useStore((st) => st.settings);
  const qa = [
    ['Do I need an account to browse?', 'No. Anyone can browse, view products in 3D and add to cart. We only ask you to sign in or create an account when you place an order, so you can track it.'],
    ['What is the minimum order for custom printing?', 'We print single pieces and whole-school orders. Team discounts start automatically from ' + (s.bulkTiers?.[0]?.min || 12) + ' pieces.'],
    ['How long does a custom team order take?', 'After you approve the mockup and sample, production usually takes 7–14 working days depending on quantity. We confirm the date before we start.'],
    ['How much is delivery?', `Islandwide courier delivery is ${fmt(s.deliveryFee)}, free for orders over ${fmt(s.freeDeliveryOver)}.`],
    ['How can I pay?', 'Cash on delivery or bank transfer. Card payments online are coming soon.'],
    ['What is sublimation?', 'The design is printed with special inks and heat-pressed so it becomes part of the polyester fibre. It does not crack, peel or fade like a normal print.'],
    ['Can I visit the workshop?', `Yes – we are at ${s.address}. Message us on WhatsApp first so we can be ready for you.`],
  ];
  const [o, setO] = useState(0);
  return (
    <>
      <PageHead title={t('faq')} crumbs={[{ label: t('faq') }]} />
      <div className="wrap max-w-3xl py-10">
        <div className="divide-y divide-line rounded-2xl bg-white px-6 ring-1 ring-line">
          {qa.map(([q, a], i) => (
            <div key={i}>
              <button onClick={() => setO(o === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold" aria-expanded={o === i}>{q}<ChevronDown className={`h-5 w-5 shrink-0 transition ${o === i ? 'rotate-180' : ''}`} /></button>
              {o === i && <p className="pb-5 leading-relaxed text-navy/80">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
