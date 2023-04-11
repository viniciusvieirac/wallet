import { REQUEST_WALLET, FAILED_REQUEST, SUCESS_REQUEST } from '../types/walletTypes';

const INITIAL_STATE = {
  currencies: [],
  loading: false,
  errorMessage: null,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case (REQUEST_WALLET): {
    return {
      ...state,
      loading: true,
    };
  }
  case (SUCESS_REQUEST): {
    return {
      ...state,
      loading: false,
      currencies: payload,
    };
  }
  case (FAILED_REQUEST): {
    return {
      ...state,
      loading: false,
      errorMessage: payload.errorMessage,

    };
  }
  default:
    return state;
  }
};

export default walletReducer;
