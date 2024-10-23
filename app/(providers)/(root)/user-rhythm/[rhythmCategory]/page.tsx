import Page from '../../_components/Page/Page';

interface PlayListPageProps {
  params: {
    rhythmCategory: string;
  };
}

async function PlayListPage({ params: { rhythmCategory } }: PlayListPageProps) {
  return (
    <Page title={rhythmCategory}>
      <div className="rounded-md overflow-hidden">
        <div className="max-h-[300px] overflow-hidden bg-fixed"></div>
        <div className="min-h-screen"></div>
      </div>
    </Page>
  );
}

export default PlayListPage;
