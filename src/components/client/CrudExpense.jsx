'use client'
import React, { useState } from 'react'

const CrudExpense = ({expense_id}) => {

  return (
   <div className='relative flex justify-around w-full gap-4'>
    <button className='w-1/2 py-2 text-sm tracking-wide bg-white rounded-lg text-slate-800 lg:text-base'>Edit Expense</button>
    <button className='w-1/2 py-2 text-sm tracking-wide text-white rounded-lg lg:text-base bg-slate-800' onClick={() => setDeleteExpenseModal(!deleteExpenseModal)}>Delete Expense</button>
   </div>
  )
}

export default CrudExpense