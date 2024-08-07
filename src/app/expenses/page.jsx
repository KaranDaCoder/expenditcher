import { auth } from '@/auth';
import BreadCrumb from '@/components/BreadCrumb';
import ExpenseList from '@/components/ExpenseList';
import Search from '@/components/Search';
import { format, getFilteredExpenses, getUserPaymentMode } from '@/lib/apiRequests';
import { redirect } from 'next/navigation';

export const metadata = {
  title: "Expenditcher | Expenses",
  description: "Generated by create next app",
};
const ExpensesList = async ({ searchParams }) => {
  const session = await auth();
  if (!session) redirect('/');
  let userPaymentMode; 
  const data = await getFilteredExpenses(searchParams?.status, searchParams?.category, searchParams?.payment_mode_id, searchParams?.search);
  if(searchParams?.payment_mode_id) {
    userPaymentMode = await getUserPaymentMode(searchParams.payment_mode_id)
  }
  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div className='w-full h-8'>
        <BreadCrumb link={'Dashboard'} activeLink1={searchParams?.status || (searchParams?.payment_mode_id && userPaymentMode?.result?.payment_mode_name) || searchParams?.category || 'All Expenses'} activeLink={'expenses'} />
        
      </div>
      
      <div className='flex flex-col items-center justify-center w-full h-auto gap-4'>
        <div className='flex flex-col items-center justify-center w-full h-auto py-4 bg-white border rounded-lg shadow-md lg:w-1/2'>
          <div className='flex flex-col items-center justify-start h-full gap-4 p-4'>
            <h1 className='w-full text-xl font-light tracking-wider text-center uppercase lg:text-2xl'>Summary</h1>
            <h2 className='w-full lg;text-4xl text-3xl font-light tracking-wider text-center text-green-700'>{format((searchParams?.search ? data?.expense_total : data?.expense_total))}</h2>
            <h2 className='w-full text-sm text-center lg:text-base'>You have spent on or using <span className='font-semibold'>{searchParams?.status || (searchParams?.payment_mode_id && userPaymentMode?.result?.payment_mode_name) || searchParams?.category || 'All Expenses'}</span> from <span className='font-semibold'>{data?.count}</span> expenses. </h2>
          </div>
        </div>
        <Search/>
      <ExpenseList data={data}/>    
      </div>
    </div>
  )
}

export default ExpensesList;