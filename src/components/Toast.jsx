'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Toast() {
  const toast = useStore((s) => s.toast);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div key={toast.id} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-deep ${toast.kind === 'err' ? 'bg-crimson text-white' : 'bg-navy text-white'}`}>
            {toast.kind === 'err' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4 text-gold" />}{toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
