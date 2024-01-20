import { connectDb } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PaymentMode from '@/models/PaymentMode';
import { NextResponse } from 'next/server';

export const DELETE = async (request, { params }) => {
  await connectDb();
  const { payment_mode_id } = params;
  const {
    user: { _id },
  } = await getServerSession(authOptions);

  if (!_id || _id === null) {
    return new NextResponse(
      JSON.stringify({ error: `Not authorized to Delete payment modes` }),
      { status: 401 }
    );
  }
  try {
   const paymentModeExist = await PaymentMode.findOne({owner_id : _id});
   if(!paymentModeExist) {
    return new NextResponse(JSON.stringify({error : `Not Authorized ! ${payment_mode_id} does not belong to the user!`}) , {status:401})
   }
   const paymentModeToDelete = await PaymentMode.findByIdAndDelete(payment_mode_id);
   return new NextResponse(JSON.stringify(`Successfully Deleted the payment`), {status:201})
  } catch (error) {
   console.log(error)
   return new NextResponse(JSON.stringify(`Something went wrong`) , {status:500})
  }
};
