'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { categories_array } from '@/lib/categoryList';
import Link from 'next/link';
import toast from 'react-hot-toast';

const AddExpenseForm = ({ all_payment_modes, owner_id }) => {
  const [expenseDate, setExpenseDate] = useState(new Date());
  const router = useRouter();
  const [expenseObject, setExpenseObject] = useState({
    name: '',
    category: 'Other',
    amount: '',
    date: expenseDate,
    state: '',
    payment_mode: all_payment_modes[0]._id,
    status: 'Completed',
    desc: '',
    owner_id,
  });

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setExpenseObject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormCancelation = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };
  const handleCreateExpense = async (e) => {
    e.preventDefault();
    const createExpenseObject = {
      ...expenseObject,
      date: expenseDate,
    };
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses`,
      {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(createExpenseObject),
      }
    );
    if (request.ok) {
      const resp = await request.json();
      toast.success(`${expenseObject.name} succesfully created!`, {
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
        duration: 1000
      });

      setExpenseObject({
        name: '',
        category: 'Other',
        amount: '',
        date: new Date(),
        state: '',
        payment_mode: all_payment_modes[0]._id,
        status: 'Completed',
        desc: '',
        owner_id,
      });
      router.refresh();
      return resp;
    }
  };

  return (
    <form
      className='flex flex-col w-full h-full'
      onSubmit={handleCreateExpense}
    >
      <div className='flex flex-col items-center w-full h-full gap-3 px-2 py-1 lg:space-y-4'>
        <div className='flex flex-col items-center justify-center w-full gap-1'>
          <p className='w-full text-base capitalize text-start lg:w-5/6 text-slate-600'>
            Expense Name:
          </p>
          <input
            type='search'
            name='name'
            id='name'
            className='w-full px-1 py-1 text-base font-semibold border rounded-md outline-none cursor-pointer text-start focus:border-green-900 lg:w-5/6 text-slate-600'
            minLength='5'
            maxLength='60'
            required
            value={expenseObject.name}
            role='presentation'
            autoComplete='off'
            onChange={handleFormSubmission}
          />
        </div>
        <div className='flex flex-col items-center justify-center w-full gap-1'>
          <p className='w-full capitalize lg:w-5/6 text-start text-slate-600'>
            category:
          </p>
          <select
            name='category'
            id='category'
            className='w-full py-1 text-base font-semibold text-center border rounded-md outline-none cursor-pointer focus:border-green-900 lg:w-5/6 text-slate-600'
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

        <div className='flex flex-col items-center justify-center w-full gap-1'>
          <p className='w-full text-base capitalize text-start lg:w-5/6 text-slate-600'>
            Payment Mode:
          </p>
          <select
            name='payment_mode'
            id='payment_mode'
            value={expenseObject.payment_mode}
            className='relative w-full py-1 text-base font-semibold text-center border rounded-md outline-none lg:w-5/6 text-slate-600'
            autoComplete='off'
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

        <div className='flex flex-col flex-wrap justify-start w-full h-auto gap-4 mb-4 lg:mb-0 lg:flex-row lg:w-5/6'>
          <input
            type='number'
            name='amount'
            id='amount'
            placeholder='$$.$$'
            className='w-full px-2 py-1 text-base border rounded-md outline-none focus:border-green-600 lg:w-1/5 placeholder:text-center'
            inputMode='decimal'
            pattern='[0-9]*'
            min={0.01}
            max={9999999}
            step='any'
            required={true}
            value={expenseObject.amount}
            onChange={handleFormSubmission}
          />
          <input
            type='text'
            name='state'
            id='state'
            maxLength={2}
            placeholder='State'
            className='w-full px-2 py-1 text-base border rounded-md outline-none focus:border-green-600 lg:w-1/5 placeholder:text-center'
            value={expenseObject.state}
            onChange={handleFormSubmission}
          />
          <DatePicker
            className='w-full text-base tracking-wider text-center border rounded-lg lg:max-w-fit focus:outline-none text-slate-600'
            showIcon
            selected={expenseDate}
            onChange={(date) => setExpenseDate(date)}
          />

          <select
            name='status'
            id='status'
            className='w-full px-2 py-1 text-base text-center border rounded-md outline-none focus:border-green-600 lg:w-1/5 placeholder:text-center'
            value={expenseObject.status}
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
          className='w-full px-2 border rounded-lg outline-none lg:w-5/6 focus:ring-1 focus:ring-green-800'
          value={expenseObject.desc}
          onChange={handleFormSubmission}
        />
        <div className='flex items-center justify-around w-full gap-3 mt-4 lg:mt-0'>
          <button
            type='reset'
            className='w-1/2 py-2 text-base font-semibold uppercase transition-all duration-200 border border-red-600 rounded-lg lg:text-lg lg:w-1/4 text-slate-900/80 hover:tracking-widest hover:bg-red-600 hover:text-white'
            onClick={handleFormCancelation}
          >
            Cancel
          </button>
          <button
            className='w-1/2 py-2 text-base font-semibold uppercase transition-all duration-200 border border-green-900 rounded-lg lg:text-lg lg:w-1/4 text-slate-900/80 hover:tracking-widest hover:bg-green-900 hover:text-white'
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
