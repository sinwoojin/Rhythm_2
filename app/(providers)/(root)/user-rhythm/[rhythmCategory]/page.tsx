'use client';
import { useSearchParams } from 'next/navigation';
import Page from '../../_components/Page/Page';

interface PlayListPageProps {
  params: {
    rhythmCategory: string;
  };
}

function PlayListPage({ params: { rhythmCategory } }: PlayListPageProps) {
  const searchParams = useSearchParams();
  const imgUrl = searchParams.get('imgUrl');

  console.log('Image URL:', imgUrl); // URL 출력 확인

  return (
    <Page title={rhythmCategory}>
      <div className="rounded-md overflow-hidden">
        <div
          className="max-h-[300px] overflow-hidden bg-fixed"
          style={{ backgroundImage: `url(${imgUrl})` }} // 동적 URL 설정
        ></div>
        <div className="min-h-screen"></div>
      </div>
    </Page>
  );
}

export default PlayListPage;
