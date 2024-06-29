import { getTranslations } from 'next-intl/server';
import CategoryBar from '../../../components/CategoryBar';
import Highlight from '../../../components/Highlight';
import ForumTopics from '../../../components/ForumTopics';
import forumData from './api/room/room_topic'

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
    <>
      <CategoryBar/>
      <Highlight/>
      <ForumTopics data={forumData.data[0]} />
      <ForumTopics data={forumData.data[0]} />
      <ForumTopics data={forumData.data[0]} />
    </>
  );
}
