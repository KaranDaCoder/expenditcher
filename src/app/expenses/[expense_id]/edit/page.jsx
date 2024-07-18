import { auth } from '@/auth';
import BreadCrumb from '@/components/BreadCrumb'
import EditAnExpense from '@/components/EditAnExpense';
import { getExpenseDetails, getUserPaymentModes } from '@/lib/apiRequests';
import { redirect } from 'next/navigation';


const EditExpense = async ({params}) => {
 const session = await auth();
 if (!session) redirect('/')

 const paymentModes = await getUserPaymentModes(session?.user?._id);
  const expenseDetail = await getExpenseDetails(params.expense_id)

 return (
  <div className='flex flex-col w-full h-full gap-4'>
   <div className='w-full h-8'>
    <BreadCrumb link={'Dashboard'} activeLink1={`${params.expense_id} > edit`} activeLink={'expenses'} />
   </div>
   <h2 className='inline-flex items-center justify-center w-full text-xl font-semibold tracking-wider uppercase lg:text-2xl'>
    Edit Expense
   </h2>
   <EditAnExpense owner_id={session?.user?._id} data={paymentModes} exp_detail={expenseDetail} />
  </div>
 )
}

export default EditExpense