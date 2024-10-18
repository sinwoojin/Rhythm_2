"use client";
import Button from "@/components/Button";
import { useModalStore } from "@/zustand/modalStore";
import { IoMdAddCircle } from "react-icons/io";
import CreatePlayListModal from "../_CreatePlayListModal/CreatePlayListModal";

function CreatePlaylistToggle() {
  const openModal = useModalStore((state) => state.openModal);

  const handleClickCreatePlaylistToggle = () => {
    openModal({ element: <CreatePlayListModal />, backdrop: true });
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
