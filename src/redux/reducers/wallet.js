// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  SAVE_EXPENSES,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  SET_EDITOR,
} from '../actions';

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
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case SET_EDITOR:
    return {
      ...state,
      editor: action.payload.editor,
      idToEdit: action.payload.idToEdit,
    };
  default:
    return state;
  }
};

export default wallet;
