'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Lock, Loader2 } from 'lucide-react';
import Logo from './Logo';
import { useStore } from '@/lib/store';
import { useT } from '@/lib/i18n';

export default function AuthModal() {
  const { t } = useT();
  const auth = useStore((s) => s.auth);
  const close = useStore((s) => s.closeAuth);
  const openAuth = useStore((s) => s.openAuth);
  const login = useStore((s) => s.login);
  const register = useStore((s) => s.register);
  const showToast = useStore((s) => s.showToast);
  const router = useRouter();
  const [f, setF] = useState({ name: '', email: '', phone: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const signup = auth.mode === 'signup';

  const submit = async (e) => {
    e.preventDefault(); setErr(''); setBusy(true);
    const res = signup ? await register(f) : await login(f.email, f.password);
    setBusy(false);
    if (res.error) { setErr(t(res.error)); return; }
    showToast(t('welcome', { n: res.user.name.split(' ')[0] }));
    close();
    if (auth.next) router.push(auth.next);
  };
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <AnimatePresence>
      {auth.open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-navy-900/55 p-4" onClick={close}>
          <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-deep" role="dialog" aria-modal="true">
            <button onClick={close} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full hover:bg-navy-50" aria-label={t('close')}><X className="h-5 w-5" /></button>
            <div className="px-7 pb-7 pt-8">
              <Logo />
              {auth.next === '/checkout' && (
                <div className="mt-5 flex gap-3 rounded-xl bg-gold-100 p-3 text-sm">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                  <div><p className="font-semibold">{t('signin_needed')}</p><p className="mt-0.5 text-navy/75">{t('signin_needed_sub')}</p></div>
                </div>
              )}
              <div className="mt-6 grid grid-cols-2 rounded-full bg-navy-50 p-1 text-sm font-semibold">
                <button onClick={() => { setErr(''); openAuth('signin', auth.next); }} className={`rounded-full py-2 ${!signup ? 'bg-white shadow-lift' : 'text-slate'}`}>{t('sign_in')}</button>
                <button onClick={() => { setErr(''); openAuth('signup', auth.next); }} className={`rounded-full py-2 ${signup ? 'bg-white shadow-lift' : 'text-slate'}`}>{t('create_account')}</button>
              </div>
              <form onSubmit={submit} className="mt-5 space-y-3.5">
                {signup && <div><label className="label" htmlFor="a-name">{t('name')}</label><input id="a-name" required className="input" value={f.name} onChange={on('name')} autoComplete="name" /></div>}
                <div><label className="label" htmlFor="a-email">{t('email')}</label><input id="a-email" type="email" required className="input" value={f.email} onChange={on('email')} autoComplete="email" /></div>
                {signup && <div><label className="label" htmlFor="a-phone">{t('phone')}</label><input id="a-phone" type="tel" required className="input" value={f.phone} onChange={on('phone')} placeholder="07X XXX XXXX" autoComplete="tel" /></div>}
                <div><label className="label" htmlFor="a-pass">{t('password')}</label><input id="a-pass" type="password" required minLength={6} className="input" value={f.password} onChange={on('password')} autoComplete={signup ? 'new-password' : 'current-password'} /></div>
                {err && <p className="rounded-lg bg-crimson-100 px-3 py-2 text-sm font-medium text-crimson-700">{err}</p>}
                <button disabled={busy} className="btn-primary w-full py-3">{busy && <Loader2 className="h-4 w-4 animate-spin" />}{signup ? t('create_account') : t('sign_in')}</button>
              </form>
              <p className="mt-4 text-center text-sm text-slate">
                {signup ? t('have_account') : t('no_account')}{' '}
                <button onClick={() => openAuth(signup ? 'signin' : 'signup', auth.next)} className="font-semibold text-navy underline underline-offset-4">{signup ? t('sign_in') : t('create_account')}</button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
