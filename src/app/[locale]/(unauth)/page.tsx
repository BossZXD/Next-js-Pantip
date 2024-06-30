import { getTranslations } from 'next-intl/server';

import CategoryBar from '@/components/CategoryBar';
import ForumTopics from '@/components/ForumTopics';
import Highlight from '@/components/Highlight';
import PantipClubsList from '@/components/List/Club/PantipClubsList';
import PantipTagHit from '@/components/List/Tag/PantipTagHit';
import PantipMarket from '@/components/PantipMarket';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Index() {
  return (
    <div className="container mx-auto">
      <CategoryBar />
      <Highlight />
      <PantipClubsList />
      <PantipTagHit />
      <ForumTopics />
      <PantipMarket />
    </div>
  );
}
