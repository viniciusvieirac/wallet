import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const passwordInput = 'password-input';

describe('Página de Login', () => {
  it('Verifica se os inputs de Login aparecem na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox');
    const inputSenha = screen.getByTestId(passwordInput);
    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
  });
  it('Verifica se os inputs de Login são preenchidos', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox');
    const inputSenha = screen.getByTestId(passwordInput);

    const email = 'teste@betrybe.com';
    const passoword = 'vasco da gama';

    userEvent.type(inputEmail, email);
    userEvent.type(inputSenha, passoword);

    expect(inputEmail.value).toBe(email);
    expect(inputSenha.value).toBe(passoword);
  });

  it('Verifica se quando preencher os inputs e clicar no botão, é redirecionado para outra página', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    const email = 'teste@betrybe.com';
    const passoword = 'vasco da gama';

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, passoword);

    expect(inputEmail.value).toBe(email);
    expect(inputPassword.value).toBe(passoword);

    userEvent.click(button);

    const titleEmail = screen.getByText(/teste@betrybe\.com/i);
    expect(titleEmail).toBeInTheDocument();
    expect(history.location.pathname).toBe('/carteira');
  });
});
