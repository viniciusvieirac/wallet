import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('testa o componente WalletForm', () => {
  it('verifica se os inputs estão na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const inputDescription = screen.getByRole('spinbutton');
    const inputTag = screen.getByRole('textbox');
    const inputMethod = screen.getByTestId('method-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const buttonAdd = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(inputDescription).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
  });

  it('testa a funcionalidade dos inputs e botao', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputDescription = screen.getByTestId('description-input');
    const buttonAdd = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(buttonAdd).toBeInTheDocument();

    userEvent.click(buttonAdd);

    const editButton = await waitFor(() => screen.getByRole('button', { name: /editar/i }));

    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);

    const buttonEditAdd = await waitFor(() => screen.getByRole('button', { name: /editar despesa/i }));
    expect(buttonEditAdd).toBeInTheDocument();
    userEvent.type(inputDescription, 'test');

    userEvent.click(buttonEditAdd);

    const textTest = screen.getByText('test');

    await waitFor(
      () => expect(inputDescription).toHaveValue(''),
      expect(textTest).toBeInTheDocument(),
      expect(buttonAdd).toBeInTheDocument(),
    );
  });
});
