export default function Logo({ className = '', light = false }) {
  const ink = light ? '#FFFFFF' : '#16233F';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 44 50" className="h-10 w-9 shrink-0" aria-hidden="true">
        <path d="M22 1.5 41.5 8v17.2c0 11.6-8.2 19.6-19.5 23.3C10.7 44.8 2.5 36.8 2.5 25.2V8L22 1.5Z" fill="#16233F" stroke="#D9A21B" strokeWidth="1.6" />
        <path d="M22 5.6 37.6 10.8v14.4c0 9.4-6.5 16-15.6 19.2-9.1-3.2-15.6-9.8-15.6-19.2V10.8L22 5.6Z" fill="none" stroke="#D9A21B" strokeWidth="1" strokeDasharray="2.4 1.8" opacity=".8" />
        <path d="M15 14h9.2c4.2 0 6.6 2 6.6 5.2 0 2.2-1.2 3.7-3.1 4.3 2.5.5 4 2.3 4 4.9 0 3.6-2.7 5.6-7.3 5.6H15V14Zm5.2 3.9v4.4h3.2c1.6 0 2.4-.8 2.4-2.2 0-1.4-.8-2.2-2.4-2.2h-3.2Zm0 8v4.6h3.7c1.7 0 2.6-.8 2.6-2.3 0-1.5-.9-2.3-2.6-2.3h-3.7Z" fill="#FFFFFF" />
        <path d="M11 39.5h22" stroke="#A62830" strokeWidth="2.2" />
      </svg>
      <span className="whitespace-nowrap leading-none">
        <span className="block font-slab text-[21px] font-bold tracking-[0.01em]" style={{ color: ink }}>Brave</span>
        <span className="mt-0.5 block text-[10.5px] font-semibold tracking-[0.16em]" style={{ color: light ? '#ECC458' : '#B7850F' }}>Sports Wears</span>
      </span>
    </span>
  );
}
