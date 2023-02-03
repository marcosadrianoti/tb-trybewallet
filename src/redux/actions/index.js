// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});

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

export function savingExpense(myState) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        const newExpense = {
          ...myState,
          exchangeRates: data,
        };
        dispatch(saveExpenses(newExpense));
      });
  };
}
