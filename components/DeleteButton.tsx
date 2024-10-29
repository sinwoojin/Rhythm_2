import useSpotifyStore from '@/zustand/spotifyStore';
interface DeleteButtonProps {
  trackUri: string;
  playlistId: string;
  snapshotId: string;
}
function DeleteButton({ playlistId, trackUri, snapshotId }: DeleteButtonProps) {
  const deleteTrack = useSpotifyStore((state) => state.deleteTrackToPlaylists);

  const handleClickDeleteTrack = () => {
    deleteTrack(playlistId, trackUri, snapshotId);
    console.log('playlistId', playlistId);
    console.log('trackUri', trackUri);
    console.log('snapshot_id', snapshotId);
  };

  return (
    <button onClick={handleClickDeleteTrack} className="text-sm w-[150px]">
      삭제하기
    </button>
  );
}

export default DeleteButton;
