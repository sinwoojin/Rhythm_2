import Page from "../../../_components/_Page/Page";
import Lists from "../_components/Lists/Lists";

interface PlayListPageProps {
  params: {
    category: string;
  };
}

function playListPage({ params: { category } }: PlayListPageProps) {
  return (
    <Page title={category}>
      <Lists />
    </Page>
  );
}

export default playListPage;
