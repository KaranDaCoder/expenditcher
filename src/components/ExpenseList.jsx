import moment from 'moment'
import Link from 'next/link';
const { format } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const ExpenseList = ({ data }) => {
  return (
    <div className='relative w-full h-auto p-2'>
      {/* TABLE HEADERS */}
      {data?.count > 0 ?  <table className='w-full table-fixed'>
        <thead className='sticky top-0 text-white'>
          <tr className='flex items-center justify-between w-full h-10 rounded-md bg-slate-600'>
            <th className='text-base font-semibold text-center uppercase w-60'>Name</th>
            <th className='hidden text-base font-semibold text-center uppercase w-60 lg:block'>Payment Account</th>
            <th className='text-base font-semibold text-center uppercase w-60 lg:block'>Date</th>
            <th className='hidden text-base font-semibold text-center uppercase w-60 lg:block'>Status</th>
            <th className='hidden text-base font-semibold text-center uppercase w-60 lg:block'>Category</th>
            <th className='text-base font-semibold text-center uppercase w-60'>Amount</th>
          </tr>
        </thead>
        <tbody className='flex flex-col'>
          {data?.result.map(expense => (
            <tr className='flex items-center justify-between w-full px-2 mt-2 mb-2 text-sm transition-all duration-500 bg-white border rounded-md shadow-md cursor-pointer lg:text-base min-h-20 hover:font-semibold' key={expense._id}>
              <td className='text-center capitalize truncate w-60'>{expense.name}</td>
              <td className='hidden text-center w-60 lg:block'>{expense.payment_mode_id.payment_mode_name}</td>
              <td className='text-center w-60 lg:block'>{moment(expense.date).format('DD MMM YY')}</td>
              <td className='hidden text-center capitalize w-60 lg:block'>{expense.status.toString()}</td>
              <td className='hidden text-center capitalize w-60 lg:block'>{expense.category}</td>
              <td className='font-semibold tracking-wide text-center text-green-700 w-60'>{format(expense.amount / 100)}</td>
            </tr>
          ))}
        
        </tbody>
      </table> : <div className='flex justify-center w-full m-auto mt-2 bg-white h-96'>
        <div className='flex flex-col items-center justify-center w-full h-full border shadow-md space-y-7 rounded-xl'>
          <h1 className='text-3xl font-semibold capitalize'>hello, ditcher!</h1>
          <h2 className='w-full text-base text-center'>You have No Expenses Here. You can start adding expenses by clicking on the link below.</h2>
          <Link href={"/add-new-expense"} className='px-6 py-3 tracking-wide text-white uppercase rounded-md bg-slate-600'>Add New Expense</Link>
        </div>
        </div>}
    </div>
  )
}

export default ExpenseList