export const expensesByFilter = (data, filterKey, filterValue) => {
  let total;
  let result;
  try {
    if (!filterKey || !filterValue) return data;
    if (filterKey === 'status') {
     result =  data?.result?.filter((expense) => expense.status === filterValue);
     total = result.reduce(function (prev, curr) {
      return parseFloat(prev) + parseFloat(curr.amount)
     }, parseFloat(0.0))/100;
    } else if(filterKey === 'category') {
      result = data?.result?.filter(
        (expense) => expense.category === filterValue
      );
        total =
          result.reduce(function (prev, curr) {
            return parseFloat(prev) + parseFloat(curr.amount);
          }, parseFloat(0.0)) / 100;
    } else if (filterKey === 'payment_mode_id') {
      result = data?.result?.filter(
        (expense) =>
          expense.payment_mode_id._id.toString() === filterValue.toString()
      );
      total =
        result.reduce(function (prev, curr) {
          return parseFloat(prev) + parseFloat(curr.amount);
        }, parseFloat(0.0)) / 100;
    }
    return {result, total, count: result.length}
  } catch (error) {
    throw new Error(error);
  }
};
