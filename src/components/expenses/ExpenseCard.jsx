'use client';
import React, { useState } from 'react';
import moment from 'moment';
import { ArrowIconDown, ArrowIconUp } from '../AllSvgs';

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
}) => {
  const [detailModal, setDetailModal] = useState(false);
  return (
    <div className='flex flex-col items-start justify-start w-full h-auto transition-all duration-300 bg-white border rounded-lg shadow-md select-none'>
      <div
        className='flex items-start w-full h-auto p-2 cursor-pointer justify-evenly'
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
                {desc}
              </span>
            </p>
            <p className='text-sm font-bold text-slate-900'>
              Payment Account :{' '}
              <span className='text-sm font-semibold text-slate-600'>
                Apple Card Ending 55344
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;
