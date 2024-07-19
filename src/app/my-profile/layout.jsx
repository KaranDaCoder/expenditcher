import React from 'react'
import Link from 'next/link'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
const layout = ({children}) => {
  return (

   <div className='flex justify-between w-full h-screen gap-2 lg:gap-4'>
    <div className="flex items-center justify-center w-1/6 h-full lg:w-1/3">
     <div className='flex flex-col items-center justify-around w-full bg-white border shadow-md rounded-xl h-5/6'>
      <Link href={'/my-profile'} className='inline-flex items-center justify-center w-3/4 h-16 gap-2 lg:gap-4 lg:justify-start'>
       <PersonIcon fontSize='large' className='text-slate-700' />
       <span className='hidden font-light transition-all duration-300 hover:font-semibold lg:block lg:text-xl'>My Profile</span>
       <ArrowForwardIosIcon fontSize='20px' className='hidden text-sm lg:flex'/>
      </Link>
      <Link href={'/my-profile/payment-modes'} className='inline-flex items-center justify-center w-3/4 h-16 gap-2 lg:justify-start'>
       <CreditScoreIcon fontSize='large' className='text-blue-950'/>
       <span className='hidden font-light transition-all duration-300 hover:font-semibold lg:block lg:text-xl'>Payment Modes</span>
       <ArrowForwardIosIcon fontSize='20px' className='hidden text-sm lg:flex'/>
      </Link>
      <Link href={'/my-profile/preferred-expenses'} className='flex items-center justify-center w-3/4 h-16 gap-2 lg:justify-start'>
       <ShoppingCartIcon fontSize='large' color='success' />
       <span className='hidden font-light transition-all duration-300 hover:font-semibold lg:block lg:text-xl'>Preferred Expenses</span>
       <ArrowForwardIosIcon className='hidden text-sm lg:flex'/>
      </Link>
     </div>
    </div>
    {children}
   </div>
  )
}

export default layout