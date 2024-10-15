interface MusicDetailPageProps {
	params: { musicId: string };
}

function MusicDetailPage({ params: { musicId } }: MusicDetailPageProps) {
	console.log(musicId);
	// return <Page title={}></Page>;
}

export default MusicDetailPage;
