import { REQUEST_WALLET, SUCESS_REQUEST } from '../types/walletTypes';
import { ADD_EXPENSE,
  DELETE_EXPENSE, SAVE_EXPENSE, EDIT_EXPENSE } from '../types/expensesTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const editExpense = (expenses, payload) => expenses.map((expense) => {
  if (expense.id === payload.id) {
    return {
      ...expense,
      ...payload.expense,
    };
  }
  return expense;
});

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
  case EDIT_EXPENSE: {
    return {
      ...state,
      editor: true,
      idToEdit: payload,
    };
  }
  case SAVE_EXPENSE: {
    return {
      ...state,
      expenses: editExpense(state.expenses, payload),
      editor: false,
    };
  }
  default:
    return state;
  }
};

export default walletReducer;
