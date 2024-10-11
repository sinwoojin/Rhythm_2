"use client";

import { useModalStore } from "@/zustand/modalStore";
import { PropsWithChildren } from "react";
import LogInModal from "../_components/LogInModal";

function ModalProvider({ children }: PropsWithChildren) {
  const isModal = useModalStore((state) => state.isModal);
  console.log(isModal);

  return (
    <>
      {isModal === true ? <LogInModal /> : null}
      {children}
    </>
  );
}

export default ModalProvider;
