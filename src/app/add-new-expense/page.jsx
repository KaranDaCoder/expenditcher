'use client';
import BreadCrumb from '@/components/BreadCrumb'
import { categories_array } from '@/lib/categoryList'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const AddNewExpense = () => {
 const router = useRouter();
 const [expense, setExpense] = useState({
  category: 'Other',
  name: '',
  amount: '',
  state: '',
  payment_mode_id: 'result[0]?._id',
  date: new Date(),
  status: 'Completed',
  description: '',
  owner_id: "owner_id"
 })
 const handleFormSubmission = async (e) => {
  e.preventDefault();
  setExpense((prev) => ({
   ...prev,
   [e.target.name]: e.target.value
  }))
 }
 const handleFormReset = (e) => {
  e.preventDefault();
  setExpense(() => ({
   category: 'Other',
   name: '',
   amount: '',
   state: '',
   payment_mode_id: '',
   date: new Date(),
   status: 'Completed',
   description: '',
   owner_id: "owner_id"
  }))
 }

 const handleAddExpenseRequest = async(e) => {
  e.preventDefault();
  console.log(`Expense created : ${JSON.stringify(expense)}`);
 }
  return (
    <div className='w-full h-full'>
    <BreadCrumb link={'Dashboard'} activeLink={'Add New Expense'} />
    <h2 className='inline-flex items-center justify-center w-full mt-10 mb-2 text-2xl uppercase'>
     Add New Expense
    </h2>
    <div className='w-full p-2 mx-auto bg-white border shadow-xl lg:h-auto lg:w-3/4 rounded-xl'>
     <form
      onSubmit={handleAddExpenseRequest}
      onReset={handleFormReset}
      className='flex flex-col w-full h-full p-2 text-sm bg-white lg:gap-4 lg:p-10 text-slate-600'
     >
      <div className='flex flex-col w-full h-auto gap-2 lg:gap-4 lg:flex-row lg:py-0'>
       <div className='flex flex-col items-center justify-center min-w-40'>
       <p className='hidden text-sm text-slate-500 lg:flex'>Category</p>
       <select
        name='category'
        id='category'
        className='w-full h-10 font-semibold text-center border rounded-lg outline-none cursor-pointer'
        value={expense.category}
        onChange={handleFormSubmission}
       >
        {categories_array?.map(cat => (
         <option value={cat?.name} key={cat?.name} className='capitalize'>{cat?.name}</option>
        ))}
       </select>
       </div>
       <div className='flex flex-col items-center justify-center w-full'>
        <p className='hidden text-sm text-slate-500 lg:flex'>Expense Name</p>
       <input
        type='text'
        name='name'
        id='name'
        className='w-full h-10 px-2 text-center border rounded-md outline-none focus:border-green-600 placeholder:italic placeholder:capitalize'
        placeholder='add expense name...'
        minLength='5'
        maxLength='40'
        autoComplete='off'
        required
        value={expense.name}
        onChange={handleFormSubmission}
       />
       </div>
       
      </div>
      <div className='flex flex-col w-full gap-2 py-2 lg:flex-row lg:justify-around lg:py-0'>
       <div className='flex flex-col items-center justify-center min-w-44'>
        <p className='hidden text-sm text-slate-500 lg:flex'>Date</p>
        <input
         type='date'
         name='date'
         id='date'
         className='flex items-center justify-center w-full h-10 text-sm text-center border rounded-md outline-none cursor-pointer lg:w-full'
        value={expense.date}
        onChange={handleFormSubmission}
        />
       </div>
       <div className='flex flex-col items-center justify-center w-full'>
        <p className='hidden text-sm text-slate-500 lg:flex'>Payment Mode</p>
        <select
         name='payment_mode_id'
         id='payment_mode_id'
         className='w-full h-10 text-center capitalize border rounded-md outline-none cursor-pointer'
        value={expense.payment_mode_id}
        onChange={handleFormSubmission}
        >
         <option value="">Wells Fargo</option>
        </select>
       </div>
      </div>
      <div className='flex flex-col w-full py-2 lg:gap-6 lg:flex-row lg:justify-center lg:py-0'>
       <div className='flex flex-col items-center justify-center min-w-40'>
        <p className='hidden text-sm text-slate-500 lg:flex'>Amount</p>
        <input
         type='number'
         name='amount'
         id='amount'
         className='w-full h-10 px-2 text-center border rounded-md outline-none focus:border-green-600 placeholder:italic placeholder:capitalize'
         inputMode='decimal'
         pattern='[0.00-9.00]*'
         placeholder='$$.$$'
         min={0.01}
         max={9999999.99}
         step='0.01'
         required
        value={expense.amount}
        onChange={handleFormSubmission}
        />
       </div>
       <div className='flex flex-col items-center justify-start py-2 min-w-40 lg:py-0'>
        <p className='hidden text-sm text-slate-500 lg:flex'>State</p>
        <input
         type='text'
         name='state'
         id='state'
         maxLength={2}
         placeholder='MN'
         autoComplete='off'
         className='w-full h-10 text-center uppercase border rounded-md outline-none lg:min-w-20 focus:border-green-600 placeholder:italic'
         value={expense.state}
         pattern='[A-Za-z]*'
         onChange={handleFormSubmission}
        />
       </div>
       <div className='flex flex-col items-center justify-start min-w-40'>
        <p className='hidden text-sm text-slate-500 lg:flex'>Status</p>
       <select
        name='status'
        id='status'
        className='w-full h-10 text-center border rounded-lg outline-none cursor-pointer lg:min-w-72'
        value={expense.status}
        onChange={handleFormSubmission}
       >
        <option value='Completed'>Completed</option>
        <option value="Pending">Pending</option>
        <option value="Canceled">Canceled</option>
       </select>

       </div>
     </div>

      <div className='flex flex-col items-center justify-center w-full py-2 lg:py-0'>
       <p className='hidden text-sm text-slate-500 lg:flex'>Description</p>
       <textarea
        name='description'
        id='description'
        placeholder='description'
        rows={10}
        className='w-full px-2 text-sm border rounded-md outline-none resize-none focus:border-green-600 placeholder:italic placeholder:capitalize'
        value={expense.description}
        onChange={handleFormSubmission}
       />
     </div>
      <div className='flex flex-col justify-around w-full gap-2 mt-4 lg:flex-row'>
       <button
        type='submit'
        className={`${(expense.name.length < 5 || expense.amount === '' || expense.date === '') ? 'hidden' : 'block'} lg:w-1/2 w-full px-4 py-3 text-white rounded-lg shadow-md bg-slate-800`}
       >
        Add
       </button>
       <button
        type='reset'
        className='w-full px-4 py-3 border rounded-lg shadow-md lg:w-1/2'
       // onClick={() => setExpense({name : ''})}
       >
        Cancel
       </button>
      
      </div>
   


     </form>
    </div>
    </div>
  )
}

export default AddNewExpense