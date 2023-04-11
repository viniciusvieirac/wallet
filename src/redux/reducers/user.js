import { USER_INFO } from '../types/userTypes';
// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
  password: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case USER_INFO:
    return {
      ...state,
      email: payload.email,
      password: payload.password,
    };
  default:
    return state;
  }
};

export default userReducer;
