import { getServerSession } from 'next-auth/next'
import React from 'react'
import { authOptions } from '@/lib/auth';
import Feature from '@/components/dashboard/Feature';



const UserDashboardPage = async () => {
 const {user} = await getServerSession(authOptions);

  return (
    <div className='w-full min-h-[100dvh]'>
      <Feature user={user}/>
     {/* <p>Logged In User : {_id} with username: {username}</p> */}
    </div>
  )
}

export default UserDashboardPage