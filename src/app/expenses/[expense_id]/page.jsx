import { auth } from '@/auth';
import BreadCrumb from '@/components/BreadCrumb';
import CrudExpense from '@/components/client/CrudExpense';
import { getExpenseDetails } from '@/lib/apiRequests';
import moment from 'moment/moment';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const { format } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const ExpenseInfo = async ({ params }) => {
  const session = await auth();
  if (!session) redirect('/');
  const { expense_id } = params;
  const expense = await getExpenseDetails(expense_id);
  return (
    <div className='flex flex-col w-full h-full'>
      <div className='w-full h-8'>
        <BreadCrumb link={'Dashboard'} activeLink1={expense?.result?.name} activeLink={'expenses'} />
      </div>
      <h1 className='w-full text-2xl font-semibold tracking-wide text-center uppercase'>Expense Details</h1>
      {expense?.result?.name ? <div className='flex flex-col justify-center w-full gap-4 p-4 mx-auto border shadow-xl bg-yellow-400/30 lg:w-1/2 h-5/6 rounded-2xl'>
        <div className='flex flex-col w-full gap-5 p-2'>
          <h2 className='w-full text-5xl font-light text-center capitalize text-slate-700'>{expense?.result?.name}</h2>
          <h2 className='w-full text-5xl font-light text-center text-green-700 capitalize'>{format(expense?.result?.amount / 100)}</h2>
        </div>
        <div className='flex flex-col w-full h-auto gap-2 p-4 bg-white border rounded-xl'>
          <h2 className='text-sm font-light capitalize lg:text-base text-start text-slate-700'> <span className='font-semibold text-slate-500'>Created on : </span> {moment(expense?.result?.date).format('DD MMMM YYYY')}</h2>
          <h2 className='text-sm font-light capitalize lg:text-base text-start text-slate-700'> <span className='font-semibold text-slate-500'>payment mode used : </span>{expense?.result?.payment_mode_id?.payment_mode_name}</h2>
          <h2 className='text-sm font-light capitalize lg:text-base text-start text-slate-700'> <span className='font-semibold text-slate-500'>payment status : </span>  {expense?.result?.status}</h2>
          <h2 className='text-sm font-light capitalize lg:text-base text-start text-slate-700'> <span className='font-semibold text-slate-500'>category : </span>  {expense?.result?.category}</h2>
          <h2 className='text-sm font-light uppercase lg:text-base text-start text-slate-700'> <span className='font-semibold capitalize text-slate-500'>location :  </span>{expense?.result?.state || 'MN'}</h2>
          <h2 className='text-base font-light capitalize text-start text-slate-700'><span className='font-semibold text-slate-500'>description : </span>{expense?.result?.desc || 'No description for this expense'}</h2>
        </div>
        <CrudExpense expense_id={expense?.result?._id} expense_name={expense?.result?.name} />
      </div> : <div className='flex items-center justify-center w-full h-full'>
          <div className='flex flex-col items-center justify-center w-full gap-6 bg-white border shadow-xl lg:w-1/2 h-1/2 rounded-2xl'>
              <h2 className='w-full text-2xl text-center'>Expense Deleted Successfully!</h2>
              <p className='w-full text-lg text-center'>Navigate to dashboard or your expenses</p>
              <div className='flex justify-around w-full'>
                <Link className='px-4 py-2 text-white rounded-md bg-slate-700' href={'/dashboard'}>Go To Dashboard</Link>
                <Link className='px-4 py-2 text-white rounded-md bg-slate-700' href={'/expenses'}>Go To Expenses</Link>
              </div>
          </div>
        </div>}
    </div>
  )
}

export default ExpenseInfo