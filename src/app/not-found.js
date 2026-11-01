import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="wrap grid min-h-[60vh] place-items-center text-center">
      <div><p className="font-slab text-8xl font-bold text-navy/15">404</p><p className="mt-2 font-slab text-2xl font-semibold">We could not find that page.</p><Link href="/" className="btn-primary mt-6">Back to home</Link></div>
    </div>
  );
}
