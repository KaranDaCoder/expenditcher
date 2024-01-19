import { connectDb } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import PaymentMode from '@/models/PaymentMode';

export const GET = async (request, { params }) => {
  await connectDb();
  const {
    user: { _id },
  } = await getServerSession(authOptions);
  try {
    if (!_id || _id === null) {
      return new NextResponse(
        JSON.stringify({ error: `Not authorized to View payment modes` }),
        { status: 401 }
      );
    }
    const all_payment_modes = await PaymentMode.find({ owner_id: _id }).sort({
      createdAt: -1,
    });
    return new NextResponse(
      JSON.stringify({ all_payment_modes, results: all_payment_modes.length }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: `something went wrong` }), {
      status: 500,
    });
  }
};

export const POST = async (request, { params }) => {
  const { payment_mode_name, payment_mode_type } = await request.json();
  await connectDb();
  const {
    user: { _id },
  } = await getServerSession(authOptions);
  try {
    if (!_id) {
      return new NextResponse(
        JSON.stringify({ error: `Not authorized to add a payment` }),
        { status: 401 }
      );
    }
    const paymentExist = await PaymentMode.findOne({ payment_mode_name }).and({
      owner_id: _id,
    });
    if (paymentExist) {
      return new NextResponse(
        JSON.stringify({
          error: `${payment_mode_name} already exists in you payment modes`,
        }),
        { status: 403 }
      );
    }

    const create_payment = await PaymentMode.create({
      payment_mode_name,
      payment_mode_type,
      owner_id: _id,
    });
    return new NextResponse(
      JSON.stringify(
        `Success! ${create_payment.payment_mode_name} created successfully!`
      ),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: `something went wrong` }), {
      status: 500,
    });
  }
};
