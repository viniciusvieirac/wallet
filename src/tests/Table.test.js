import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente table', () => {
  it('Verifica se os textos de th aparecem na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const description = screen.getByRole('columnheader', { name: /descrição/i });
    const tag = screen.getByRole('columnheader', { name: /tag/i });
    const method = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const valor = screen.getByText('Valor');
    const moeda = screen.getByText('Moeda');
    const cambio = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const valorConvertido = screen.getByRole('columnheader', { name: /valor convertido/i });
    const moedaDeConversao = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const editarExcluir = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(cambio).toBeInTheDocument();
    expect(valorConvertido).toBeInTheDocument();
    expect(moedaDeConversao).toBeInTheDocument();
    expect(editarExcluir).toBeInTheDocument();
  });

  it('testa o botao de adicionar despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const adicionarDespesa = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(adicionarDespesa);

    const editButton = await waitFor(() => screen.getByRole('button', { name: /editar/i }));
    const deleteButton = await waitFor(() => screen.getByRole('button', { name: /excluir/i }));

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
