import { api } from "@/api/spotifyApi";
import Link from "next/link";

interface ChartListProps {
  Chart: string;
  title: string;
}

async function ChartList({ Chart, title }: ChartListProps) {
  const response = await api.PlaylistAPI.getPlaylists(Chart);
  const bestMusic = response?.tracks.items || [];

  return (
    <>
      <h3 className="text-2xl mb-5 font-bold">{title}</h3>
      <ul className="flex gap-x-4 overflow-auto scrollbar-hide">
        {bestMusic.map((chartContent, index) => {
          const tracks = chartContent.track;
          return (
            <li
              key={tracks.id || index}
              className="flex flex-col gap-y-2 min-w-[17%]"
            >
              <Link
                href={
                  "/" /*여기에 디테일 페이지로 넘어갈 동적 url 적기 지금은 비워둠*/
                }
              >
                <div className="text-3xl font-bold ml-2 mb-2">
                  TOP {index + 1}
                </div>
                <img
                  src={tracks.album.images[0].url}
                  className="w-full aspect-square bg-white bg-opacity-10"
                />
                <p className="text-xl font-semibold">{tracks.name}</p>
                <p className="text-base opacity-80">{tracks.artists[0].name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ChartList;
