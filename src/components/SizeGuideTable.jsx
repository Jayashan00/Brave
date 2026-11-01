'use client';
import { useState } from 'react';
import { SIZE_CHART } from '@/lib/seed';
import { useT } from '@/lib/i18n';
export default function SizeGuideTable({ kids }) {
  const { t } = useT();
  const [unit, setUnit] = useState('in');
  const v = (x) => (unit === 'in' ? x : Math.round(x * 2.54));
  const groups = kids === undefined ? [['Adult', SIZE_CHART.adult], ['Kids', SIZE_CHART.kids]] : [[kids ? 'Kids' : 'Adult', kids ? SIZE_CHART.kids : SIZE_CHART.adult]];
  return (
    <div>
      <div className="mb-4 flex w-fit rounded-full border border-line p-0.5 text-sm">
        {['in', 'cm'].map((u) => <button key={u} onClick={() => setUnit(u)} className={`rounded-full px-3 py-1 ${unit === u ? 'bg-navy text-white' : ''}`}>{u === 'in' ? t('inches') : t('cm')}</button>)}
      </div>
      {groups.map(([g, rows]) => (
        <div key={g} className="mb-6 overflow-x-auto">
          <p className="mb-2 font-semibold">{g}</p>
          <table className="w-full min-w-[320px] text-left text-[15px]">
            <thead><tr className="border-b border-line text-slate"><th className="py-2 pr-4 font-medium">{t('size')}</th><th className="py-2 pr-4 font-medium">{t('chest')}</th><th className="py-2 font-medium">{t('length')}</th></tr></thead>
            <tbody>{rows.map((r) => <tr key={r.size} className="border-b border-line/70"><td className="py-2 pr-4 font-semibold">{r.size}</td><td className="py-2 pr-4">{v(r.chest)}</td><td className="py-2">{v(r.length)}</td></tr>)}</tbody>
          </table>
        </div>
      ))}
      <p className="text-sm text-slate">Chest is measured around the body under the arms. Length is from the highest point of the shoulder to the hem.</p>
    </div>
  );
}
