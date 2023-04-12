import {
  ADD_EXPENSE,
} from '../types/expensesTypes';

import fetchWallet from '../../services/walletAPI';

const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload: {
    value: payload.value,
    description: payload.description,
    currencie: payload.currencie,
    method: payload.method,
    category: payload.category,
    exchangeRates: payload.exchangeRates,
  },
});

export const expenseThunk = (expense) => async (dispatch) => {
  const currencies = await fetchWallet();
  const { value,
    description,
    currencie,
    method,
    category } = expense;
  dispatch(addExpense({ value,
    description,
    currencie,
    method,
    category,
    exchangeRates: currencies }));
};
