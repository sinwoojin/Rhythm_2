import Page from "../_components/_Page/Page";
import Chart from "./_components/Chart/Chart";

function ChartPage() {
	return (
		<Page title="차트">
			<Chart title="오늘의 top 100" />
			<Chart title="국내 급 상승" />
			<Chart title="외국" />
		</Page>
	);
}

export default ChartPage;
