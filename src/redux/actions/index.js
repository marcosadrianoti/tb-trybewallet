// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const SET_EDITOR = 'SET_EDITOR';

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

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const updateExpense = (payload) => ({
  type: UPDATE_EXPENSE,
  payload,
});

export const setEditor = (payload) => ({
  type: SET_EDITOR,
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
