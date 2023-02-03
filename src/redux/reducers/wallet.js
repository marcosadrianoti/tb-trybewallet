// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSES:
    // console.log(state.expenses.length);
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  // case SAVE_CURRENCIES_FOR_EXPENSE:
  //   action.payload.exchangeRates = action.payload;
  //   return {
  //     ...state,
  //     expenses: [...state.expenses, action.payload],
  //   };
  default:
    return state;
  }
};

export default wallet;
