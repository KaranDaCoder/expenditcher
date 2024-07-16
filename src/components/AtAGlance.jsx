import { format } from '@/lib/apiRequests';
import moment from 'moment';
import Link from 'next/link'
import React from 'react'

const AtAGlance = ({data}) => {
  return (
    <div className='col-span-1 p-2 bg-white border shadow-lg min-h-60 rounded-xl hover:border hover:border-green-500'>
    <h2 className='flex items-center justify-center w-full h-10 overflow-hidden text-lg font-semibold tracking-wide text-center uppercase'>At a Glance</h2>
    <div className='flex flex-col justify-around gap-4 overflow-hidden h-50'>
     <h1 className='inline-flex items-center justify-center w-full gap-1 text-5xl font-light tracking-wide text-green-700'>{format(data?.expense_total)}</h1>
     <p className='inline-flex flex-wrap justify-center w-full px-4 pt-3 italic text-center text-slate-600'>You have spent from {data?.count} transactions until today, {moment().format('MMMM DD, `YY')}.</p>
        <p className='w-full text-xs italic tracking-wide text-center lowercase'>(Includes Completed, Pending and Canceled Expenses)</p>
     <h2 className='flex items-center justify-center h-12'>
      <Link href={"/expenses"} className='w-1/2 py-2 tracking-wide text-center text-white uppercase rounded-xl bg-slate-700'>View All</Link>
     </h2>
    </div>
   </div>
  )
}

export default AtAGlance