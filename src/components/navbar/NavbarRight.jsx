import Link from 'next/link';
import React from 'react'
import { DashboardIcon, PlusIcon } from '../AllSvgs';
import UserProfile from './UserProfile';

const NavbarRight = ({user}) => {
 
  return (
    <div className='w-5/6 h-full lg:w-1/2'>
      <ul className='flex items-center w-full h-full border rounded-full shadow-md justify-evenly '>
        <Link href={'/dashboard'} className='flex lg:hidden'>
          <DashboardIcon />
        </Link>
        <Link href={'/add-expense'} className='flex lg:hidden'>
          <PlusIcon />
        </Link>

        <Link
          href={'/dashboard'}
          className='flex-col items-center justify-center hidden text-sm duration-200 lg:flex hover:scale-105'
        >
          <DashboardIcon />
          <span className='text-sm font-semibold capitalize text-slate-600'>
            My dashboard
          </span>
        </Link>
        <Link
          href={'/add-expense'}
          className='flex-col items-center justify-center hidden transition-all duration-200 lg:flex hover:scale-105'
        >
          <PlusIcon />
          <span className='text-sm font-semibold capitalize text-slate-600'>
            add expense
          </span>
        </Link>
        <UserProfile userImage={user?.image} />
      </ul>
    </div>
  );
}

export default NavbarRight