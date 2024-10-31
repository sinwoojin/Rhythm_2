'use client';
import { useModalStore } from '@/zustand/modalStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { CiHeart } from 'react-icons/ci';
import { IoMdAddCircle, IoMdShare } from 'react-icons/io';
import { MdOutlineLyrics } from 'react-icons/md';
import { toast } from 'react-toastify';
import AddMusicOnMyPlaylistModal from '../AddMusicOnMyPlaylistModal/AddMusicOnMyPlaylistModal';
import LyricsModal from '../LyricsModal/LyricsModal';
interface OptionModalProps {
  location: string;

  trackTitle: string;
  trackImg: string;
}

function OptionTrackModal({
  location,
  trackTitle,
  trackImg,
}: OptionModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);
  const currentTrack = useSpotifyStore((state) => state.currentTrack);

  const handleClickModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    closeModal();

    const targetElement = (e.target as HTMLElement).closest('[id]');
    const targetId = targetElement?.id;

    if (targetId === 'addMusicToMyPlaylistButton') {
      if (!currentTrack) return toast.warn('재생중인 음악이 없습니다.');
      openModal({
        element: <AddMusicOnMyPlaylistModal />,
        backdrop: true,
      });
    } else if (targetId === 'showMusicLyricsButton') {
      if (!currentTrack) return toast.warn('재생중인 음악이 없습니다.');
      openModal({
        element: <LyricsModal />,
        backdrop: true,
      });
    }
  };

  return (
    <div className="fixed w-full h-screen z-50" onClick={handleClickModalClose}>
      <div
        className={cx('absolute w-60 bg-[#121212] rounded-md', {
          'bottom-[116px] left-80': location === 'player' || 'tracks',
          'top-[35%] left-[47%]': location === 'track',
        })}
      >
        <ul className="bg-white bg-opacity-20 w-full text-white py-4 rounded-md">
          {location === 'player' || 'tracks' ? (
            <li className="flex gap-x-4 items-center py-2 px-4 hover:bg-white/[0.05]">
              <Link
                href="/노래 디테일 페이지로 이동"
                className="h-14 aspect-square bg-gray-400"
              >
                <img
                  className="h-full w-full object-cover"
                  src={!trackImg ? trackImg : currentTrack?.album.images[0].url}
                  alt="흠"
                />
              </Link>
              <div className="flex flex-col overflow-x-hidden">
                <span className="text-lg line-clamp-1">
                  {!trackTitle ? trackTitle : currentTrack?.name}
                </span>
                <span className="text-base text-white text-opacity-50 line-clamp-1">
                  {currentTrack?.artists[0].name}
                </span>
              </div>
            </li>
          ) : null}
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button className="flex gap-x-4 items-center">
              <CiHeart className="text-2xl" />
              좋아요
            </button>
          </li>
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button
              className="flex gap-x-4 items-center"
              id="addMusicToMyPlaylistButton"
            >
              <IoMdAddCircle
                className="text-2xl"
                id="addMusicToMyPlaylistButton"
              />
              내 플레이리스트 추가
            </button>
          </li>
          <li className="py-[12px] px-4 hover:bg-white/[0.05] text-base">
            <button
              className="flex gap-x-4 items-center"
              id="showMusicLyricsButton"
            >
              <MdOutlineLyrics
                className="text-2xl"
                id="showMusicLyricsButton"
              />
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

export default OptionTrackModal;
