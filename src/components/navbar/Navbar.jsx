import React from 'react';
import NavbarRight from './NavbarRight';
import GoogleSignIn from './GoogleSignIn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

const Navbar = async () => {
 const session = await getServerSession(authOptions);

  return (
    <div className='sticky top-0 w-full h-16 py-2 bg-white lg:h-20'>
      <div className='flex items-center justify-between w-full h-full'>
        <Link href={"/"} className='flex items-center justify-start flex-1'>
          <p className='text-lg font-extrabold tracking-wider text-red-500 uppercase lg:text-5xl -rotate-6'>
            E
            <span className='text-sm font-semibold tracking-widest lg:text-3xl text-slate-600'>
              xpen
            </span>
          </p>
          <p className='text-lg font-extrabold tracking-wider text-red-500 uppercase rotate-0 lg:text-5xl'>
            D
            <span className='text-sm font-semibold tracking-widest lg:text-3xl text-slate-600'>
              itcheR
            </span>
          </p>
        </Link>
        {session === null ? <GoogleSignIn /> : <NavbarRight user={session?.user}/>}
      </div>
    </div>
  );
};

export default Navbar;
