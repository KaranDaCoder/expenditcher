import Link from 'next/link';
import { getUserExpensesByPaymentModeId } from '@/lib/apiRequests';


const PaymentModeCard = async ({
  payment_mode_name,
  index,
  payment_mode_id,
}) => {
     const { format } = new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD',
     });
  const { expense_total } = await getUserExpensesByPaymentModeId(
    payment_mode_id
  );
  return (
    <div className='flex w-full h-48 p-2 border shadow-md rounded-2xl lg:h-56 bg-gradient-to-br from-slate-950/80 via-slate-800 to bg-slate-900/80'>
      <div className='relative z-10 w-1/4 h-full overflow-hidden shadow-md rounded-xl'>
        <h1 className='absolute font-extrabold text-slate-600 text-9xl'>
          {index}
        </h1>
      </div>
      <div className='flex flex-col flex-wrap justify-around w-4/5 h-full text-slate-50'>
        <h1 className='w-full text-2xl font-light text-center'>
          {payment_mode_name}
        </h1>
        <h2 className='w-full text-2xl font-light text-center'>
          {format(expense_total)}
        </h2>
        <Link
          href={`/expenses?payment_mode=${payment_mode_id}`}
          className='w-3/4 px-4 py-2 text-center transition-all duration-300 rounded-md hover:tracking-widest ring-1 ring-slate-600 hover:bg-slate-900/80'
        >
          VIEW MORE
        </Link>
      </div>
    </div>
  );
};

export default PaymentModeCard