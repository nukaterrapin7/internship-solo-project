'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { TfiCheckBox } from 'react-icons/tfi';
import classNames from 'classnames';

type NavBarProps = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

const NavBar: React.FC<NavBarProps> = ({ user, setUser }) => {
  const currentPath = usePathname();
  const router = useRouter();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Tasks', href: '/tasks' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('mockUser');
    setUser(null);

    router.push('/login');
  };

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <TfiCheckBox />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              'text-indigo-900': link.href === currentPath,
              'text-indigo-500': link.href !== currentPath,
              'hover:text-indigo-800 transition-colors': true,
            })}
            href={link.href}>
            {link.label}
          </Link>
        ))}
        {user ? (
          <>
            <span>Welcome, {user}!</span>
            <button
              onClick={handleLogout}
              className="ml-4 text-red-500 hover:text-red-700 transition-colors">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
