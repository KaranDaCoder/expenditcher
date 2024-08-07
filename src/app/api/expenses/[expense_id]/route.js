import { auth } from '@/auth';
import { connectDb } from '@/lib/dbConnect';
import { NextResponseWrapper } from '@/lib/NextWrapperResponsesWrapper';
import Expense from '@/models/Expense.model';

export const GET = async (request, { params }) => {
  const { expense_id } = params;
  const session = await auth();
  if (!session)
    return NextResponseWrapper(
      { error: `You are Not Authorized to Add Expense` },
      405
    );
  try {
    await connectDb();
    const expenseDetail = await Expense.findById(expense_id).populate(
      'payment_mode_id'
    );
    return NextResponseWrapper({ result: expenseDetail, count: 1 }, 200);
  } catch (error) {
    console.log(error);
    return NextResponseWrapper({ result: error }, 500);
  }
};

export const DELETE = async (request, { params }) => {
  const { expense_id } = params;
  const session = await auth();
  if (!session)
    return NextResponseWrapper(
      { error: `You are Not Authorized to Add Expense` },
      405
    );
  try {
    await connectDb();
    if (!expense_id)
      return NextResponseWrapper(
        { error: 'Expense does not exist or has been deleted' },
        404
      );
    await Expense.findByIdAndDelete(expense_id);
    return NextResponseWrapper(
      { success: 'Payment deleted successfully' },
      201
    );
  } catch (error) {
    console.log(error);
    return NextResponseWrapper({ error: 'Something went wrong' }, 500);
  }
};

export const PATCH = async (request, { params }) => {
  const { expense_id } = params;
  const {
    category,
    name,
    amount,
    payment_mode_id,
    date,
    status,
    state,
    desc,
    owner_id,
  } = await request.json();
  const session = await auth();
  if (!session)
    return NextResponseWrapper(
      { error: `You are Not Authorized to Add Expense` },
      405
    );
  try {
    await connectDb();
    if (!expense_id)
      return NextResponseWrapper(
        { error: 'Expense does not exist or has been deleted' },
        404
      );
    const updateExpense = {
      category,
      name,
      amount,
      payment_mode_id,
      date,
      status,
      state,
      desc,
      owner_id: session?.user?._id
    };
    const update_expense = await Expense.findByIdAndUpdate(
      expense_id,
      updateExpense,
      { new: true }
    );
    return NextResponseWrapper(
      { success: `Expense ${name} was updated successfully` },
      201
    );
  } catch (error) {
    console.log(error);
    return NextResponseWrapper({ error: `Something went wrong` }, 500);
  }
};
