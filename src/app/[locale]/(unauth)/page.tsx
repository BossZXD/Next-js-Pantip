import { getTranslations } from 'next-intl/server';

import CategoryBar from '../../../components/CategoryBar';
import ForumTopics from '../../../components/ForumTopics';
import Highlight from '../../../components/Highlight';

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
      <ForumTopics />
    </div>
  );
}
