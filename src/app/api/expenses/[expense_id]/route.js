import { auth } from "@/auth"
import { connectDb } from "@/lib/dbConnect";
import { NextResponseWrapper } from "@/lib/NextWrapperResponsesWrapper";
import Expense from "@/models/Expense.model";

export const GET = async(request, {params}) => {
 const {expense_id} = params;
 const session = await auth();
 if(!session)  return NextResponseWrapper(
   { error: `You are Not Authorized to Add Expense` },
   405
 );
 try {
  await connectDb();
  const expenseDetail = await Expense.findById(expense_id).populate('payment_mode_id');
  
  return NextResponseWrapper({result : expenseDetail, count: 1} , 200)
  
 } catch (error) {
  console.log(error)
  return NextResponseWrapper({result : error} , 500)
 }
}