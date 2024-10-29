import useSpotifyStore from '@/zustand/spotifyStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteButtonProps {
  trackUri: string;
  playlistId: string;
  snapshotId: string;
}

function DeleteButton({ playlistId, trackUri, snapshotId }: DeleteButtonProps) {
  const queryClient = useQueryClient();
  const deleteTrackToPlaylist = useSpotifyStore(
    (state) => state.deleteTrackToPlaylists,
  );

  const { mutate: deleteTrack } = useMutation({
    mutationFn: async () =>
      deleteTrackToPlaylist(playlistId, trackUri, snapshotId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlist'] });
    },
    onError: (error) => {
      console.error('트랙 삭제 중 오류 발생:', error);
    },
  });

  return (
    <button
      onClick={() => deleteTrack()}
      className="text-sm w-[150px] disabled:opacity-50"
    >
      삭제하기
    </button>
  );
}

export default DeleteButton;
