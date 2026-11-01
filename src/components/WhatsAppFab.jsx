'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { WaIcon } from './Footer';
import { useStore, waLink } from '@/lib/store';
import { useT } from '@/lib/i18n';

export default function WhatsAppFab() {
  const { t, lang } = useT();
  const s = useStore((st) => st.settings);
  const [open, setOpen] = useState(false);
  const onProduct = usePathname().startsWith('/product/');
  const quick = {
    en: ['I want a price for team jerseys', 'Do you have this in stock?', 'I want to visit the workshop'],
    si: ['කණ්ඩායම් ජර්සි සඳහා මිලක් අවශ්‍යයි', 'මෙය තොගයේ තිබේද?', 'වැඩපොළට පැමිණීමට කැමතියි'],
    ta: ['அணி ஜெர்சிகளுக்கு விலை வேண்டும்', 'இது கையிருப்பில் உள்ளதா?', 'பட்டறைக்கு வர விரும்புகிறேன்'],
  }[lang];
  return (
    <div className={`fixed right-4 z-40 flex flex-col items-end gap-3 sm:right-5 ${onProduct ? 'bottom-[92px] lg:bottom-5' : 'bottom-4 sm:bottom-5'}`}>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} className="w-[min(300px,calc(100vw-32px))] overflow-hidden rounded-2xl bg-white shadow-deep">
            <div className="flex items-center gap-3 bg-[#075E54] p-4 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15"><WaIcon className="h-5 w-5" /></span>
              <div className="flex-1"><p className="font-semibold">{s.storeName}</p><p className="text-xs text-white/75">{s.phone}</p></div>
              <button onClick={() => setOpen(false)} aria-label={t('close')}><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-2 bg-[#ECE5DD] p-4">
              <p className="w-fit max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-navy shadow-sm">{t('wa_hello')}…</p>
              {quick.map((q) => (
                <a key={q} href={waLink(s.whatsapp, q)} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2 rounded-lg border border-[#1FA855]/30 bg-white px-3 py-2 text-sm text-navy hover:border-[#1FA855]">
                  {q}<Send className="h-3.5 w-3.5 shrink-0 text-[#1FA855]" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((o) => !o)} aria-label="WhatsApp" className="group relative grid h-12 w-12 place-items-center rounded-full bg-[#1FA855] text-white shadow-deep transition hover:scale-105 sm:h-14 sm:w-14">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#1FA855] opacity-30 [animation-duration:2.5s]" />
        {open ? <X className="relative h-6 w-6" /> : <WaIcon className="relative h-6 w-6 sm:h-7 sm:w-7" />}
      </button>
    </div>
  );
}
