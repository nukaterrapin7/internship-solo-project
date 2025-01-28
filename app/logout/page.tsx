'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('mockUser');
    router.push('/login');
  }, [router]);

  return <p>Logging out...</p>;
};

export default LogoutPage;
