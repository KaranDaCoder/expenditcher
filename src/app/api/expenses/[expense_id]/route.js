import { connectDb } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import Expense from '@/models/Expense';

export const GET = async (request, { params }) => {
  await connectDb();
  try {
    return new NextResponse(JSON.stringify('success'), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify('Soemthing went wrong!'), {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  await connectDb();
  const { expense_id } = params;
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: `Unauthorized to Delete the Expense!` }),
        { status: 401 }
      );
    }
    const {
      user: { _id },
    } = session;
    const userOwnsExpense = await Expense.findOne({
      owner_id: _id,
      expense_id,
    });
    if (!userOwnsExpense) {
      return new NextResponse(
        JSON.stringify({ error: `User Not authorized to Delete this Expense` }),
        { status: 401 }
      );
    }
    await Expense.findByIdAndDelete(expense_id);
    return new NextResponse(
      JSON.stringify({ message: 'Successfully Deleted the Expense!' }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
