import React from 'react';

const { format } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const ExpenseSummary = ({
  payment_mode_name,
  expense_total,
  results,
  createdAt,
}) => {
  return (
    <div className='flex flex-col w-full h-auto gap-2 p-2 mt-5 border shadow-md rounded-2xl'>
      <h2 className='w-full text-2xl font-semibold tracking-widest text-center uppercase text-slate-600'>
        Summary
      </h2>
      <h2 className='text-lg font-semibold text-slate-800'>
        Name :{' '}
        <span className='text-lg font-semibold text-slate-600'>
          {payment_mode_name}
        </span>
      </h2>
      <h2 className='text-lg font-semibold text-slate-800'>
        Total Expenses :{' '}
        <span className='text-lg font-semibold text-slate-600'>
          {results}
        </span>
      </h2>
      <h2 className='text-lg font-semibold text-slate-800'>
        Total Of Expenses :{' '}
        <span className='text-lg font-semibold tracking-widest text-slate-600'>
          {format(expense_total)}
        </span>
      </h2>
    </div>
  );
};

export default ExpenseSummary;
