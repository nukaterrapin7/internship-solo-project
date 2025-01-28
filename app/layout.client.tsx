'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import NavBar from './NavBar';
import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';

const UserContext = createContext<{
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      const { username } = JSON.parse(storedUser);
      setUser(username);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar user={user} setUser={setUser} />
      <main className="p-5">{children}</main>
    </UserContext.Provider>
  );
}
