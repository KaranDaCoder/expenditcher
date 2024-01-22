'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { categories_array } from '@/lib/categoryList';
import Link from 'next/link';

const AddExpenseForm = ({ all_payment_modes , owner_id }) => {
  const [expenseDate, setExpenseDate] = useState(new Date());
  const router = useRouter();
  const [expenseObject, setExpenseObject] = useState({
    name: null,
    category: 'Other',
    amount: null,
    date: expenseDate,
    state: null,
    payment_mode: all_payment_modes[0]._id || null,
    status: 'Completed',
    desc: null,
    owner_id
  });

  
  const handleFormSubmission = async (e) => {
      e.preventDefault();
      setExpenseObject(prev => ({
        ...prev,
        [e.target.name] : e.target.value
      }))
  }

  const handleCreateExpense = async(e) => {
    e.preventDefault();
    const createExpenseObject = {
      ...expenseObject,
      date : expenseDate
    }
    const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses` , {method: 'POST' , cache: 'no-store' , body: JSON.stringify(createExpenseObject)});
    if(request.ok) {

      const resp = await request.json();
       alert(`Expense Added Successfully!`);
      router.refresh();
    }
    console.log(`Create New Expense With`, JSON.stringify(createExpenseObject));
  }

  return (
    <form
      className='flex flex-col w-full h-full'
      onSubmit={handleCreateExpense}
    >
      <div className='flex flex-col items-center w-full h-full gap-3 lg:space-y-2'>
        <div className='flex flex-col items-center justify-center w-full'>
          <p className='w-full text-base capitalize text-start lg:w-5/6 text-slate-600'>
            Expense Name:
          </p>
          <input
            type='search'
            name='name'
            id='name'
            className='w-full px-2 py-1 text-base border rounded-md outline-none lg:w-5/6'
            minLength='5'
            maxLength='60'
            required
            onChange={handleFormSubmission}
          />
        </div>
        <div className='flex flex-col items-center justify-center w-full'>
          <p className='w-full capitalize lg:w-5/6 text-start text-slate-600'>
            category:
          </p>
          <select
            name='category'
            id='category'
            className='w-full py-1 text-base font-semibold text-center border rounded-md outline-none cursor-pointer lg:w-5/6 text-slate-600'
            value={expenseObject.category}
            onChange={handleFormSubmission}
          >
            {categories_array.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col items-center justify-center w-full'>
          <p className='w-full text-base capitalize text-start lg:w-5/6 text-slate-600'>
            Payment Mode:
          </p>
          <select
            name='payment_mode'
            id='payment_mode'
            className='relative w-full py-1 text-base font-semibold text-center border rounded-md outline-none lg:w-5/6 text-slate-600'
            onChange={handleFormSubmission}
          >
            {all_payment_modes?.map((mode) => (
              <option value={mode._id} key={mode._id}>
                {mode.payment_mode_name}
              </option>
            ))}
          </select>
          <Link
            href={'/manage'}
            className='mt-1 mb-2 text-xs font-semibold underline text-end w-fit text-slate-800 hover:text-fuchsia-900'
          >
            Manage Payment Options.
          </Link>
        </div>

        <div className='flex flex-col flex-wrap justify-between w-full h-auto gap-4 mb-4 lg:mb-0 lg:flex-row lg:w-5/6'>
          <input
            type='number'
            name='amount'
            id='amount'
            placeholder='Amount'
            className='px-2 py-1 text-base border rounded-md outline-none'
            inputMode='decimal'
            pattern='[0-9]*'
            min={0.01}
            max={9999999}
            step='any'
            required={true}
            onChange={handleFormSubmission}
          />
          <DatePicker
            className='w-auto text-base tracking-wider text-center border rounded-lg focus:outline-none text-slate-600'
            showIcon
            selected={expenseDate}
            onChange={(date) => setExpenseDate(date)}
          />
          <input
            type='text'
            name='state'
            id='state'
            maxLength={2}
            placeholder='State'
            className='px-1 py-1 text-base uppercase border rounded-md outline-none placeholder:capitalize'
            onChange={handleFormSubmission}
          />
          <select
            name='status'
            id='status'
            className='px-2 py-1 text-base text-center border rounded-md outline-none'
            onChange={handleFormSubmission}
          >
            <option value='Completed' defaultValue={true}>
              Completed
            </option>
            <option value='Pending'>Pending</option>
            <option value='Canceled'>Canceled</option>
          </select>
        </div>
        <textarea
          name='desc'
          id='desc'
          cols='10'
          rows='5'
          placeholder='description'
          className='w-full px-2 capitalize border rounded-lg outline-none lg:w-5/6'
          onChange={handleFormSubmission}
        />
        <div className='flex items-center justify-around w-full mt-4 lg:mt-0'>
          <button
            type='reset'
            className='px-6 py-1 text-base font-light text-white uppercase bg-red-600 rounded-md shadow-sm lg:py-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
          >
            Cancel
          </button>
          <button
            className='px-6 py-1 text-base font-light text-white uppercase bg-green-800 rounded-md shadow-sm lg:py-2 tracking-widere hover:bg-green-700 focus:outline-none'
            type='submit'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
