import { auth } from '@/auth';
import { NextResponseWrapper, NextWrapperValidateAuthSession } from '@/lib/NextWrapperResponsesWrapper';
import { connectDb } from '@/lib/dbConnect';
import PaymentMode from '@/models/PaymentMode.model';
import { NextResponse } from 'next/server';

export const GET = async(request, response) => {
 const session = await auth();
 if (!session)
   return NextResponse.json(
     { error: `You are Not Authorized to View Payment Modes` },
     { status: 405 }
   );

 try {
  await connectDb();
  const all_payment_modes = await PaymentMode.find({
    owner_id: session?.user?._id,
  }).populate('owner_id').sort({createdAt : -1});
  return NextResponseWrapper({ result: all_payment_modes, count: all_payment_modes.length}, 200);
 } catch (error) {
  console.log(error)
  return NextResponseWrapper({ error : error}, 500);
  
 }
}


export const POST = async (request, response) => {
 const session = await auth();
 if(!session) return NextResponse.json({error : `You are Not Authorized to Add Payment`}, {status : 405})
  const { payment_mode_name, payment_mode_type } = await request.json();
  try {
   await connectDb();
   if(!payment_mode_name || !payment_mode_type || !session?.user._id) {
    return NextResponse.json({error : `Missing details`}, {status : 400})
   }
   const create_payment = await PaymentMode.create({
    payment_mode_name,
    payment_mode_type,
    owner_id : session?.user._id
   })
   await create_payment.save();
    return NextResponse.json(
      { success: `Payment: ${payment_mode_name} Added Successfully` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
};

