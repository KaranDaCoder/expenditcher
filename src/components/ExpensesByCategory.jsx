import { categories_array } from '@/lib/categoryList'
import { expensesByFilter } from '@/utils/getExpensesByFilter'
import LocalAirportIcon from '@mui/icons-material/LocalAirport';

import Link from 'next/link'
import React from 'react'

const ExpensesByCategory = ({ data }) => {
  return (
    <div className='col-span-1 col-start-2 row-span-3 bg-white border rounded-xl hover:border hover:border-green-500'>
      <h2 className='flex items-center justify-center w-full h-10 overflow-hidden text-lg font-semibold tracking-wide text-center uppercase'>Expenses by category</h2>
      <p className='w-full text-xs italic tracking-wide text-center lowercase'>(Includes Completed, Pending and Canceled Expenses)</p>
      <div className='flex flex-col items-start justify-start min-h-full px-10 py-4 space-y-4 capitalize'>
        {categories_array.map(async category => (
          <div className='flex items-center justify-between w-full hover:font-semibold hover:text-slate-700'>
            <Link href={`/expenses?category=${category?.name}`} className='flex items-center gap-2'>
              <p>{category?.icon}</p>
              <p>{category?.name}</p>
            </Link>
            <p className=''>{(expensesByFilter(data, 'category', category?.name))?.count}</p>

          </div>
          // <Link href={`/expenses?category=${category?.name.toString().toLowerCase()}`} className='inline-flex items-center justify-between w-full gap-5 text-lg hover:font-semibold hover:text-slate-700'> {category?.name} <span>{(expensesByFilter(data, 'category', category?.name))?.count}</span></Link>
        ))}
        <div className='w-full h-1 border bg-slate-500'></div>
        <h2 className='inline-flex justify-between w-full gap-5 text-lg'>Total<span>{data?.count}</span></h2>
      </div>
    </div>
  )
}

export default ExpensesByCategory