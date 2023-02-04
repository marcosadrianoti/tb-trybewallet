import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando o funcionamento da carteira', () => {
  it('O valor total deve ser diferente do valor inicial após novos valores serem lançados', async () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const total = screen.queryByTestId('total-field');
    const headerCurrency = screen.queryByTestId('header-currency-field');
    const emailField = screen.queryByTestId('email-field');
    expect(emailField.innerHTML).toEqual('');
    expect(headerCurrency.innerHTML).toEqual('BRL');
    expect(total.innerHTML).toEqual('0.00');

    const valueInput = screen.queryByTestId('value-input');
    const descriptionInput = screen.queryByTestId('description-input');
    const addButton = screen.queryByRole('button', { name: /adicionar despesa/i });
    const initialValueTotal = total.innerHTML;

    userEvent.type(valueInput, '1');
    expect(valueInput).toHaveValue('1');
    userEvent.type(descriptionInput, 'Balinha de chocolate');
    userEvent.click(addButton);

    await waitFor(() => {
      const finalValueTotal = total.innerHTML;
      expect(finalValueTotal).not.toEqual(initialValueTotal);
    });
  });
});
