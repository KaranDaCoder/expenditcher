import { auth } from '@/auth';
import AddNewExpense from '@/components/AddNewExpense';
import BreadCrumb from '@/components/BreadCrumb'
import { getUserPaymentModes } from '@/lib/apiRequests';
import { redirect } from 'next/navigation';


const ExpensePage = async () => {
  const session = await auth();
  if(!session) redirect('/')

  const paymentModes = await getUserPaymentModes(session?.user?._id);
  console.log(paymentModes)
 
  return (
    <div className='flex flex-col w-full h-full gap-4'>
    <div className='w-full h-8'>
    <BreadCrumb link={'Dashboard'} activeLink={'Add New Expense'} />
    </div>
    <h2 className='inline-flex items-center justify-center w-full mt-10 mb-2 text-2xl uppercase'>
     Add New Expense
    </h2>
      <AddNewExpense owner_id={session?.user?._id} data={paymentModes}/>
    </div>
  )
}

export default ExpensePage