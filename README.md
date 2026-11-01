# Brave Sports Wears – website frontend

Next.js 14 storefront + admin panel for **Brave Sports Wears** (Niran Fashion Garments, 77/4 Batagalla, Talathuoya, Kandy).

## Run locally
```bash
npm install
npm run dev          # http://localhost:3000
```

## Deploy to Vercel
1. Push this `frontend` folder to a GitHub repository (or run `npx vercel` inside it).
2. In Vercel: **Add New → Project → Import** the repo. Framework is detected as **Next.js** automatically.
   If the repo contains other folders, set **Root Directory** to `frontend`.
3. Click **Deploy**. No environment variables are needed.

## Admin panel
Open `/admin`.
- Demo login: **admin@bravesportswear.lk / Brave@2026** (tap the yellow box on the login screen to fill it in).
- Change the email and password in **Site settings → Admin login** before giving the link to anyone.

The admin can edit everything: products (photos, 3 languages, prices, sizes, colours, stock, 3D setup), categories,
homepage slider, team gallery, announcement bar, contact details, WhatsApp number, delivery fee, team-discount tiers,
bank details, homepage numbers, about text, orders (status updates, WhatsApp the customer, print), customers and enquiries.

## Features
- English / සිංහල / தமிழ் switch on every page (Noto Sans Sinhala & Tamil fonts bundled).
- **3D viewer**: real product photos are cut out and inflated into 3D. Drag to rotate, front/back, zoom,
  recolour the fabric (logos and prints stay intact), size buttons scale the garment and show chest/length in inches or cm.
- Photos the admin uploads are made 3D automatically (works best on a plain background). Per product the admin can
  choose: automatic cut-out, upload a transparent PNG cut-out, or "3D card".
- Browsing never asks for a login. Sign in / create account appears only at checkout.
- Cart drawer, automatic team discounts, free-delivery progress bar, wishlist, reviews, order tracking in "My account".
- Cash on delivery and bank transfer; order copy can be sent on WhatsApp. Floating WhatsApp button with quick messages.
- Team / bulk order form with logo upload, contact form, Google map, FAQ, size guide, delivery & returns page.

## Important – demo data storage
This is a **frontend-only** build. Products, orders, accounts and admin changes are stored in the
**browser's IndexedDB**, so:
- changes made in /admin are visible in **that browser only**;
- a customer's order appears in the admin panel only if placed in the same browser.

That is fine for the client demo. For the live shop, connect a backend (e.g. Supabase or Firebase) – the data layer is
all in `src/lib/store.js`, so the pages do not need to change. Use **Site settings → Download backup** to move content.

## Things to confirm with the client
- Prices, delivery fee (Rs. 450, free over Rs. 15,000) and team-discount tiers (10% from 12 pcs, 15% from 50 pcs) are placeholders.
- Bank account details (Site settings → Bank transfer details).
- Homepage numbers (Site settings → Numbers on the homepage).
- Caps and Indian T-shirts have no photos yet – add products for them in /admin.
- Card payment (PayHere) is shown as "coming soon" and needs a merchant account + backend.

## Project structure
```
src/app            pages (storefront + /admin)
src/components     UI, header/footer, cart, auth, three/ (3D viewer)
src/lib            store.js (data), seed.js (starting catalogue), i18n.js (translations), garment.js (3D processing)
public/images      client photos: products/, cutouts/ (background removed), banners/, gallery/
```
