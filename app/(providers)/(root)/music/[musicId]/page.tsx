import { api } from "@/api/spotifyApi";
import dayjs from "dayjs";
import { FaPlay } from "react-icons/fa";
import Page from "../../_components/_Page/Page";

interface MusicDetailPageProps {
	params: { musicId: string };
}

async function MusicDetailPage({ params: { musicId } }: MusicDetailPageProps) {
  
	const lyrics = await api.lyricsApi.getSpotifyLyrics(musicId);
	const chart = await api.TracksApi.getTracks(musicId);

	const album = chart?.album;
	const release_date = chart!.album.release_date;
	const day = dayjs(release_date);
	const release_create_day = day.format("YYYY년 YY월 DD일");
	const release_year = day.format("YYYY");

	const albumImg = chart?.album.images[1].url;
	const artists = chart?.artists[0];

	console.log("가사", lyrics);

	return (
		<Page>
			<div className="flex gap-x-6 py-4 border-b border-white mb-4 ">
				<div>
					<img src={albumImg} alt="앨범 이미지" />
				</div>
				<div className="flex flex-col gap-y-4 w-full">
					<h2 className="font-bold text-7xl whitespace-pre-wrap line">
						{chart?.name}
					</h2>
					<div className="flex">
						<p>{artists?.name}</p>
						<span className="px-3">•</span>
						<span>{album?.name}</span>
						<span className="px-3">•</span>
						<span title={release_create_day}>{release_year}</span>
					</div>
					<div>
						<button className="bg-red-500 py-4 pl-5 pr-3 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl">
							<FaPlay type="button" />
						</button>
					</div>
				</div>
			</div>
			<div className="pb-9 ">
				<h2 className="mb-5 text-3xl font-bold">가사</h2>
				<p className="whitespace-pre-wrap break-words break-all  text-base">
					{lyrics}
				</p>
			</div>
		</Page>
	);
}

export default MusicDetailPage;
