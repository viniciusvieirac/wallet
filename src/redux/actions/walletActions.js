import { REQUEST_WALLET, SUCESS_REQUEST } from '../types/walletTypes';
import fetchWallet from '../../services/walletAPI';

const USDT = 'USDT';

const requestWallet = () => ({
  type: REQUEST_WALLET,
});

const sucessRequest = (payload) => ({
  type: SUCESS_REQUEST,
  payload,
});

export const getWallet = () => async (dispatch) => {
  dispatch(requestWallet());
  const response = await fetchWallet();
  const currencies = Object.keys(response).filter((currency) => currency !== USDT);
  dispatch(sucessRequest(currencies));
};
