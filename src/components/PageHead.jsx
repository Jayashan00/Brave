import Link from 'next/link';
export default function PageHead({ title, sub, crumbs = [] }) {
  return (
    <div className="border-b border-line bg-white">
      <div className="wrap py-7 sm:py-10">
        <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-slate" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          {crumbs.map((c, i) => <span key={i} className="flex items-center gap-1.5">/{c.href ? <Link href={c.href} className="hover:text-navy">{c.label}</Link> : <span className="text-navy">{c.label}</span>}</span>)}
        </nav>
        <h1 className="font-slab text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">{title}</h1>
        {sub && <p className="mt-2 max-w-2xl text-slate">{sub}</p>}
        <div className="stitch mt-4 w-16 text-gold" />
      </div>
    </div>
  );
}
