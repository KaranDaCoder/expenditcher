import React from 'react';
import NavbarRight from './NavbarRight';
import GoogleSignIn from './GoogleSignIn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

const Navbar = async () => {
 const session = await getServerSession(authOptions);

  return (
    <div className='sticky top-0 z-20 w-full h-16 py-2 bg-white lg:h-20'>
      <div className='flex items-center justify-between w-full h-full gap-4 lg:gap-2'>
        <Link
          href={'/'}
          className='flex items-center justify-center max-w-fit'
        >
          <p className='text-2xl font-extrabold tracking-wider text-red-500 uppercase lg:text-6xl md:text-4xl -rotate-6'>
            E
            <span className='text-xl font-extrabold tracking-widest lg:font-semibold lg:text-3xl text-slate-600'>
              xpen
            </span>
          </p>
          <p className='text-xl font-extrabold tracking-wider text-red-500 uppercase rotate-0 lg:text-6xl md:text-4xl'>
            D
            <span className='text-xl font-extrabold tracking-widest lg:font-semibold lg:text-3xl text-slate-600'>
              itcheR
            </span>
          </p>
        </Link>
        {session === null ? (
          <GoogleSignIn />
        ) : (
          <NavbarRight user={session?.user} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
