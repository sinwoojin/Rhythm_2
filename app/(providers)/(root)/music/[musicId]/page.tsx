import { api } from "@/api/spotifyApi";
import dayjs from "dayjs";
import Page from "../../_components/_Page/Page";

interface MusicDetailPageProps {
	params: { musicId: string };
}

async function MusicDetailPage({ params: { musicId } }: MusicDetailPageProps) {
	const chart = await api.Tracks.getTracks(musicId);
	const album = chart?.album;
	const release_date = chart!.album.release_date;
	const day = dayjs(release_date);
	const release_create_day = day.format("YYYY년 YY월 DD일");
	const release_year = day.format("YYYY");

	const albumImg = chart?.album.images[1].url;
	const artists = chart?.artists[0];

	return (
		<Page>
			<div className="flex gap-x-6 py-4 border-b border-white mb-4">
				<div>
					<img src={albumImg} alt="앨범 이미지" />
				</div>
				<div className="flex flex-col gap-y-4">
					<h2 className="font-bold text-8xl">{chart?.name}</h2>
					<div className="flex">
						<p>{artists?.name}</p>
						<span className="px-3">•</span>
						<span>{album?.name}</span>
						<span className="px-3">•</span>
						<span title={release_create_day}>{release_year}</span>
					</div>
				</div>
			</div>
		</Page>
	);
}

export default MusicDetailPage;
