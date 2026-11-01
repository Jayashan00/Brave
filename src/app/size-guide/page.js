'use client';
import PageHead from '@/components/PageHead';
import SizeGuideTable from '@/components/SizeGuideTable';
import { useT } from '@/lib/i18n';
export default function SizeGuide() {
  const { t } = useT();
  return (<><PageHead title={t('size_guide_page')} crumbs={[{ label: t('size_guide_page') }]} /><div className="wrap max-w-3xl py-10"><div className="rounded-2xl bg-white p-6 ring-1 ring-line"><SizeGuideTable /></div></div></>);
}
