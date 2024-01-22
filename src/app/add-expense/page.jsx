import AddExpenseForm from '@/components/add-expense/AddExpenseForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Expenditcher | Add New Expense',
  description: 'Add New Expense',
};


const getUserPaymentModes = async () => {
  try {
    const request = await fetch(
      `${process.env.NEXTAUTH_URL}/api/paymentmodes`,
      {
        method: 'GET',
        cache: 'no-store',
        redirect: 'follow',
        headers: {
          Cookie: cookies(),
        },
      }
    );
    if (request.ok) {
      const resp = await request.json();
      return resp;
    } else {
      throw new Error(request.error);
    }
  } catch (error) {
    console.log(error);
  }
};

const AddExpense = async () => {
  const session = await getServerSession(authOptions);
  if(!session) {
    return <p>Oops .. Something went wrong!</p>
  }
  const {user: {_id}} = session;
  const { all_payment_modes, results } = await getUserPaymentModes();
  return (
    <div className='bg-white w-full min-h-[100dvh] flex justify-center items-start mt-14'>
           <div className='w-full h-full p-4 border shadow-xl rounded-2xl lg:w-3/4'>
            <h2 className='w-full mb-4 text-2xl text-center uppercase text-slate-700'>add new expense</h2>
           <AddExpenseForm all_payment_modes={all_payment_modes} owner_id={_id}/>
           </div>
    </div>
  );
}

export default AddExpense