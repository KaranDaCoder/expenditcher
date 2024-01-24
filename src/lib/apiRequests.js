import { cookies } from 'next/headers';

const fetchLoggedInUserDetails = async (user_id) => {
  try {
    const request = await fetch(
      `${process.env.NEXTAUTH_URL}/api/users/${user_id}`,
      { method: 'GET', cache: 'no-cache', headers: { Cookie: cookies() } }
    );
    if (request.ok) {
      const resp = await request.json();
      return resp;
    } else {
      throw new Error(request.error);
    }
  } catch (error) {
    console.log(error);
  }
};

// PAYMENT-MODES
const getUserPaymentModes = async () => {
  try {
    const request = await fetch(
      `${process.env.NEXTAUTH_URL}/api/paymentmodes`,
      {
        method: 'GET',
        cache: 'no-store',
        redirect: 'follow',
        headers: {
          Cookie: cookies(),
        },
      }
    );
    if (request.ok) {
      const resp = await request.json();
      return resp;
    } else {
      throw new Error(request.error);
    }
  } catch (error) {
    console.log(error);
  }
};

//SINGLE PAYMENT MODE
const getSinglePaymentMode = async (payment_mode_id) => {
  try {
    const request = await fetch(
      `${process.env.NEXTAUTH_URL}/api/paymentmodes/${payment_mode_id}`,
      {
        method: 'GET',
        cache: 'no-store',
        redirect: 'follow',
        headers: {
          Cookie: cookies(),
        },
      }
    );
    if (request.ok) {
      const resp = await request.json();
      return resp;
    } else {
      throw new Error(request.error);
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserExpensesByPaymentModeId = async (
  payment_mode_id,
  searchParams
) => {
  let request = '';
  try {
    if (payment_mode_id === 'all' || !payment_mode_id) {
      request = await fetch(
        `${process.env.NEXTAUTH_URL}/api/expenses?payment_mode=all`,
        { method: 'GET', cache: 'no-cache', headers: { Cookie: cookies() } }
      );
    } else {
      request = await fetch(
        `${process.env.NEXTAUTH_URL}/api/expenses?payment_mode=${payment_mode_id}`,
        { method: 'GET', cache: 'no-store', headers: { Cookie: cookies() } }
      );
    }

    if (request.ok) {
      const resp = await request.json();
      if (!searchParams) {
        return resp;
      } else {
        const data = resp.all_expenses.filter((exp) => {
          if (
            exp.name
              .toString()
              .toLowerCase()
              .includes(searchParams.toString().toLowerCase())
           || exp.desc
              .toString()
              .toLowerCase()
              .includes(searchParams.toString().toLowerCase())) {
            return exp;
          }
        });
        return {
          all_expenses: data,
          expense_total: resp.expense_total,
          results: resp.results,
        };
      }
    } else {
      throw new Error(request.error);
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchLoggedInUserDetails,
  getUserPaymentModes,
  getSinglePaymentMode,
  getUserExpensesByPaymentModeId,
};
