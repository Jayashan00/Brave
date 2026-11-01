'use client';
import PageHead from '@/components/PageHead';
import { useStore } from '@/lib/store';
import { useT, fmt } from '@/lib/i18n';
export default function Policies() {
  const { t } = useT();
  const s = useStore((st) => st.settings);
  const sec = [
    [t('delivery'), `We deliver to all 25 districts by courier. Delivery is ${fmt(s.deliveryFee)} per order and free over ${fmt(s.freeDeliveryOver)}. Ready-stock orders usually arrive within 2–4 working days.`],
    ['Returns & exchanges', 'Unworn ready-stock items can be exchanged for another size within 7 days. Custom printed or embroidered items are made for you and cannot be returned unless they are faulty – we will remake any item with a production fault.'],
    [t('privacy'), `We use your name, phone and address only to process and deliver your order. We never sell your details. Contact ${s.email} to have your account removed.`],
    [t('terms'), 'Prices are in Sri Lankan Rupees. Colours on screen and in the 3D preview may differ slightly from the finished fabric. Custom orders begin once the mockup is approved.'],
  ];
  return (
    <><PageHead title={t('delivery_returns')} crumbs={[{ label: t('delivery_returns') }]} />
      <div className="wrap max-w-3xl space-y-8 py-10">{sec.map(([h, p]) => <section key={h}><h2 className="font-slab text-2xl font-semibold">{h}</h2><p className="mt-2 leading-relaxed text-navy/80">{p}</p></section>)}</div></>
  );
}
