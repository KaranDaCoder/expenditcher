'use client';
import { categories_array } from '@/lib/categoryList'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Slide, toast } from 'react-toastify';

const AddNewExpense = ({ owner_id, data }) => {
 const router = useRouter();
 const notify = (message) => toast(message, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
 })
 const [expense, setExpense] = useState({
  category: 'Other Services',
  name: '',
  amount: '',
  state: 'MN',
  payment_mode_id: data?.result[0]?._id,
  date: new Date(),
  status: 'completed',
  desc: '',
  owner_id: owner_id
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
   category: 'Other Services',
   name: '',
   amount: '',
   state: 'MN',
   payment_mode_id: data?.result[0]?._id,
   date: new Date(),
   status: 'completed',
   desc: '',
   owner_id: owner_id
  }))
 }

 const handleAddExpenseRequest = async (e) => {
  e.preventDefault();
  try {
   const request = await fetch(`/api/expenses`, { method: 'POST', cache: 'no-cache', redirect: 'follow', body: JSON.stringify(expense) });
   const response = await request.json();
   if (request.ok) {
    notify(`${response?.success} to  ${expense?.category}`);
    handleFormReset(e);
   } else {
    console.log(response)
    throw new Error(request.error);
   }
   router.refresh();
  } catch (error) {
   console.log(error)
  }
 }
 return (
  <div className='w-full p-2 mx-auto bg-white border shadow-lg lg:h-auto lg:w-3/4 rounded-xl'>
   <form
    onSubmit={handleAddExpenseRequest}
    onReset={handleFormReset}
    className='flex flex-col w-full h-full py-1 text-base lg:text-sm lg:gap-4 lg:p-10 text-slate-600'
   >
    <div className='flex flex-col w-full h-auto gap-2 lg:gap-4 lg:flex-row lg:py-0'>
     <div className='flex flex-col items-center justify-center min-w-40'>
      <p className='hidden lg:text-sm text-slate-500 lg:flex'>Category</p>
      <select
       name='category'
       id='category'
       className='w-full h-10 font-semibold text-center bg-white border rounded-lg outline-none cursor-pointer'
       value={expense.category}
       onChange={handleFormSubmission}
      >
       {categories_array?.map(cat => (
        <option value={cat?.name} key={cat?.name} className='capitalize bg-white'>{cat?.name}</option>
       ))}
      </select>
     </div>
     <div className='flex flex-col items-center justify-center w-full'>
      <p className='hidden text-slate-500 lg:flex'>Expense Name</p>
      <input
       type='text'
       name='name'
       id='name'
       className='w-full h-10 px-2 text-center border rounded-md outline-none focus:border-green-600 placeholder:italic placeholder:lowercase'
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
     <div className='flex flex-col items-center justify-center w-full lg:w-48'>
      <p className='hidden text-slate-500 lg:flex'>Date</p>
      <input
       type='date'
       name='date'
       id='date'
       className='flex items-center justify-around w-full h-10 text-center bg-white border rounded-md outline-none cursor-pointer '
       value={expense.date}
       onChange={handleFormSubmission}
      />
     </div>
     <div className='flex flex-col items-center justify-center w-full'>
      <p className='hidden text-slate-500 lg:flex'>Payment Mode</p>

      <select
       name='payment_mode_id'
       id='payment_mode_id'
       className='w-full h-10 text-center capitalize bg-white border rounded-md outline-none cursor-pointer'
       value={expense.payment_mode_id}
       onChange={handleFormSubmission}
      >
       {data?.result?.map(p_m => (
        <option value={p_m._id} key={p_m._id} className='bg-white'>{p_m.payment_mode_name}</option>
       ))}
      </select>
     </div>
    </div>
    <div className='flex flex-col w-full py-2 lg:gap-6 lg:flex-row lg:justify-center lg:py-0'>
     <div className='flex flex-col items-center justify-center min-w-40'>
      <p className='hidden text-slate-500 lg:flex'>Amount</p>
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
      <p className='hidden text-slate-500 lg:flex'>State</p>
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
     <div className='flex flex-col items-center justify-start bg-white min-w-40'>
      <p className='hidden text-slate-500 lg:flex'>Status</p>
      <select
       name='status'
       id='status'
       className='w-full h-10 text-center bg-white border rounded-lg outline-none cursor-pointer lg:min-w-72'
       value={expense.status}
       onChange={handleFormSubmission}
      >
       <option className='bg-white' value='completed'>Completed</option>
       <option className='bg-white' value="pending">Pending</option>
       <option className='bg-white' value="canceled">Canceled</option>
      </select>

     </div>
    </div>

    <div className='flex flex-col items-center justify-center w-full py-2 lg:py-0'>
     <p className='hidden text-slate-500 lg:flex'>Description</p>
     <textarea
      name='desc'
      id='desc'
      placeholder='description'
      rows={10}
      className='w-full p-2 border rounded-md outline-none resize-none focus:border-green-600 placeholder:italic placeholder:capitalize'
      value={expense.desc}
      onChange={handleFormSubmission}
     />
    </div>
    <div className='flex flex-row justify-around w-full gap-2 mt-4'>
     <button
      type='reset'
      className='w-1/2 px-2 py-2 border rounded-lg shadow-md lg:px-4 lg:py-3 lg:w-1/2'
     >
      Cancel
     </button>
     <button
      type='submit'
      className={`${(expense.name.length < 5 || expense.amount === '' || expense.date === '') ? 'hidden' : 'block'} lg:w-1/2 w-1/2 px-2 py-2 lg:py-3 text-white rounded-lg shadow-md bg-slate-800`}
     >
      Add
     </button>
    </div>
   </form>
  </div>
 )
}

export default AddNewExpense