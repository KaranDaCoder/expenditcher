'use client';
import React, { useState } from 'react'
import { SettingsIcon } from '../AllSvgs';
import Link from 'next/link';
import GoogleSignOut from './GoogleSignOut';

const UserProfilePanel = () => {
  return (
    <div className='relative flex items-end justify-end'>
      <div className='absolute top-0 h-40 bg-white border rounded-md shadow-md w-36 lg:right-0'>
        <ul className='flex flex-col items-center justify-center w-full h-full gap-4 space-y-2'>
          <Link
            href={'/manage'}
            className='flex items-center justify-center w-full gap-4'
          >
            <SettingsIcon />
            <span className='text-base font-semibold capitalize text-slate-600'>
              manage
            </span>
          </Link>
         <GoogleSignOut/>
        </ul>
      </div>
    </div>
  );
}

export default UserProfilePanel