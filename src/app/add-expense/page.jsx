import AddExpenseForm from '@/components/add-expense/AddExpenseForm';
import React from 'react'

const AddExpense = () => {
  return (
    <div className='bg-white w-full min-h-[100dvh] flex justify-center items-start mt-14'>
           <div className='w-full h-auto p-4 border rounded-lg shadow-lg lg:w-3/4'>
            <h2 className='w-full mb-4 text-2xl text-center uppercase text-slate-700'>add new expense</h2>
           <AddExpenseForm/>
           </div>
    </div>
  );
}

export default AddExpense