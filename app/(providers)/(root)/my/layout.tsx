import React, { PropsWithChildren } from "react";
import CreatePlayListModal from "./playlist/_component/_CreatePlayListModal/CreatePlayListModal";

function MyLayout({ children }: PropsWithChildren) {
  return (
    <>
      <CreatePlayListModal />
      {children}
    </>
  );
}

export default MyLayout;
