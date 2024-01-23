import { connectDb } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PaymentMode from '@/models/PaymentMode';
import { NextResponse } from 'next/server';
import Expense from '@/models/Expense';

export const GET = async (request, { params }) => {
  await connectDb();
  const { payment_mode_id } = params;
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: `Unauthorized to view the payment mode` }),
        { status: 401 }
      );
    }
    const {
      user: { _id },
    } = session;
    const paymentModeExist = await PaymentMode.findOne({ owner_id: _id });
    if (!paymentModeExist) {
      return new NextResponse(
        JSON.stringify({
          error: `Not Authorized ! ${payment_mode_id} does not belong to the user!`,
        }),
        { status: 401 }
      );
    }
    const payment_mode = await PaymentMode.findById(payment_mode_id);
    return new NextResponse(JSON.stringify(payment_mode), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
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
    const paymentModeExist = await PaymentMode.findOne({ owner_id: _id });
    if (!paymentModeExist) {
      return new NextResponse(
        JSON.stringify({
          error: `Not Authorized ! ${payment_mode_id} does not belong to the user!`,
        }),
        { status: 401 }
      );
    }

    const expensesWithPaymentMode = await Expense.deleteMany({
      payment_mode: payment_mode_id,
    });

    const paymentModeToDelete = await PaymentMode.findByIdAndDelete(
      payment_mode_id
    );
    return new NextResponse(
      JSON.stringify(
        `Successfully Deleted the payment and associated Expenses with the Account!`
      ),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(`Something went wrong`), {
      status: 500,
    });
  }
};
