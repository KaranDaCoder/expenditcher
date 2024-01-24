'use client';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const PaymentModeCard = ({ payment_mode }) => {
  const router = useRouter();
  const handlePaymentDelete = async () => {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/paymentmodes/${payment_mode._id}`,
        { method: 'DELETE', cache: 'no-store' }
      );
      if (request.ok) {
        const resp = await request.json();
        toast.success(`Expense has been deleted!`, {
          style: {
            border: '1px solid #713200',
            padding: '10px',
            background: 'green',
            borderRadius: '10px',
            color: 'white',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'green',
          },
          duration: 1000,
        });
        router.refresh();
        return resp;
      } else {
        console.log(request.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center w-full gap-2 border rounded-lg shadow-sm h-44'>
      <label
        htmlFor='payment_mode_name'
        className='text-base font-bold text-slate-600'
      >
        Name :{' '}
        <span className='text-base font-semibold'>
          {payment_mode.payment_mode_name}
        </span>
      </label>
      <label
        htmlFor='payment_mode_name'
        className='text-base font-bold text-slate-600'
      >
        Type :{' '}
        <span className='text-base font-semibold'>
          {payment_mode.payment_mode_type}
        </span>
      </label>
      <label
        htmlFor='payment_mode_name'
        className='text-base font-bold text-slate-600'
      >
        Added On :{' '}
        <span className='text-base font-semibold'>
          {moment(payment_mode.createdAt).format('MMMM Do YYYY')}
        </span>
      </label>

      {payment_mode.payment_mode_name !== 'Cash' && (
        <div className='flex items-center justify-around w-full'>
          <button className='w-1/3 px-4 py-1 tracking-wider text-white transition-all duration-200 bg-green-700 rounded-lg hover:tracking-widest'>
            Edit
          </button>
          <button
            className='w-1/3 px-4 py-1 tracking-wider text-white transition-all duration-200 bg-red-900 rounded-lg hover:tracking-widest'
            onClick={handlePaymentDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentModeCard;
