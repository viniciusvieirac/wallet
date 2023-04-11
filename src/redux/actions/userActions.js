import { USER_INFO } from '../types/userTypes';

export const login = (payload) => ({
  type: USER_INFO,
  payload,
});
