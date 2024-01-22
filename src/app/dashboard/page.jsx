import { getServerSession } from 'next-auth/next';
import React from 'react';
import { authOptions } from '@/lib/auth';
import Feature from '@/components/dashboard/Feature';
import UserExpenseModes from '@/components/dashboard/UserExpenseModes';

const UserDashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if(!session) {
    return <p>Ooops... Someting Went Wrong!</p>
  }
  const { user } = session;

  return (
    <div className='w-full min-h-[100dvh] flex flex-col gap-6'>
      <Feature user={user} />
      <UserExpenseModes owner_id={user._id} />
    </div>
  );
};

export default UserDashboardPage;
