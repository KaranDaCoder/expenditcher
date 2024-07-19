import React from 'react'

const ExpenseDrawer = ({setExpenseDrawer, expenseDrawer}) => {
  return (
   expenseDrawer && (<div className={`relative top-0 w-full h-full text-white`} >
    <h2 onClick={() => setExpenseDrawer(false)}>ADD NEW EXPENSE</h2>
    </div>)
  )
}

export default ExpenseDrawer