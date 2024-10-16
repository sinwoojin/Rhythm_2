"use client";

import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";
import React, { ComponentProps } from "react";
import PublicCheckButton from "../_PublicCheckButton/PublicCheckButton";
import { useModalStore } from "@/zustand/modalStore";

function CreatePlayListModal() {
  const isCreatePlayListModal = useModalStore(
    (state) => state.isCreatePlayListModal
  );
  const setIsCreatePlayListModal = useModalStore(
    (state) => state.setIsCreatePlayListModal
  );

  const handleClickDivCancel: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) setIsCreatePlayListModal(false);
  };
  const handleClickButtonCancel = () => {
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
          <Input className="outline-none"></Input>
          <div className="h-16 flex items-center justify-between">
            <span className="text-xl font-medium">공개 설정</span>
            <PublicCheckButton />
          </div>
          <div className="flex gap-x-5">
            <Button onClick={handleClickButtonCancel} className="w-full h-12">
              취소
            </Button>
            <Button className="w-full h-12">만들기</Button>
            {/* 여기에 핸들러 달아서 데이터 수파베이스로 보내거나 하면 될듯 */}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default CreatePlayListModal;
