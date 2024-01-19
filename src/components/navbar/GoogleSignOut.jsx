import { LogoutIcon } from '../AllSvgs';
import { signOut } from 'next-auth/react';

const GoogleSignOut = () => {
  return (
    <button className='flex items-center justify-center w-full gap-4' onClick={() => signOut({callbackUrl: '/'})}>
      <LogoutIcon />
      <span className='text-base font-semibold capitalize text-slate-600'>
        Logout
      </span>
    </button>
  );
}

export default GoogleSignOut