import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserInfo from '@/components/manage/UserInfo';
import AddPaymentMode from '@/components/manage/AddPaymentMode';
import PaymentModeCard from '@/components/manage/PaymentModeCard';
import { fetchLoggedInUserDetails , getUserPaymentModes } from '@/lib/apiRequests';
import { Suspense } from 'react';

export const metadata = {
  title: 'Expenditcher | Manage',
  description: 'Login to Expenditcher',
};


const ManageUser = async () => {
  const {
    user: { _id, username },
  } = await getServerSession(authOptions);

  const data = await fetchLoggedInUserDetails(_id);
  const { all_payment_modes, results } = await getUserPaymentModes();

  return (
    <div className='flex flex-col w-full h-full gap-4 mt-10'>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <Suspense fallback={<p>Rendering Loading UI....</p>}>
        <UserInfo data={data} />
        </Suspense>
        <AddPaymentMode owner_id={_id} />
      </div>

      <div className='w-full h-auto border shadow-lg rounded-xl lg:px-4'>
        <h2 className='w-full text-xl text-center underline uppercase text-slate-600 underline-offset-4'>
          Your Payment Modes ({results})
        </h2>
        <div className='grid w-full grid-cols-1 gap-4 px-2 py-2 h-5/6 lg:grid-cols-3'>
          {all_payment_modes?.map(payment_mode => (
            <PaymentModeCard payment_mode={payment_mode} key={payment_mode._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
