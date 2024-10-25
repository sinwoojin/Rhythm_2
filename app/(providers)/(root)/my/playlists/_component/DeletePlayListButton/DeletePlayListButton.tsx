import useSpotifyStore from '@/zustand/spotifyStore';
import { useQueryClient } from '@tanstack/react-query';

interface DeletePlayListButtonProps {
  playlistId: string;
}

function DeletePlayListButton({ playlistId }: DeletePlayListButtonProps) {
  const deletePlaylist = useSpotifyStore((state) => state.deletePlaylist);
  const queryClient = useQueryClient();

  const handleClickCheckFollow = async () => {
    await deletePlaylist(playlistId);
    queryClient.invalidateQueries();
  };

  return (
    <button
      onClick={handleClickCheckFollow}
      className="w-[180px] h-full border border-white hover:bg-red-500 transition rounded-xl"
    >
      삭제하기
    </button>
  );
}

export default DeletePlayListButton;
