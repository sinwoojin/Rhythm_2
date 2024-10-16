import Button from "@/app/_components/Button";
import { User } from "@/schema/type";
import { supabase } from "@/supabase/client";
import React, { useEffect, useState } from "react";

interface FollowModalProps {
  onClose: () => void;
  userId: string; // 현재 프로필의 유저 ID
}

const FollowModal: React.FC<FollowModalProps> = ({ onClose, userId }) => {
  const [followers, setFollowers] = useState<User[]>([]); // 팔로워 목록 상태

  // 팔로워 목록 가져오는 함수
  const fetchFollowers = async () => {
    const { data: followersData } = await supabase
      .from("follow")
      .select("follower")
      .eq("following", userId);

    if (followersData) {
      const followerIds = followersData.map((follow) => follow.follower);
      // 팔로워의 정보를 가져옴
      const { data: usersData } = await supabase
        .from("users")
        .select("*")
        .in("id", followerIds);

      setFollowers(usersData || []); // 팔로워 목록 업데이트
    }
  };

  useEffect(() => {
    fetchFollowers(); // 컴포넌트 마운트 시 팔로워 목록 가져오기
  }, [userId]);

  return (
    <main
      className="bg-white/10 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-20"
      onClick={onClose}
    >
      <div
        className="absolute top-[50%] left-[50%] w-[500px] h-[530px] bg-[#121212] -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-black rounded-xl p-10 w-full h-full">
          <h2 className="text-lg font-semibold mb-4">팔로워 목록</h2>
          {followers.length === 0 ? (
            <p>팔로워가 없습니다.</p>
          ) : (
            <ul>
              {followers.map((follower) => (
                <li
                  key={follower.id}
                  className="flex justify-between items-center py-2"
                >
                  <span>{follower.userName}</span>
                  <Button
                    onClick={() => {
                      // 언팔로우 기능 구현 (필요 시)
                      console.log(`언팔로우: ${follower.userName}`);
                    }}
                  >
                    언팔로우
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Button className="mt-4 absolute bottom-10 " onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </main>
  );
};

export default FollowModal;
