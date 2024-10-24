'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/today');
  }, []);

  return null;
}
export default HomePage;
