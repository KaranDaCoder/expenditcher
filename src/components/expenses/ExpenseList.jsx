import ExpenseCard from './ExpenseCard';

const ExpenseList = ({ all_expenses }) => {
  console.log(all_expenses);
  return (
    <div className='flex flex-col w-full h-auto gap-4 rounded-lg'>
      {all_expenses?.map((expense) => (
        <ExpenseCard
          key={expense._id}
          name={expense?.name}
          date={expense?.date}
          status={expense?.status}
          state={expense?.state}
          desc={expense?.desc}
          amount={expense?.amount}
          category={expense?.category}
          payment_mode_name={expense?.payment_mode?.payment_mode_name}
          expense_id={expense?._id}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
