import { connectDb } from '@/lib/dbConnect';
import Expense from '@/models/Expense';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import PaymentMode from '@/models/PaymentMode';

export const GET = async (request, { params }) => {
  await connectDb();
  const session = await getServerSession(authOptions);
  const url = new URL(request.url);
  const payment_mode = url.searchParams?.get('payment_mode');
  console.log(`paymentMode : `, payment_mode);
  let all_expenses;
  try {
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Not Authorized to View Expenese' }),
        { status: 401 }
      );
    }
    const {
      user: { _id },
    } = session;
    if (!payment_mode || payment_mode === 'all') {
      all_expenses = await Expense.find({ owner_id: _id.toString() })
        .populate('payment_mode')
        .sort({ date: -1 });
    } else {
      all_expenses = await Expense.find({ payment_mode: payment_mode, owner_id:_id.toString() })
        .populate('payment_mode')
        .sort({ date: -1 });
    }
    let expense_total = all_expenses.reduce(function (prev, curr) {
      return parseFloat(prev) + parseFloat(curr.amount);
    }, parseFloat(0.0));
    return NextResponse.json(
      { all_expenses, expense_total, results: all_expenses.length },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify('Soemthing went wrong!'), {
      status: 500,
    });
  }
};

export const POST = async (request, { params }) => {
  await connectDb();
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Not Authorized to POST Expenese' }),
        { status: 401 }
      );
    }
    const {
      user: { _id },
    } = session;
    const {
      name,
      date,
      state,
      payment_mode,
      status,
      desc,
      amount,
      category,
      owner_id,
    } = await request.json();

    if (!owner_id || owner_id !== _id) {
      return new NextResponse(
        JSON.stringify({ error: 'Not Authorized to POST Expenese' }),
        { status: 401 }
      );
    }

    const isPaymentModeExist = await PaymentMode.findById(payment_mode);
    if(isPaymentModeExist?.owner_id.toString() !== _id.toString()) {
      return new NextResponse(JSON.stringify({error : `Payment Mode Not Found, try again after adding payment mode`}), {status : 401})
    }
    const create_new_expenses = await Expense.create({
      name,
      date,
      state,
      payment_mode,
      status,
      desc,
      amount,
      category,
      owner_id,
    });
    await create_new_expenses.save();
    return new NextResponse(JSON.stringify(create_new_expenses), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: 'Soemthing went wrong!' }),
      { status: 500 }
    );
  }
};
