import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const initialState = {
  user: {
    email: 'teste@betrybe.com',
    password: 'vasco',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

describe('Testando o componente Header', () => {
  it('testando se o email aparece na tela', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const getEmail = screen.getByText(/teste@betrybe\.com/i);
    const getTotalField = screen.getByText(/0\.00/i);
    const getHeaderCurrency = screen.getByText(/brl/i);

    expect(getEmail).toBeInTheDocument();
    expect(getTotalField).toBeInTheDocument();
    expect(getHeaderCurrency).toBeInTheDocument();
  });
});
