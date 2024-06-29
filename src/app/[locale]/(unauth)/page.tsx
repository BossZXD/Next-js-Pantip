import { getTranslations } from "next-intl/server";

import CategoryBar from "../../../components/CategoryBar";
import ForumTopics from "../../../components/ForumTopics";
import Highlight from "../../../components/Highlight";
import forumData from "./api/room/room_topic";

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: "Index",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default function Index() {
  const firstForumData = forumData.data[0];

  if (!firstForumData) {
    return <div>No forum data available</div>;
  }

  return (
    <>
      <CategoryBar />
      <Highlight />
      <ForumTopics data={firstForumData} />
      <ForumTopics data={firstForumData} />
      <ForumTopics data={firstForumData} />
    </>
  );
}
