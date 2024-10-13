import React from "react";
import Page from "../_components/_Page/Page";
import ChartList from "../_components/_ChartList/ChartList";

function TodayPage() {
  return (
    <Page title="투데이">
      <div className="flex flex-col gap-y-20">
        <div id="popular-music">
          <ChartList title="Music-100" Chart={[{ id: 1 }, { id: 2 }]} />
          {/* Chart={}안에 spotify에서 받아온 노래 리스트 넣으면 됨*/}
        </div>
        <div id="popular-rhythm">
          <ChartList title="Rhythm-100" Chart={[{ id: 1 }, { id: 2 }]} />
        </div>
        <div id="popular-user">
          <ChartList title="User-100" Chart={[{ id: 1 }, { id: 2 }]} />
        </div>
      </div>
    </Page>
  );
}

export default TodayPage;
