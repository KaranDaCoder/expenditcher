'use client'
import { useState } from 'react'
import { CloseIcon, HamburgerIcon } from '../SvgIcons'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';

const NavbarMobile = () => {
 const [mobileNav, setMobileNav] = useState(false);
  return (
    <div className='block lg:hidden'>
     <span className='cursor-pointer' onClick={() => setMobileNav(true)}>
     <HamburgerIcon/>
     </span>
    {mobileNav && <div className={`fixed inset-0 w-full h-full bg-white rounded-2xl shadow-2xl`}>
     <div className='flex items-center w-full h-auto px-2 py-2 border-b'>
      <h2 className='w-full text-2xl font-semibold text-center uppercase'>Menu</h2>
      <span className='cursor-pointer' onClick={() =>setMobileNav(!mobileNav)}>
       <CloseIcon />
      </span>
     </div>
     <div className='flex flex-col items-center justify-around h-3/4'>
       <Link href={"/"} className='inline-flex items-center justify-center w-full gap-3 text-3xl text-center' onClick={() => setMobileNav(false)}> <span><DashboardIcon fontSize='large' color='success'/></span>  Dashboard</Link>
       <Link href={"/"} className='inline-flex items-center justify-center w-full gap-3 text-3xl text-center' onClick={() => setMobileNav(false)}> <span><AddIcon fontSize='large' color='success'/></span>Add Expense</Link>
      <Link href={"/"} className='inline-flex items-center justify-center w-full gap-3 text-3xl text-center' onClick={() => setMobileNav(false)}><span><CreditCardIcon fontSize='large' color='success' /></span>Payment Modes</Link>
      <Link href={"/"} className='inline-flex items-center justify-center w-full gap-3 text-3xl text-center' onClick={() => setMobileNav(false)}><span><PersonIcon fontSize='large' color='success' /></span>My Profile</Link>
     </div>
     </div>}
    </div>
  )
}

export default NavbarMobile