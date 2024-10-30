import { PropsWithChildren } from 'react';

function UnderLine({ children }: PropsWithChildren) {
  return <div className="hover:underline">{children}</div>;
}

export default UnderLine;
