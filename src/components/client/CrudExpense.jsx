'use client'
import React, { useState } from 'react'
import DialogBox from '../DialogBox'
import { useRouter } from 'next/navigation';

const CrudExpense = ({expense_id, expense_name}) => {
 const [expenseDialog , setExpenseDialog] = useState(false);
 console.log(`Expense Dialog :` , expenseDialog);
  const router = useRouter();
  console.log(`EXPENSE ID`, expense_id)
  const handleDeleteExpense = async () => {
    try {
      const request = await fetch(`/api/expenses/${expense_id}`, { method: 'DELETE', cache: 'no-store', redirect: 'follow' })
      const response = await request.json();
      if (request.ok) {
          router.refresh();
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
   <div className='flex justify-around w-full gap-4'>
    <button className='w-1/2 py-2 text-sm tracking-wide bg-white rounded-lg text-slate-800 lg:text-base'>Edit Expense</button>
    <button className='w-1/2 py-2 text-sm tracking-wide text-white rounded-lg lg:text-base bg-slate-800' onClick={() => setExpenseDialog(!expenseDialog)}>Delete Expense</button>
   </div>
      {expenseDialog && <DialogBox expense_name={expense_name} expenseDialog={expenseDialog} setExpenseDialog={setExpenseDialog} handleDeleteExpense={handleDeleteExpense}/>}
    </>
  )
}

export default CrudExpense