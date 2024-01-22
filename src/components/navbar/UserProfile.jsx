'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { ArrowIconDown, ArrowIconUp } from '../AllSvgs';
import UserProfilePanel from './UserProfilePanel';

const UserProfile = ({ userImage }) => {
  const [userPanel, setUserPanel] = useState(false);

  return (
    <div className='' onMouseLeave={() => setUserPanel(!userPanel)}>
      <div className='relative flex items-center w-auto h-full gap-1 py-1 transition-all duration-200 rounded-full cursor-pointer hover:scale-105'>
        <Image
          src={userImage}
          height={1920}
          width={1080}
          alt={'profile'}
          className={`w-10 h-10 mx-auto rounded-full lg:h-14 lg:w-14`}
          onMouseEnter={() => setUserPanel(!userPanel)}
        />
        {userPanel ? <ArrowIconUp /> : <ArrowIconDown />}
      </div>
      {userPanel && <UserProfilePanel setUserPanel={setUserPanel} />}
    </div>
  );
};

export default UserProfile