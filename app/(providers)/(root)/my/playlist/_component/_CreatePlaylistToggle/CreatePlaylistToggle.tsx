"use client";
import Button from "@/app/_components/Button";
import { useModalStore } from "@/zustand/modalStore";
import React from "react";
import { IoMdAddCircle } from "react-icons/io";

function CreatePlaylistToggle() {
  const setIsCreatePlayListModal = useModalStore(
    (state) => state.setIsCreatePlayListModal
  );

  const handleClickCreatePlaylistToggle = () => {
    setIsCreatePlayListModal(true);
  };
  return (
    <Button
      onClick={handleClickCreatePlaylistToggle}
      className="w-full py-3 flex items-center justify-center text-xl gap-x-4"
    >
      <IoMdAddCircle /> Make PlayList
    </Button>
  );
}

export default CreatePlaylistToggle;
