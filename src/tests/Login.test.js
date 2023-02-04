import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Funcionamento do Login', () => {
  test('O botão "Entrar" deve ser habilitado após digitar corretamente o e-mail e senha.', () => {
    renderWithRouterAndRedux(<App />);
    const EMAIL = 'alguem@com.br';
    const PASS = '123456';

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();

    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, EMAIL);
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, PASS);

    expect(button).not.toBeDisabled();
  });
});
