import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default function Layout(props: { children: React.ReactNode }) {
  const t = useTranslations('RootLayout');

  return (
    <BaseTemplate>
      <div className=" text-xl">{props.children}</div>
    </BaseTemplate>
  );
}
