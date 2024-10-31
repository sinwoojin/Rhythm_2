'use client';

import { api } from '@/api/spotifyApi';
import { useModalStore } from '@/zustand/modalStore';
import useSpotifyStore from '@/zustand/spotifyStore';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';

interface lyricsModalProps {
  trackTitle?: string;
  trackImg?: string;
  trackId?: string | null;
}

function LyricsModal({ trackTitle, trackImg, trackId }: lyricsModalProps) {
  const currentTrack = useSpotifyStore((state) => state.currentTrack);
  const closeModal = useModalStore((state) => state.closeModal);

  const activeTrackId = currentTrack?.id || trackId;
  const activeTrackTitle = currentTrack?.name || trackTitle;
  const activeTrackImg = currentTrack?.album.images[0].url || trackImg;
  const activeArtistName = currentTrack?.artists[0].name || '';

  const { data: lyric, isLoading } = useQuery({
    queryKey: ['lyric', { trackId: activeTrackId }],
    queryFn: () => api.lyrics.getTrackLyricOnClient(activeTrackId!),
    enabled: !!activeTrackId,
  });

  if (!activeTrackId) return null;

  return (
    <div
      className="fixed top-[50%] left-[50%] w-[500px] h-[500px] bg-rhythmBlack -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white p-8 z-30"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        aria-label="닫기"
        className="text-white text-4xl absolute top-4 right-4"
        onClick={closeModal}
      >
        <IoCloseOutline />
      </button>
      <div className="flex flex-col gap-y-6 w-full h-full">
        <div className="flex gap-x-8 items-center">
          <div className="h-24 aspect-square bg-slate-600">
            <img src={activeTrackImg} alt="image" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl">{activeTrackTitle}</span>
            <span className="text-base text-gray-300">{activeArtistName}</span>
          </div>
        </div>
        <div className="max-h-full overflow-y-auto">
          {isLoading ? (
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <p>가사 불러오는 중...</p>
            </motion.div>
          ) : lyric ? (
            <p className="w-1/2 text-lg text-white/50 leading-6">{lyric}</p>
          ) : (
            <p className="text-red-500">가사를 찾을 수 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LyricsModal;
