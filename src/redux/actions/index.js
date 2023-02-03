// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});
// Atualização do estado local na WalletForm está intermitente, mesmo que o estado global está sempre atualizado.
export function apiCurrencies() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const allKeys = Object.keys(data);
        dispatch(getCurrencies(allKeys.filter((key) => key !== 'USDT')));
      });
    // .catch((error) => dispatch(requestFailed(error)));
  };
}
