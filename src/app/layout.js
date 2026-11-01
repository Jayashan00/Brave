import './globals.css';
import Shell from '@/components/Shell';

export const metadata = {
  title: { default: 'Brave Sports Wears – Sportswear & Team Kits made in Kandy', template: '%s · Brave Sports Wears' },
  description: 'Sublimation jerseys, embroidered polos, print t-shirts, hoodies, martial arts uniforms and team kits made in Talathuoya, Kandy. Islandwide delivery in Sri Lanka.',
  keywords: ['t-shirts Sri Lanka', 'sublimation jerseys', 'cricket kits', 'school uniforms', 'Kandy', 'Brave Sports Wears', 'Niran Fashion Garments'],
  openGraph: { title: 'Brave Sports Wears', description: 'Sportswear & team kits made in Kandy, Sri Lanka.', images: ['/images/banners/b15.webp'], locale: 'en_LK', type: 'website' },
};
export const viewport = { themeColor: '#16233F', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
