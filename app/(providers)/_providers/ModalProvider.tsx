"use client";

import { useModalStore } from "@/zustand/modalStore";
import { PropsWithChildren } from "react";
import LogInModal from "../_components/LogInModal";
import LyricsModal from "../_components/LyricsModal";
import OptionModal from "../_components/OptionModal";

function ModalProvider({ children }: PropsWithChildren) {
  const isOnLogInModal = useModalStore((state) => state.isOnLogInModal);
  const isOnLyricsModal = useModalStore((state) => state.isOnLyricsModal);
  const isOnOptionModal = useModalStore((state) => state.isOnOptionModal);

  return (
    <>
      {isOnLogInModal ? <LogInModal /> : null}
      {isOnLyricsModal ? <LyricsModal /> : null}
      {isOnOptionModal ? <OptionModal /> : null}
      {children}
    </>
  );
}

export default ModalProvider;
