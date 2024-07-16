import { auth } from '@/auth';
import AtAGlance from '@/components/AtAGlance';
import BreadCrumb from '@/components/BreadCrumb'
import ExpensesByCategory from '@/components/ExpensesByCategory';
import ExpensesByPaymentModes from '@/components/ExpensesByPaymentModes';
import ExpensesByStatus from '@/components/ExpensesByStatus';
import { getAllExpenses, getUserInfo } from '@/lib/apiRequests';
import { categories_array } from '@/lib/categoryList';
import { expensesByFilter } from '@/utils/getExpensesByFilter';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
  title: "Expenditcher | Dashboard",
  description: "Generated by create next app",
};


const Dashboard = async () => {
  const session = await auth();
  if (!session) redirect('/');
  const data = await getAllExpenses();
  const user = await getUserInfo(session?.user?._id);
  const completedExpenses = expensesByFilter(data, 'status', 'completed');
  const pendingExpenses = expensesByFilter(data, 'status', 'pending');
  const canceledExpenses = expensesByFilter(data, 'status', 'canceled');
  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div className='w-full h-8'>
        <BreadCrumb link={'Dashboard'} />
      </div>
      <div className='flex items-center justify-center'>
        <h1 className='text-4xl font-semibold capitalize'>Hello, {user?.result?.name}.</h1>
      </div>
      <div className='flex flex-col w-full gap-2 lg:grid lg:grid-rows-4 lg:grid-cols-2'>
        <AtAGlance data={data}/>
        <ExpensesByPaymentModes data={data}/>
        <ExpensesByStatus completed={completedExpenses.count} pending={pendingExpenses.count} canceled={canceledExpenses.count} />
        <ExpensesByCategory data={data}/>
        <div className='col-span-1 row-start-4 bg-white border min-h-60 rounded-xl'>
          <h2>MOST EXPENSIVE</h2>
        </div>
        <div className='col-span-1 col-start-2 row-start-4 bg-white border min-h-60 rounded-xl'>
          <h2>CHART 1</h2>
        </div>
      

      </div>
    </div>
  )
}

export default Dashboard