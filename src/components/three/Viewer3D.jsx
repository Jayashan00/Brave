'use client';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Ruler, Hand, Loader2, ImageOff } from 'lucide-react';
import { PALETTE, SIZE_CHART, KIDS_SIZES } from '@/lib/seed';
import { useT } from '@/lib/i18n';

const GarmentScene = dynamic(() => import('./GarmentScene'), { ssr: false });

export function sizeData(size) {
  const kids = KIDS_SIZES.includes(size);
  const chart = kids ? SIZE_CHART.kids : SIZE_CHART.adult;
  const row = chart.find((r) => r.size === size) || chart[Math.floor(chart.length / 2)];
  const idx = chart.indexOf(row);
  const mid = (chart.length - 1) / 2;
  return { row, scale: 1 + (idx - mid) * 0.045, kids };
}

/**
 * Interactive 3D garment viewer.
 * props: product (with model3d), size (controlled, optional), onSize, colour (hex or ''), onColour, compact
 */
export default function Viewer3D({ product, size, onSize, colour, onColour, compact = false, showSizes = true, className = '' }) {
  const { t } = useT();
  const [view, setView] = useState('front');
  const [auto, setAuto] = useState(true);
  const [zoom, setZoom] = useState(5);
  const [measure, setMeasure] = useState(!compact);
  const [status, setStatus] = useState('loading');
  const [unit, setUnit] = useState('in');
  const [localSize, setLocalSize] = useState(product.sizes?.includes('M') ? 'M' : product.sizes?.[Math.floor((product.sizes?.length || 1) / 2)]);
  const [localColour, setLocalColour] = useState('');
  const sz = size ?? localSize;
  const setSz = onSize ?? setLocalSize;
  const col = colour ?? localColour;
  const setCol = onColour ?? setLocalColour;

  const m = product.model3d || {};
  const src = useMemo(() => ({ front: m.front || product.images?.[0], back: m.back || '', mode: m.mode || 'auto' }), [m.front, m.back, m.mode, product.images]);
  const sd = sizeData(sz);
  const conv = (v) => (unit === 'in' ? `${v} ${t('inches')}` : `${Math.round(v * 2.54)} ${t('cm')}`);
  const sizeInfo = { chestLabel: `${t('chest')} ${conv(sd.row.chest)}`, lengthLabel: `${t('length')} ${conv(sd.row.length)}` };
  const swatches = [{ name: t('original'), hex: '' }, ...PALETTE];

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="relative aspect-square w-full overflow-hidden rounded-[22px] bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#EEF1F7_55%,#D9DFEC_100%)]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(22,35,63,.06),transparent)]" />
        <GarmentScene src={src} tint={col || null} view={view} autoRotate={auto} scale={sd.scale} zoom={zoom} sizeInfo={sizeInfo} showMeasure={measure && status === 'ready'} onStatus={setStatus} />
        {status === 'loading' && (
          <div className="absolute inset-0 grid place-items-center text-navy-500"><Loader2 className="h-7 w-7 animate-spin" /></div>
        )}
        {status === 'error' && (
          <div className="absolute inset-0 grid place-items-center text-slate"><ImageOff className="h-8 w-8" /></div>
        )}
        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-xs text-navy backdrop-blur">
          <Hand className="h-3.5 w-3.5" /> {t('drag_hint')}
        </div>
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          <IconBtn label={t('auto_rotate')} active={auto} onClick={() => setAuto((a) => !a)}><RotateCw className="h-4 w-4" /></IconBtn>
          <IconBtn label="Zoom in" onClick={() => setZoom((z) => Math.max(3, z - 0.6))}><ZoomIn className="h-4 w-4" /></IconBtn>
          <IconBtn label="Zoom out" onClick={() => setZoom((z) => Math.min(7.5, z + 0.6))}><ZoomOut className="h-4 w-4" /></IconBtn>
          <IconBtn label={t('size_guide')} active={measure} onClick={() => setMeasure((v) => !v)}><Ruler className="h-4 w-4" /></IconBtn>
        </div>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 rounded-full bg-white/90 p-1 text-sm shadow-lift backdrop-blur">
          {['front', 'back'].map((v) => (
            <button key={v} onClick={() => { setView(v); setAuto(false); }} className={`rounded-full px-4 py-1.5 font-medium transition ${view === v ? 'bg-navy text-white' : 'text-navy hover:bg-navy-50'}`}>{t(v)}</button>
          ))}
        </div>
      </div>

      <div className={`mt-4 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <p className="mb-2 text-sm font-semibold text-navy">{t('colour')}: <span className="font-normal text-slate">{swatches.find((s) => s.hex === col)?.name || t('original')}</span></p>
          <div className="flex flex-wrap gap-2">
            {swatches.map((s) => (
              <button key={s.name} aria-label={s.name} title={s.name} onClick={() => setCol(s.hex)}
                className={`relative h-8 w-8 rounded-full border transition ${col === s.hex ? 'ring-2 ring-gold ring-offset-2' : 'border-line hover:scale-110'}`}
                style={{ background: s.hex || 'conic-gradient(#16233F 0 25%, #D9A21B 0 50%, #A62830 0 75%, #fff 0)' }} />
            ))}
          </div>
        </div>
        {showSizes && product.sizes?.length > 0 && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-navy">{t('fit_size')}: <span className="font-normal text-slate">{sz}</span></p>
              <div className="flex rounded-full border border-line p-0.5 text-xs">
                {['in', 'cm'].map((u) => <button key={u} onClick={() => setUnit(u)} className={`rounded-full px-2 py-0.5 ${unit === u ? 'bg-navy text-white' : 'text-navy'}`}>{u === 'in' ? t('inches') : t('cm')}</button>)}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => { setSz(s); setMeasure(true); }} className={`min-w-[42px] rounded-lg border px-2 py-1.5 text-sm font-medium transition ${sz === s ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy hover:border-navy'}`}>{s}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function IconBtn({ children, label, onClick, active }) {
  return (
    <button aria-label={label} title={label} onClick={onClick} className={`grid h-9 w-9 place-items-center rounded-full shadow-lift backdrop-blur transition ${active ? 'bg-navy text-white' : 'bg-white/90 text-navy hover:bg-white'}`}>
      {children}
    </button>
  );
}
