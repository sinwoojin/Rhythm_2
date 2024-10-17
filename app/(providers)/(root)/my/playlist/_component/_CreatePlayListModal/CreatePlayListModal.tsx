"use client";

import { api } from "@/api/spotifyApi";
import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";
import { useModalStore } from "@/zustand/modalStore";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import PublicCheckButton from "../_PublicCheckButton/PublicCheckButton";

function CreatePlayListModal() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClickCreatePlayList = async () => {
    const createPlaylist = await api.userPlaylist.createPlaylists(
      title,
      description
    );
    router.push("/");
    setIsCreatePlayListModal(false);
    return createPlaylist;
  };

  const isCreatePlayListModal = useModalStore(
    (state) => state.isOnCreatePlayListModal
  );
  const setIsCreatePlayListModal = useModalStore(
    (state) => state.setIsOnCreatePlayListModal
  );

  const handleClickDivCancel: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) setIsCreatePlayListModal(false);
  };
  const handleClickCancelButton = () => {
    setIsCreatePlayListModal(false);
  };
  return isCreatePlayListModal ? (
    <div
      onClick={handleClickDivCancel}
      className="fixed top-0 left-0 w-full h-full bg-white/10 z-10"
    >
      <div className="absolute top-[50%] left-[50%] w-[500px] bg-[#121212] -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white p-10">
        <h4 className="text-xl font-semibold text-center py-10">
          새 플레이리스트
        </h4>
        <div className="flex flex-col gap-y-5">
          <Input
            className="outline-none"
            placeholder="플레이 리스트 제목"
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
          <Input
            className="outline-none"
            placeholder="플레이 리스트 소개 글"
            onChange={(e) => setDescription(e.target.value)}
          ></Input>
          <div className="h-16 flex items-center justify-between">
            <span className="text-[15px] px-2.5 py-1 font-semibold">
              공개 설정
            </span>
            <PublicCheckButton />
          </div>
          <div className="flex gap-x-5">
            <Button onClick={handleClickCancelButton} className="w-full h-12">
              취소
            </Button>
            <Button onClick={handleClickCreatePlayList} className="w-full h-12">
              만들기
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default CreatePlayListModal;
