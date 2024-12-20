import Link from 'next/link'
import React from 'react'
import { TfiCheckBox } from "react-icons/tfi";

const NavBar = () => {
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
                className='text-indigo-500 hover:text-indigo-800 transition-colors' 
                href={link.href}>{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default NavBar
