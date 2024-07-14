import Link from 'next/link'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const NavbarDesktop = () => {
  return (
    <div className='items-center justify-center hidden w-full gap-10 py-2 lg:flex h-1/2'>
     <Link href={"/dashboard"} className='flex flex-col items-center justify-center min-w-32 hover:font-semibold'>
     <span className='w-full text-center'><DashboardIcon color='secondary' fontSize='medium'/></span>
      <p>Dashboard</p>
     </Link>
    <Link href={"/add-new-expense"} className='flex flex-col items-center justify-center min-w-32 hover:font-semibold'>
        <span className='w-full text-center'><AttachMoneyIcon color='secondary' fontSize='medium' /></span>
      <p>Add Expense</p>
     </Link>
      <Link href={"/payment-modes"} className='flex flex-col items-center justify-center min-w-36 hover:font-semibold'>
        <span className='w-full text-center'><CreditCardIcon color='secondary' fontSize='medium' /></span>
        <p>Payment Modes</p>
      </Link>
     <Link href={"/my-profile"} className='flex flex-col items-center justify-center min-w-32 hover:font-semibold'>
     <span className='w-full text-center'><PersonIcon color='secondary' fontSize='medium' /></span>
      <p>My Profile</p>
     </Link>
    </div>
  )
}

export default NavbarDesktop