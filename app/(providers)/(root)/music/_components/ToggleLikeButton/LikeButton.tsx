'use client';

import { useLikeStore } from '@/zustand/likeStore';
import { PiHeartStraightDuotone, PiHeartStraightFill } from 'react-icons/pi';

interface ToggleLikeButtonProps {
  trackId: string;
}

function LikeButton({ trackId }: ToggleLikeButtonProps) {
  const isLike = useLikeStore((state) => state.isLike);
  const like = useLikeStore((state) => state.like);
  const unLike = useLikeStore((state) => state.unLike);
  return (
    <div className="w-14 h-14 text-center justify-center">
      {!isLike ? (
        <button
          className="pl-2.5 bg-red-500 w-full h-full rounded-full text-white transition-all duration-300 hover:scale-110 text-4xl"
          onClick={() => like()}
        >
          <PiHeartStraightDuotone />
        </button>
      ) : (
        <button className="bg-red-500 py-4 pl-4 pr-4 text-white rounded-full transition-all duration-300 hover:scale-110 text-4xl">
          <PiHeartStraightFill />
        </button>
      )}
    </div>
  );
}

export default LikeButton;
