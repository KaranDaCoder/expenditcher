'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const AddPaymentMode = ({ owner_id }) => {
  const router = useRouter();
  const [paymentObject, setPaymentObject] = useState({
    payment_mode_name: null,
    payment_mode_type: 'Credit Card',
  });

  const handleAddPayment = async (e) => {
    e.preventDefault();
    console.log(paymentObject);
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/paymentmodes`,
        {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify(paymentObject),
        }
      );
      if (request.ok) {
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

  const handleAddPaymentObject = (e) => {
    setPaymentObject((prev) => ({
      ...prev,
      owner_id,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className='flex flex-col items-center justify-start w-full p-4 py-8 space-y-8 border shadow-md rounded-xl'>
      <h2 className='w-full text-2xl font-semibold text-center underline uppercase underline-offset-4 text-slate-600'>
        Add a payment
      </h2>
      <form
        className='flex flex-col items-center justify-around w-full gap-4 py-1'
        onSubmit={handleAddPayment}
      >
        <label
          htmlFor='payment_mode_name'
          className='w-3/4 text-base font-semibold text-start text-slate-600'
        >
          Payment Mode Name :
          <input
            type='search'
            name='payment_mode_name'
            id='payment_mode_name'
            className='w-full px-2 py-1 text-base border rounded-md shadow-md outline-none'
            onChange={handleAddPaymentObject}
            required
          />
        </label>
        <label
          htmlFor='payment_mode_name'
          className='w-3/4 text-base font-semibold text-start text-slate-600'
        >
          Payment Mode Type :
          <select
            name='payment_mode_type'
            id='payment_mode_type'
            className='w-full px-2 py-1 text-center capitalize border rounded-md shadow-md outline-none cursor-pointer'
            onChange={handleAddPaymentObject}
          >
            <option value='Credit Card'>Credit Card</option>
            <option value='Debit Card'>Debit Card</option>
            <option value='Checkin Account'>Checkin Account</option>
            <option value='Savings Account'>Savings Account</option>
          </select>
        </label>
        <div className='flex items-center justify-around w-full'>
          <button
            type='submit'
            className='w-1/5 py-1 text-lg tracking-wider text-white capitalize transition-all duration-300 bg-green-700 rounded-md hover:tracking-widest'
          >
            Add
          </button>
          <button
            type='reset'
            className='w-1/5 py-1 text-lg tracking-wider text-white capitalize transition-all duration-300 bg-red-900 rounded-md hover:tracking-widest'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPaymentMode;
