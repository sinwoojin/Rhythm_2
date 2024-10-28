'use client';
import { useModalStore } from '@/zustand/modalStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { CiHeart } from 'react-icons/ci';
import { IoMdAddCircle, IoMdShare } from 'react-icons/io';
import { MdOutlineLyrics } from 'react-icons/md';
import { toast } from 'react-toastify';

function OptionModal() {
  const closeModal = useModalStore((state) => state.closeModal);
  const currentTrack = useSpotifyStore((state) => state.currentTrack);
  const addTrackToPlaylist = useSpotifyStore(
    (state) => state.addTrackToPlaylist,
  );
  const getMyPlaylists = useSpotifyStore((state) => state.getMyPlaylists);

  const { data: playlists } = useQuery({
    queryKey: ['myPlaylists'],
    queryFn: () => getMyPlaylists(),
  });
  const myPlaylistsId = playlists?.items.map((item) => item.id);
  const trackUri = currentTrack?.uri;
  const handleClickCancel = () => {
    closeModal();
  };

  const handleClickAddTrack = () => {
    if (!myPlaylistsId)
      return toast.warn(
        '플레이 리스트가 존재하지 않습니다. 먼저 플레이 리스트를 만들어 주세요',
      );
    addTrackToPlaylist(String(trackUri), myPlaylistsId[0]);
  };

  return (
    <div className="fixed w-full h-screen z-20" onClick={handleClickCancel}>
      <div className="fixed bottom-[116px] left-80 w-60 bg-black z-30 rounded-md">
        <ul className="bg-white bg-opacity-20 w-full text-white pb-4 rounded-md">
          <li className="flex gap-x-4 items-center py-4 px-4 hover:bg-white/[0.05]">
            <Link
              href="/노래 디테일 페이지로 이동"
              className="h-14 aspect-square bg-gray-400"
            >
              <img
                className="h-full w-full object-cover"
                src={currentTrack?.album.images[0].url}
                alt=""
              />
            </Link>
            <div className="flex flex-col overflow-x-hidden">
              <span className="text-lg line-clamp-1">{currentTrack?.name}</span>
              <span className="text-base text-white text-opacity-50 line-clamp-1">
                {currentTrack?.artists[0].name}
              </span>
            </div>
          </li>
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button className="flex gap-x-4 items-center">
              <CiHeart className="text-2xl" />
              좋아요
            </button>
          </li>
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button className="flex gap-x-4 items-center">
              <IoMdAddCircle
                className="text-2xl"
                onClick={handleClickAddTrack}
              />
              내 플레이리스트 추가
            </button>
          </li>
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button className="flex gap-x-4 items-center">
              <MdOutlineLyrics className="text-2xl" />
              가사 보기
            </button>
          </li>
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button className="flex gap-x-4 items-center">
              <IoMdShare className="text-2xl" />
              공유
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OptionModal;
