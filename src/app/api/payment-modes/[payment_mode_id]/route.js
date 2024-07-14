import { auth } from "@/auth";
import { NextResponseWrapper } from "@/lib/NextWrapperResponsesWrapper";
import { connectDb } from "@/lib/dbConnect";
import PaymentMode from "@/models/PaymentMode.model";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const { payment_mode_id } = params;
  const session = await auth();
  if (!session)
    return NextResponse.json(
      { error: `You are Not Authorized to View Payment Modes` },
      { status: 405 }
    );
  try {
    await connectDb();
     const isPaymentFetched = await PaymentMode.findById(payment_mode_id);
     if (!isPaymentFetched)
       return new NextResponse(
         JSON.stringify({
           error: 'payment method not found or has been deleted already',
         }),
         { status: 404 }
       );

     await PaymentMode.findByIdAndDelete(payment_mode_id);

     return new NextResponse(
       JSON.stringify({
         message: 'sucess, payment account deleted successfully!',
       }),
       { status: 202 }
     );
  } catch (error) {
   console.log(error);
   return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
  }
};

export const PATCH = async(request, {params}) => {
 const {payment_mode_id} = params;
 const {payment_mode_name, payment_mode_type} = await request.json();
  const session = await auth();
  if (!session)
    return NextResponse.json(
      { error: `You are Not Authorized to View Payment Modes` },
      { status: 405 }
    );
 try {
  await connectDb();
  const paymentModeExist = await PaymentMode.findById(payment_mode_id);
  if(!paymentModeExist) return NextResponseWrapper({error : `payment mode does not exist!`}, 404);
  const update_payment_mode = await PaymentMode.findOneAndUpdate(
    {_id : payment_mode_id.toString()},
    { payment_mode_name, payment_mode_type, owner_id: session?.user._id },
    { new: true }
  );
  console.log(update_payment_mode)
  return NextResponseWrapper({success : `${payment_mode_name} updated successfully`}, 201)
  
 } catch (error) {
  console.log(error)
  return NextResponse({success : `Something went wrong`}, 500)
  
 }
}

export const GET = async (request, {params}) => {
  const {payment_mode_id} = params;
  const session = await auth();
  if (!session)
    return NextResponse.json(
      { error: `You are Not Authorized to View Payment Mode` },
      { status: 405 }
    );
  try {
    const payment_mode = await PaymentMode.findById(payment_mode_id);

    return NextResponseWrapper({result : payment_mode , count: 1}, 200)
  } catch (error) {
    console.log(error)
    return NextResponseWrapper({error : error}, 500)
    
  }
}




