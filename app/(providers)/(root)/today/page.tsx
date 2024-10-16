import ChartList from "../_components/_ChartList/ChartList";
import Page from "../_components/_Page/Page";

async function TodayPage() {
  const musicChart = "5ABHKGoOzxkaa28ttQV9sE";
  const kpopChart = "2EoheVFjqIxgJMb8VnDRtZ";
  const jpopChart = "7GkvWsIFKewgwTDPBZgpt3";

  return (
    <Page title="투데이">
      <div id="popular-music">
        <ChartList title="Music-100" Chart={musicChart} />
        {/* Chart={}안에 spotify에서 받아온 노래 리스트 넣으면 됨*/}
      </div>
      <div id="popular-rhythm">
        <ChartList title="Rhythm-100" Chart={kpopChart} />
      </div>
      <div id="popular-user">
        <ChartList title="User-100" Chart={jpopChart} />
      </div>
    </Page>
  );
}

export default TodayPage;
