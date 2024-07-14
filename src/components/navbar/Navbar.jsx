import React from 'react'
import NavbarDesktop from './NavbarDesktop'
import Link from 'next/link'
import SignOut from '../client/SignOut'
import NavbarMobile from './NavbarMobile'
import SignIn from '../client/SignIn'
import { auth } from '@/auth'

const Navbar = async () => {
 const session = await auth();
  return (
    <nav className='sticky top-0 w-full h-12 py-2 border-b lg:h-24 bg-inherit'>
     <div className='flex items-center justify-between w-full h-full lg:h-1/2'>
     {session && <NavbarMobile/>}
     <Link href={"/"} className='text-xl font-light tracking-wide lg:text-3xl'>EXPEN<span className='font-semibold'>DITCHER</span></Link>
     {session ? <SignOut/> : <SignIn/>}
     </div>
     {session && <NavbarDesktop/>}

    </nav>
  )
}

export default Navbar