'use client'

import { signOut } from "next-auth/react"

const SignOut = () => {
  return (
    <button onClick={() => signOut({callbackUrl: '/'})} className="px-4 py-1 text-sm capitalize transition-all duration-300 border rounded-md lg:text-base hover:bg-slate-600 hover:text-white">
      Sign out
    </button>
  )
}

export default SignOut