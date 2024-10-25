'use client';

import { useModalStore } from '@/zustand/modalStore';
import { PropsWithChildren } from 'react';

function ModalProvider({ children }: PropsWithChildren) {
  const modal = useModalStore((state) => state.modal);
  const closeModal = useModalStore((state) => state.closeModal);

  // 바깥영역 클릭시 나가짐
  const handleToggleModal = () => {
    closeModal();
  };

  return (
    <>
      {modal?.backdrop ? (
        <div
          className="bg-white/10 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-50"
          onClick={handleToggleModal}
        >
          {modal?.element}
        </div>
      ) : (
        modal?.element
      )}
      {children}
    </>
  );
}

export default ModalProvider;
