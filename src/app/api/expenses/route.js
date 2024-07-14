import { auth } from '@/auth';
import { NextResponseWrapper } from '@/lib/NextWrapperResponsesWrapper';
import { connectDb } from '@/lib/dbConnect';
import Expense from '@/models/Expense.model';
import PaymentMode from '@/models/PaymentMode.model';
import User from '@/models/User.model';

export const GET = async (request, response) => {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const payment_mode_id = url.searchParams.get('payment_mode_id');
  const category = url.searchParams.get('category');
  console.log(status, payment_mode_id, category);
  let all_expenses = null;
  let expense_total = null;
  let total;
  const session = await auth();
  console.log(session?.user?._id);
  if (!session)
    return NextResponseWrapper(
      { error: `You are Not Authorized to Add Expense` },
      405
    );
  try {
    await connectDb();
    const userExist = await User.findById(session?.user?._id);
    if (!userExist)
      return NextResponseWrapper(
        { error: `Not Allowed - (member does not exist)` },
        405
      );

    if (!payment_mode_id && !status && !category) {
      console.log(`ALL EXPENSES!`);
      all_expenses = await Expense.find({
        owner_id: session?.user?._id.toString(),
      })
        .populate('owner_id')
        .populate('payment_mode_id')
        .sort({ date: -1 });

      //Status
    } else if (!payment_mode_id && !category) {
      all_expenses = await Expense.find({
        owner_id: session?.user?._id.toString(),
      })
        .and({ status: status })
        .populate('owner_id')
        .populate('payment_mode_id')
        .sort({ date: -1 });
      //Category
    } else if (!payment_mode_id && !status) {
      all_expenses = await Expense.find({
        owner_id: session?.user?._id.toString(),
      })
        .and({ category: category })
        .populate('owner_id')
        .populate('payment_mode_id')
        .sort({ date: -1 });
      // Payment Mode ID
    } else {
      all_expenses = await Expense.find({
        owner_id: session?.user?._id.toString(),
      })
        .and({ payment_mode_id: payment_mode_id.toString() })
        .populate('owner_id')
        .populate('payment_mode_id')
        .sort({ date: -1 });
    }
    expense_total =
      all_expenses.reduce(function (prev, curr) {
        // if (curr.status !== 'canceled') {
        //   total = parseFloat(prev) + parseFloat(curr.amount);
        // }
        // return total;
        return parseFloat(prev) + parseFloat(curr.amount);
      }, parseFloat(0.0));

    return NextResponseWrapper(
      {
        result: all_expenses,
        expense_total,
        count: all_expenses.length,
      },
      200
    );
  } catch (error) {
    console.log(error);
    return NextResponseWrapper({ error: error }, 500);
  }
};

export const POST = async (request, response) => {
  const {
    category,
    name,
    amount,
    payment_mode_id,
    date,
    status,
    state,
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
    if (!owner_id || !amount || !name)
      return NextResponseWrapper(
        { error: `Not enough information to create expense` },
        400
      );

    const userExist = await User.findById(owner_id);
    if (!userExist)
      return NextResponseWrapper(
        { error: `Not Allowed - (member does not exist)` },
        405
      );
    const getUserPaymentModes = await PaymentMode.find({ owner_id });
    const isPaymentModeAssociatedWithUser = getUserPaymentModes.filter(
      (mode) => mode._id.toString() === payment_mode_id.toString()
    );
    if (isPaymentModeAssociatedWithUser.length !== 1)
      return NextResponseWrapper(
        {
          error: `Not Authorized to create expense - (member does not have provided payment-mode exist)`,
        },
        405
      );
    const create_expense = await Expense.create({
      category,
      name,
      amount,
      payment_mode_id,
      date,
      status,
      state,
      owner_id,
    });
    await create_expense.save();
    return NextResponseWrapper({ success: `${name} added successfully` }, 201);
  } catch (error) {
    console.log(error);
    return NextResponseWrapper({ error: error }, 500);
  }
};
