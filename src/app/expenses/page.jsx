import ExpenseList from '@/components/expenses/ExpenseList';
import ExpenseSummary from '@/components/expenses/ExpenseSummary';
import SearchFilterSort from '@/components/expenses/SearchFilterSort';
import {
  getUserExpensesByPaymentModeId,
  getSinglePaymentMode,
} from '@/lib/apiRequests';

export const metadata = {
  title: 'Expenditcher | Expenses',
  description: 'Login to Expenditcher',
};


const ExpensesPage = async({searchParams}) => {
   const { all_expenses , expense_total , results} = await getUserExpensesByPaymentModeId(
     searchParams?.payment_mode,
     searchParams?.search
   );
   let paymentModeDetails; 
   if (searchParams?.payment_mode !== 'all') {
      paymentModeDetails = await getSinglePaymentMode(
        searchParams?.payment_mode
      );
    }
  return (
    <div className='w-full min-h-[100dvh] flex flex-col gap-2 space-y-4'>
      <ExpenseSummary
        payment_mode_name={paymentModeDetails?.payment_mode_name || 'All'}
        expense_total={expense_total}
        results={results}
        createdAt={paymentModeDetails?.createdAt || 'Not Available'}
      />
      <SearchFilterSort />
      <ExpenseList all_expenses ={all_expenses}/>
    </div>
  );
}

export default ExpensesPage