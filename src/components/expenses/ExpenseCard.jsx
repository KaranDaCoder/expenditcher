'use client';
import React, { useState } from 'react';
import moment from 'moment';
import { ArrowIconDown, ArrowIconUp, DeleteIcon } from '../AllSvgs';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const { format } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const ExpenseCard = ({
  name,
  date,
  status,
  state,
  desc,
  amount,
  category,
  payment_mode_name,
  expense_id,
}) => {
  const [detailModal, setDetailModal] = useState(false);
  const router = useRouter();

  const handleDeleteExpense = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/${expense_id}`,
        { method: 'DELETE', cache: 'no-store' }
      );
      if (request.ok) {
         toast.success(`Expense Deleted!`, {
           style: {
             border: '1px solid #713200',
             padding: '10px',
             background: 'green',
             borderRadius: '10px',
             color: 'white',
           },
           iconTheme: {
             primary: 'white',
             secondary: 'green',
           },
           duration: 1000,
         });
        router.refresh();
        const resp = await request.json();
        return resp;
      } else {
        throw new Error(request.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col items-start justify-start w-full h-auto transition-all duration-300 bg-white border rounded-lg shadow-md select-none hover:scale-105'>
      <div
        className='flex items-start w-full h-auto p-2 cursor-pointer justify-evenly '
        onClick={() => setDetailModal(!detailModal)}
      >
        <div className='flex flex-col items-start justify-start w-1/2 h-full gap-1 lg:w-1/2'>
          <h2 className='text-xs md:text-sm lg:text-base'>
            {moment(date).format('MMM-DD-YYYY')}
          </h2>
          <p className='text-xs font-semibold md:text-sm text-slate-600'>
            {state}
          </p>
        </div>

        <div className='flex flex-col items-start justify-start w-1/2 h-full lg:w-1/2 lg:text-base'>
          <h2 className='text-sm font-light tracking-wider lg:text-xl text-slate-800/90'>
            {name}
          </h2>
          <p className='text-xs italic font-light md:text-sm text-slate-600'>
            {category}
          </p>
        </div>
        <div className='flex-col hidden w-auto h-full lg:w-1/2 lg:flex'>
          <h2 className='text-sm md:text-base text-fuchsia-800'>
            {payment_mode_name}
          </h2>
          <p
            className={`text-sm md:text-base ${
              status === 'Completed' ? 'text-green-800' : 'text-slate-600'
            }`}
          >
            {status}
          </p>
        </div>
        <div className='flex flex-col items-center justify-center w-1/2 h-full gap-1 lg:w-1/2'>
          <h2 className='pt-1 text-xs font-light tracking-wider text-green-700 md:text-sm lg:text-xl'>
            {format(amount)}
          </h2>
          {!detailModal ? <ArrowIconDown /> : <ArrowIconUp />}
        </div>
      </div>
      {detailModal && (
        <div className='w-full h-auto border-t lg:py-5 bg-slate-300/20'>
          <div className='flex flex-col items-start justify-center w-full h-full p-2'>
            <p className='text-sm font-bold text-slate-900'>
              Description :{' '}
              <span className='text-sm font-semibold text-slate-600'>
                {desc
                  ? desc
                  : 'No description provided. You can still edit this transaction.'}
              </span>
            </p>
            <p className='text-sm font-bold text-slate-900'>
              Payment Account :{' '}
              <span className='text-sm font-semibold text-slate-600'>
                {payment_mode_name}
              </span>
            </p>
            <div className='flex items-end justify-end w-full'>
              <p className='cursor-pointer w-fit' onClick={handleDeleteExpense}>
                <DeleteIcon />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;
