import Link from 'next/link'
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ClearIcon from '@mui/icons-material/Clear';

const ExpensesByStatus = ({ completed, pending, canceled }) => {
  return (
    <div className='col-span-1 row-start-3 bg-white border min-h-60 rounded-xl hover:border hover:border-green-500'>
    <h2 className='flex items-center justify-center w-full h-10 overflow-hidden text-lg font-semibold tracking-wide text-center uppercase'>Expenses by status</h2>
    <div className='flex flex-col items-center justify-center px-10 space-y-4 capitalize h-50'>
     <Link href={"/expenses?status=completed"} className='inline-flex items-center justify-between w-full gap-5 text-lg hover:font-semibold hover:text-slate-700'>     <span><CheckIcon fontSize='medium' /> Completed</span><span>{completed}</span></Link>

        <Link href={"/expenses?status=pending"} className='inline-flex items-center justify-between w-full gap-5 text-lg hover:font-semibold hover:text-slate-700'><span><HourglassBottomIcon fontSize='medium' /> Pending </span><span>{pending}</span></Link>
        <Link href={"/expenses?status=canceled"} className='inline-flex items-center justify-between w-full gap-5 text-lg hover:font-semibold hover:text-slate-700'> <span><ClearIcon fontSize='medium'/>Canceled</span> <span>{canceled}</span></Link>
     <div className='w-full h-1 border bg-slate-500'></div>
     <h2 className='inline-flex justify-between w-full gap-5 text-lg'>Total<span>{completed + pending + canceled}</span></h2>
    </div>
   </div>
  )
}

export default ExpensesByStatus