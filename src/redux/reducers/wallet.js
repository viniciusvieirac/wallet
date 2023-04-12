import { REQUEST_WALLET, SUCESS_REQUEST } from '../types/walletTypes';
import { ADD_EXPENSE, DELETE_EXPENSE } from '../types/expensesTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case (REQUEST_WALLET): {
    return {
      ...state,
    };
  }
  case (SUCESS_REQUEST): {
    return {
      ...state,
      currencies: payload,
    };
  }
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        value: payload.value,
        description: payload.description,
        currency: payload.currency,
        method: payload.method,
        tag: payload.tag,
        exchangeRates: payload.exchangeRates,
      }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload),
    };
  default:
    return state;
  }
};

export default walletReducer;
