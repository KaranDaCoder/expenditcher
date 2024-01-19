import { getServerSession } from 'next-auth/next'
import React from 'react'
import { authOptions } from '@/lib/auth';

const UserDashboardPage = async () => {
 const {user:{_id , username}} = await getServerSession(authOptions);

  return (
    <div className='w-full min-h-full border'>
     <p>Logged In User : {_id} with username: {username}</p>
    </div>
  )
}

export default UserDashboardPage