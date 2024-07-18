'use client'
import React, { useState } from 'react'
import DialogBox from '../DialogBox'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CrudExpense = ({expense_id, name}) => {
 const [dialogBox , setDialogBox] = useState(false);
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
    <button onClick={() => router.replace(`/expenses/${expense_id}/edit`)} className='w-1/2 py-2 text-sm tracking-wide bg-white rounded-lg text-slate-800 lg:text-base'>Edit Expense</button>
    <button className='w-1/2 py-2 text-sm tracking-wide text-white rounded-lg lg:text-base bg-slate-800' onClick={() => setDialogBox(!dialogBox)}>Delete Expense</button>
   </div>
      {dialogBox && <DialogBox name={name} dialogBox={dialogBox} setDialogBox={setDialogBox} handleDelete={handleDeleteExpense}/>}
    </>
  )
}

export default CrudExpense