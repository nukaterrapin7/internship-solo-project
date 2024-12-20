'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { TfiCheckBox } from "react-icons/tfi";
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();

    const links =[
        {label: 'Dashboard', href:'/'},
        {label: 'Tasks', href:'/tasks'}
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/"><TfiCheckBox /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => 
            <Link 
                key={link.href} 
                className={classNames({
                    'text-indigo-900' : link.href === currentPath,
                    'text-indigo-500' : link.href !== currentPath,
                    'hover:text-indigo-800 transition-colors' : true
                })}
                href={link.href}>{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default NavBar
