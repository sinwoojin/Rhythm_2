import { api } from "@/api/spotifyApi";
import Button from "@/app/_components/Button";
import { User } from "@/schema/type";
import { supabase } from "@/supabase/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FollowModalProps {
  onClose: () => void;
  userId: string; // 현재 프로필의 유저 ID
  modalType: "followers" | "following"; // 모달 타입 추가
}

const FollowModal: React.FC<FollowModalProps> = ({
  onClose,
  userId,
  modalType,
}) => {
  // 팔로워 목록 상태
  const [followers, setFollowers] = useState<User[]>([]);

  // 유저 정보
  // const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 팔로우 상태관리 (zustand)
  // const isFollowing = useFollowStore((state) => state.isFollowing);
  // const follow = useFollowStore((state) => state.follow);
  // const unFollow = useFollowStore((state) => state.unFollow);

  // 팔로워, 팔로잉 목록 가져오는 함수
  const fetchFollowData = async () => {
    let followData;

    if (modalType === "followers") {
      // 팔로워 목록 가져오기
      const { data } = await supabase
        .from("follow")
        .select("follower")
        .eq("following", userId);
      followData = data?.map((follow) => follow.follower) || [];
    } else {
      // 팔로잉 목록 가져오기
      const { data } = await supabase
        .from("follow")
        .select("following")
        .eq("follower", userId);
      followData = data?.map((follow) => follow.following) || [];
    }

    // 팔로워, 팔로잉의 정보를 가져옴
    const { data: usersData } = await supabase
      .from("users")
      .select("*")
      .in("id", followData);

    setFollowers(usersData || []);
  };

  // 팔로우/언팔로우 함수 (미완성)
  // const handleToggleFollow = async (targetUserId: string) => {
  //   if (!currentUser) return; // 로그인한 유저가 없을 경우

  //   const followerId = currentUser.id; // 현재 로그인한 사용자 ID
  //   const followingId = targetUserId; // 프로필 사용자 ID

  //   // 현재 팔로우 여부 확인
  //   const { data: existingFollow } = await supabase
  //     .from("follow")
  //     .select("*")
  //     .eq("follower", followerId)
  //     .eq("following", followingId);

  //   if (existingFollow!.length > 0) {
  //     // 이미 팔로우한 경우 -> 언팔로우 처리
  //     await supabase
  //       .from("follow")
  //       .delete()
  //       .eq("follower", followerId)
  //       .eq("following", followingId);
  //     unFollow();
  //     alert(`${targetUserId}를 언팔로우 했습니다.`);
  //   } else {
  //     // 팔로우하지 않은 경우 -> 팔로우 처리
  //     await supabase.from("follow").insert({
  //       follower: followerId,
  //       following: followingId,
  //     });
  //     follow();
  //     alert(`${targetUserId}를 팔로우 했습니다.`);
  //   }

  //   // 데이터 업데이트
  //   fetchFollowData();
  // };

  useEffect(() => {
    // 팔로워/팔로잉 목록 가져오기
    fetchFollowData();

    // 현재 로그인한 유저 정보 가져오기
    (async () => {
      const user = await api.getUserApi.getUser();
      // setCurrentUser(user?.id); // 로그인한 유저 정보 설정
    })();
  }, [userId, modalType]);

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
          <h2 className="text-lg font-semibold mb-4">
            {modalType === "followers" ? "팔로워 목록" : "팔로잉 목록"}
          </h2>
          {followers.length === 0 ? (
            <p>
              {modalType === "followers"
                ? "팔로워가 없습니다."
                : "팔로잉이 없습니다."}
            </p>
          ) : (
            <ul>
              {followers.map((follower) => (
                <li
                  key={follower.id}
                  className="flex justify-between items-center py-2"
                >
                  <Link href={`/profile-detail/${follower.id}`}>
                    <span>{follower.userName}</span>
                  </Link>
                  {/* {currentUser && currentUser.id !== follower.id && (
                    <Button onClick={() => handleToggleFollow(follower.id)}>
                      {isFollowing ? "언팔로우" : "팔로우"}
                    </Button>
                  )} */}
                </li>
              ))}
            </ul>
          )}
          <Button className="mt-4 absolute bottom-10" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </main>
  );
};

export default FollowModal;
