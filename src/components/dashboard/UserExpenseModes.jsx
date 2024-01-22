import PaymentModeCard from './PaymentModeCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserPaymentModes } from '@/lib/apiRequests';



const UserExpenseModes = async ({ owner_id }) => {
 const session = await getServerSession(authOptions)
 if(!session) {
  return <p>Oops...Something went wrong!</p>
 }
 const {user: {_id}} = session;
 const { all_payment_modes , results } = await getUserPaymentModes();
  return (
    <div className='w-full h-auto p-2 border shadow-lg rounded-xl'>
      <h2 className='w-full mb-4 text-xl font-semibold text-center underline uppercase text-slate-600 underline-offset-4'>
        Your Payment Modes - {results}
      </h2>
      <div className='grid w-full h-auto grid-cols-1 gap-4 lg:grid-cols-3'>
        {all_payment_modes.map((payment_mode, index) => (
          <PaymentModeCard
            payment_mode_name={payment_mode.payment_mode_name}
            payment_mode_id = {payment_mode._id}
            key={payment_mode._id}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default UserExpenseModes;
