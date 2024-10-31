'use client';
import PlusButton from '@/components/PlusButton';
import { useAuthStore } from '@/zustand/authStore';
import { useModalStore } from '@/zustand/modalStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useQuery } from '@tanstack/react-query';
import { IoCloseOutline } from 'react-icons/io5';

interface addMusicOnMyPlaylistModalProps {
  trackUri?: string;
}

function AddMusicOnMyPlaylistModal({
  trackUri,
}: addMusicOnMyPlaylistModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);
  const getMyPlaylists = useSpotifyStore((state) => state.getMyPlaylists);
  const currentUser = useAuthStore((state) => state.currentUser);

  const { data: playlists } = useQuery({
    queryKey: ['myPlaylists'],
    queryFn: () => getMyPlaylists(),
    enabled: !!currentUser,
  });
  const handleClickCloseModal = () => {
    closeModal();
  };

  const myPlaylists = playlists?.items;

  if (myPlaylists?.length === 0) {
    return <div>로딩 중...</div>;
  }

  console.log('playlists', playlists, myPlaylists);

  return (
    <div
      className="fixed top-[35%] left-1/2 -translate-x-1/2 bg-rhythmBlack text-white w-[340px] rounded-md max-h-52 overflow-auto scrollbar-hide"
      onClick={(e) => e.stopPropagation()}
    >
      <IoCloseOutline
        className="absolute right-3 top-3 w-7 h-7 text-white/80 cursor-pointer"
        onClick={handleClickCloseModal}
      />
      <div className="bg-white/20 p-6 w-full flex flex-col">
        <h2 className="font-semibold mb-7 mt-3 text-center">
          내 플레이리스트에 추가
        </h2>
        <ul className="flex flex-col">
          {myPlaylists?.map((playlist) => (
            <li className="hover:bg-white/10" key={playlist.id}>
              <PlusButton
                playlistId={playlist.id}
                playlistName={playlist.name}
                trackUri={trackUri}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddMusicOnMyPlaylistModal;
