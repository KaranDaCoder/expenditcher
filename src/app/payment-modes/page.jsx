import { auth } from '@/auth'
import AddPaymentForm from '@/components/AddPaymentForm'
import BreadCrumb from '@/components/BreadCrumb'
import EditDeleteBtn from '@/components/client/EditDeleteBtn'
import { getUserPaymentModes } from '@/lib/apiRequests'
import moment from 'moment'
import { redirect } from 'next/navigation'

const PaymentModes = async () => {
  const session = await auth();
  if (!session) redirect('/');

  const data = await getUserPaymentModes();
  console.log(data);
  return (
    <main className='flex flex-col w-full h-full gap-4'>
      <div className='w-full h-8'>
      <BreadCrumb link={'Dashboard'} activeLink={'Payment Modes'} />
      </div>
      <div className='w-full mt-2'>
        <h1 className='text-xl font-semibold tracking-wider text-center uppercase lg:text-3xl'>Manage Payment Modes</h1>
      </div>
      <div className='flex justify-center w-full mt-2 min-h-96'>
        <div className='w-full min-h-full bg-white border shadow-lg lg:w-1/2 rounded-xl'>
          <h2 className='py-2 mb-4 text-xl text-center capitalize border-b'>add a new payment</h2>
          <AddPaymentForm owner_id={session?.user?._id} />
        </div>
      </div>
      <h2 className='text-xl font-semibold tracking-wider text-center uppercase lg:text-2xl'>Your Payment Modes ({data?.count})</h2>
      <div className='w-full py-2 mb-1 overflow-x-auto min-h-56'>
        
        <div className='relative flex items-center w-full h-full gap-4'>
          {data?.result?.map((p,index) => (
              <div className='relative flex-none w-full h-full overflow-hidden bg-white border lg:w-1/3 rounded-2xl' key={p._id}>
              <div className='flex items-center justify-between w-full gap-2 p-2'>
                <h2 className='px-2 text-3xl font-semibold rounded-md text-slate-50 w-fit bg-slate-600'>{index + 1}.</h2>
                <h2 className='w-full text-xl font-light text-center lg:text-2xl'>{p.payment_mode_name}</h2>
              </div>
              <div className='relative flex flex-col items-center justify-center w-full gap-3'>
                <h2 className='w-full text-sm font-light text-center lg:text-lg'>{p.payment_mode_type}</h2>
                <h2 className='text-sm italic font-light text-center'>Added on: {moment(p.createdAt).format('MMM Do YYYY')}</h2>
                {p.payment_mode_type !== 'Cash' && <EditDeleteBtn payment_mode_id={p._id}/>}
              </div>
            </div>       
          ))}
         
        </div>
      </div>
    </main>
  )
}

export default PaymentModes