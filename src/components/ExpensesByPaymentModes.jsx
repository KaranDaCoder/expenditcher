import { format, getUserPaymentModes } from '@/lib/apiRequests'
import { expensesByFilter } from '@/utils/getExpensesByFilter';
import Link from 'next/link';
import React from 'react'

const ExpensesByPaymentModes = async ({ data }) => {
 const paymentModes = await getUserPaymentModes();
 // console.log(data)
 // console.log(paymentModes)


 return (
  <div className='col-span-1 row-start-2 bg-white border min-h-60 rounded-xl hover:border hover:border-green-500'>
   <h2 className='flex items-center justify-center w-full h-10 overflow-hidden text-lg font-semibold tracking-wide text-center uppercase'>Expenses by payment modes</h2>
   <p className='w-full text-xs italic tracking-wide text-center lowercase'>(Includes Completed, Pending and Canceled Expenses)</p>
   <div className='flex flex-col items-start justify-start w-full h-full px-10 py-4 space-y-4 capitalize'>
    {paymentModes?.result?.map(async paymentMode => (
     <div className='flex items-center justify-between w-full'>
      <Link href={`/expenses?payment_mode_id=${paymentMode._id}`} className='w-full hover:font-semibold hover:text-slate-700'>{paymentMode.payment_mode_name}</Link>     
      <span className='inline-flex justify-start w-full'>{format(expensesByFilter(data, 'payment_mode_id', paymentMode?._id?.toString()).total)}</span>
      <p className=''>{ expensesByFilter(data, 'payment_mode_id', paymentMode?._id?.toString()).count}</p> 
     </div>
     ))}
    <div className='w-full h-1 border bg-slate-500'></div>
    <div className='flex items-center justify-between w-full'>
     <h2 className='w-full text-lg'>Total</h2>
     <h2>{data.count}</h2>
    </div>
   </div>
  </div>
 )
}

export default ExpensesByPaymentModes