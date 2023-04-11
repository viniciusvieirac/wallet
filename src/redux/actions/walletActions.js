import { REQUEST_WALLET, FAILED_REQUEST, SUCESS_REQUEST } from '../types/walletTypes';
import fetchWallet from '../../services/walletAPI';

const USDT = 'USDT';

const requestWallet = () => ({
  type: REQUEST_WALLET,
});

const sucessRequest = (payload) => ({
  type: SUCESS_REQUEST,
  payload,
});

const failedRequest = (errorMessage) => ({
  type: FAILED_REQUEST,
  payload: errorMessage,
});

export const getWallet = () => async (dispatch) => {
  try {
    dispatch(requestWallet());
    const response = await fetchWallet();
    const currencies = Object.keys(response).filter((currency) => currency !== USDT);
    dispatch(sucessRequest(currencies));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};
