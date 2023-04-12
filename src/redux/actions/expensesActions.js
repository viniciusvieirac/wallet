import {
  ADD_EXPENSE, DELETE_EXPENSE,
} from '../types/expensesTypes';

import fetchWallet from '../../services/walletAPI';

const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload: {
    value: payload.value,
    description: payload.description,
    currency: payload.currency,
    method: payload.method,
    tag: payload.tag,
    exchangeRates: payload.exchangeRates,
  },
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const expenseThunk = (expense) => async (dispatch) => {
  const currencies = await fetchWallet();
  const { value,
    description,
    currency,
    method,
    tag } = expense;
  dispatch(addExpense({ value,
    description,
    currency,
    method,
    tag,
    exchangeRates: currencies }));
};
