"use client";

import Button from "@/app/_components/Button";
import { baseURL, User } from "@/schema/type";
import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";
import Page from "../../_components/_Page/Page";
import EditModal from "../_components/EditModal";

interface ProfileDetailPageProps {
  params: {
    userId: string;
  };
  searchParams: {};
}

function ProfileDetailPage(props: ProfileDetailPageProps) {
  const id = props.params.userId;
  const [user, setUser] = useState<User | null>(null);
  const [isModal, setIsModal] = useState(false);

  /**
   * 모달 수정 버튼
   */
  const handleClickOpenEditModal = () => {
    setIsModal(true);
  };

  /**
   * 모달 닫기 버튼 (props로 modal에 전달)
   */
  const handleClickCloseEditModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    (async () => {
      const response = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
      setUser(response.data);
    })();
  }, [id]);
  return (
    <Page>
      {isModal ? (
        <EditModal
          id={id}
          modal={isModal}
          onClose={handleClickCloseEditModal}
        />
      ) : null}
      <div className="grid grid-cols-5 gap-x-10 place-items-center border-b border-white/20 pb-16 mb-10">
        <div className="h-full rounded-full aspect-square bg-white opacity-90 overflow-hidden">
          <img src={baseURL + user?.imgUrl} alt="프로필 이미지" className="z-50"/>
        </div>
        <div className="flex flex-col gap-y-2 w-full h-full col-span-2">
          <span>userName: {user?.userName}</span>
          <span>내 소개: {user?.content}</span>
          <span className="bg-white/20 w-full h-full"></span>
        </div>
        <div className="w-full h-full flex flex-col-reverse items-center gap-y-8 col-span-2">
          <Button
            className="w-full text-center"
            onClick={handleClickOpenEditModal}
          >
            수정하기
          </Button>
          <Button className="w-full text-center">팔로우</Button>
          <div className="flex gap-x-5 w-full">
            <Button className="flex flex-col w-full items-center py-4">
              <span>100K</span>
              <span>팔로워</span>
            </Button>
            <Button className="flex flex-col w-full items-center py-4">
              <span>500K</span>
              <span>팔로잉</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <span>나의 플레이리스트</span>
        <div>
          {/* <PlayLists playListsId={playListsId} /> playListsId에 내 플리 아이디 넣으면 됨 */}
        </div>
        <span>좋아요 한 플레이리스트</span>
        <div>
          {/* <PlayLists likedPlayListsId={likedPlayListsId} /> playListsId에 내 플리 아이디 넣으면 됨 */}
        </div>
      </div>
    </Page>
  );
}

export default ProfileDetailPage;
