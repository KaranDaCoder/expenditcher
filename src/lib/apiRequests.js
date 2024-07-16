import { cookies } from 'next/headers';

export const getAllExpenses = async () => {
  let request;
  try {
    request = await fetch(`${process.env.AUTH_URL}/api/expenses`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { ContentType: 'application/json', cookie: cookies() },
    });

    if (request.ok) {
      const { result, expense_total, count } = await request.json();
      return { result, expense_total, count };
    } else {
      throw new Error(request.error);
    }
  } catch (error) {
    console.log(error);
  }
};



export const getFilteredExpenses = async (
  status,
  category,
  payment_mode_id,
  search
) => {
  let request;
  try {
    //ALL EXPENSES
    if (!status && !category && !payment_mode_id) {
      request = await fetch(`${process.env.AUTH_URL}/api/expenses`, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { ContentType: 'application/json', cookie: cookies() },
      });
      // STATUS
    } else if (!category && !payment_mode_id) {
      request = await fetch(
        `${process.env.AUTH_URL}/api/expenses?status=${status}`,
        {
          method: 'GET',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: { ContentType: 'application/json', cookie: cookies() },
        }
      );
      //PAYMENT MODE ID
    } else if (!status && !category) {
      request = await fetch(
        `${process.env.AUTH_URL}/api/expenses?payment_mode_id=${payment_mode_id}`,
        {
          method: 'GET',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: { ContentType: 'application/json', cookie: cookies() },
        }
      );
      // CATEGORY
    } else if (!status && !payment_mode_id) {
      request = await fetch(
        `${process.env.AUTH_URL}/api/expenses?category=${category}`,
        {
          method: 'GET',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: { ContentType: 'application/json', cookie: cookies() },
        }
      );
    } 
    if(!request.ok) throw new Error(request.error);
    const data = await request.json();
     //SEARCH
    if(search) {
      console.log(`SEARCH IS TRUE!`)
      const searchBy = data?.result.filter((expense) =>
        expense.name.toString().toLowerCase().includes(search)
      );
       const expense_total =
         searchBy.reduce(function (prev, curr) {
           return parseFloat(prev) + parseFloat(curr.amount);
         }, parseFloat(0.0)) / 100;
       return { result:searchBy, count: searchBy.length, expense_total };
    }
    return data;

  } catch (error) {
    console.log(error)
  }
};

export const getExpenseDetails = async(expense_id) => {
   let request;
   try {
     request = await fetch(`${process.env.AUTH_URL}/api/expenses/${expense_id}`, {
       method: 'GET',
       cache: 'no-cache',
       credentials: 'same-origin',
       headers: { ContentType: 'application/json', cookie: cookies() },
     });

     if (request.ok) {
       const { result, count } = await request.json();
       return { result, count };
     } else {
       throw new Error(request.error);
     }
   } catch (error) {
     console.log(error);
   }
}

export const getUserPaymentModes = async () => {
  try {
    const request = await fetch(`${process.env.AUTH_URL}/api/payment-modes`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { ContentType: 'application/json', cookie: cookies() },
    });
    if (request.ok) {
      const { result, count } = await request.json();
      return { result, count };
    } else {
      throw new Error(request.error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserPaymentMode = async (payment_mode_id) => {
  try {
    const request = await fetch(`${process.env.AUTH_URL}/api/payment-modes/${payment_mode_id}`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { ContentType: 'application/json', cookie: cookies() },
    });
    if (request.ok) {
      const { result, count } = await request.json();
      return { result, count };
    } else {
      throw new Error(request.error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (user_id) => {
  try {
    const request = await fetch(`${process.env.AUTH_URL}/api/users/${user_id}`, {method: 'GET', cache: 'no-cache', credentials: 'same-origin', headers: {ContentType: 'application/json', cookie: cookies()}});
    if(request.ok) {
      const {result, count} = await request.json();
      return {result, count};
    } else {
      throw new Error(request.error)
    }
  } catch (error) {
    console.log(error )
  }
}


export const { format } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
