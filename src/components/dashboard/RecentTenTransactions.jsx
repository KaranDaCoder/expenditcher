import { getUserExpensesByPaymentModeId } from '@/lib/apiRequests';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

const RecentTenTransactions = async () => {
  const { format } = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const { all_expenses } = await getUserExpensesByPaymentModeId('all');

  return (
    <div className='w-full h-auto p-2 border shadow-xl rounded-xl'>
      <h2 className='w-full mb-4 text-xl font-semibold text-center underline uppercase text-slate-600 underline-offset-4'>
        Your Recent Transactions
      </h2>
      <table className='w-full h-full table-auto'>
        <thead className='w-full h-auto'>
          <tr className='flex items-center w-full h-auto py-1 text-white border-t justify-evenly bg-slate-600 rounded-t-xl'>
            <th className='w-full font-light tracking-wider text-center'>
              Date
            </th>
            <th className='w-full font-light tracking-wider text-center'>
              Name
            </th>
            <th className='w-full font-light tracking-wider text-center'>
              Amount
            </th>
            <th className='hidden w-full font-light tracking-wider text-center lg:block'>
              Payment Mode
            </th>
          </tr>
        </thead>
        <tbody className='flex flex-col w-full h-auto border rounded-b-xl'>
          {all_expenses.length > 0 ? (
            all_expenses?.splice(0, 10).map((expense) => (
              <tr
                className='flex items-start w-full h-auto border-b rounded-b-xl justify-evenly'
                key={expense._id}
              >
                <td className='w-full text-center'>
                  {moment(expense.date).format('MMM-DD-YYYY')}
                </td>
                <td className='w-full text-center'>{expense.name}</td>
                <td className='w-full tracking-wider text-center'>
                  {format(expense.amount)}
                </td>
                <td className='hidden w-full text-center lg:block'>
                  {expense.payment_mode.payment_mode_name}
                </td>
              </tr>
            ))
          ) : (
            <tr className='flex items-start w-full h-auto border-b rounded-b-xl justify-evenly'>
              <td className='p-2 py-2 text-lg font-semibold text-slate-600'>
                <span>There are no Expenses Found... <Link href={"/add-expense"} className='text-base tracking-wider font-base text-fuchsia-600'>add new expenses</Link></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTenTransactions;
