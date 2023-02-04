// App.test.js
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Tela de Login com os campos de email e password.', () => {
  test('Verificando se existe o campo Email.', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveProperty('type', 'email');
  });

  test('Verificando se existe o campo Password.', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('password-input');
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveProperty('type', 'password');
  });

  test('Verificando se existe um botão.', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getAllByRole('button');
    expect(button).toHaveLength(1);
  });

  test('Deve ir para a página Wallet após clicar o botão "Entrar"', () => {
    const EMAIL = 'alguem@com.br';
    const PASS = '123456';
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, EMAIL);

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, PASS);

    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toEqual('/carteira');

    const Title = screen.getByRole('heading', { level: 2, name: 'TrybeWallet' });
    expect(Title).toBeInTheDocument();
  });
});
