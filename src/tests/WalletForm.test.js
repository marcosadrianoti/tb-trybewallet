import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando o Formulário', () => {
  test('Testa o formulário', async () => {
    const initialEntries = ['/carteira'];
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries });

    const valueInput = screen.queryByTestId('value-input');
    const descriptionInput = screen.queryByTestId('description-input');
    const addButton = screen.queryByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '1');
    expect(valueInput).toHaveValue('1');
    userEvent.type(descriptionInput, 'Balinha de chocolate');
    userEvent.click(addButton);
    expect(descriptionInput).toHaveValue('');

    await waitFor(() => {
      const editButton = screen.queryByRole('button', { name: /editar/i });
      userEvent.click(editButton);
    });

    userEvent.type(descriptionInput, 'Gasolina');
    userEvent.click(addButton);
    expect(descriptionInput).toHaveValue('');
    await waitFor(() => {
      const cell = screen.getByRole('cell', { name: /gasolina/i });
      expect(cell).toBeInTheDocument();
    });

    const deleteButton = screen.queryByRole('button', { name: /excluir/i });
    userEvent.click(deleteButton);
    await waitFor(() => {
      const cell = screen.queryByRole('cell', { name: /gasolina/i });
      expect(cell).not.toBeInTheDocument();
    });

    userEvent.type(valueInput, '1');
    expect(valueInput).toHaveValue('1');
    userEvent.type(descriptionInput, 'Balinha de chocolate');
    userEvent.click(addButton);

    await waitFor(() => {
      const cell = screen.queryByRole('cell', { name: /Balinha de chocolate/i });
      expect(cell).toBeInTheDocument();
      expect(store.getState().wallet.expenses[0].id).toBe(0);
    });

    userEvent.type(valueInput, '2');
    expect(valueInput).toHaveValue('2');
    userEvent.type(descriptionInput, 'Chocolate');
    userEvent.click(addButton);

    const cell = screen.queryByRole('cell', { name: /chocolate/i });
    expect(cell).toBeInTheDocument();
    await waitFor(() => {
      expect(store.getState().wallet.expenses[1].id).toEqual(1);
    });
  });
});
