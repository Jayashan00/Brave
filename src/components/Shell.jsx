'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFab from './WhatsAppFab';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';
import Toast from './Toast';
import { useStore } from '@/lib/store';

export default function Shell({ children }) {
  const pathname = usePathname();
  const lang = useStore((s) => s.lang);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  if (pathname.startsWith('/admin')) return <>{children}<Toast /></>;
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <WhatsAppFab />
      <CartDrawer />
      <AuthModal />
      <Toast />
    </>
  );
}
