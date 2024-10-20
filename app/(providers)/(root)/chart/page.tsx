import ChartLayout from '../_components/ChartLayout/ChartLayout';
import Page from '../_components/Page/Page';

function ChartPage() {
  return (
    <Page title="차트">
      <ChartLayout title="오늘의 top 100" />
      <ChartLayout title="국내 급 상승" />
      <ChartLayout title="외국" />
    </Page>
  );
}

export default ChartPage;
