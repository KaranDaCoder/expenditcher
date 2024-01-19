import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const AuthSessionProvider = async({children}) => {
  let serverSession = await getServerSession(authOptions);
  return <div session={serverSession}>{children}</div>;
}

export default AuthSessionProvider