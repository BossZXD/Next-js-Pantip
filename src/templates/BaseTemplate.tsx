import { useTranslations } from 'next-intl';
import { AppConfig } from '@/utils/AppConfig';
import Header from '@/components/Header';
const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const t = useTranslations('BaseTemplate');

  return (
    <div className="max-w-full text-gray-700 antialiased">
      <div className="mx-max mx-0">
        <Header/>
        <main>{props.children}</main>
      </div>
    </div>
  );
};

export { BaseTemplate };
