"use client";

import { useModalStore } from "@/zustand/modalStore";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  const isModal = useModalStore((state) => state.isModal);
  console.log(isModal);

  return (
    <>
      {/* {isModal === true ? <Modal /> : null} */}
      {children}
    </>
  );
}

export default ModalProvider;
