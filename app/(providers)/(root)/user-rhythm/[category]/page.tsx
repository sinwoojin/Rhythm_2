import Page from "../../_components/Page/Page";
import PlayLists from "../_components/Lists/Lists";

interface PlayListPageProps {
  params: {
    category: string;
  };
}

function playListPage({ params: { category } }: PlayListPageProps) {
  return (
    <Page title={category}>
      <PlayLists />
    </Page>
  );
}

export default playListPage;
