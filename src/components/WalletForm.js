import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiCurrencies, savingExpense, updateExpense, setEditor } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: undefined,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(apiCurrencies());
  }

  componentDidUpdate(_previousProps, previousState) {
    const { expenses, editor, idToEdit } = this.props;
    if (editor) {
      const expenseToEdit = expenses.filter((expense) => expense.id === idToEdit);
      const { id, value, description, currency, method, tag } = expenseToEdit[0];
      if (previousState.id !== id) {
        this.setState({
          id,
          value,
          description,
          currency,
          method,
          tag,
        });
      }
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveMyExpenses = (myState) => {
    const { dispatch, expenses, editor, idToEdit } = this.props;
    if (editor) {
      const idExpense = expenses.findIndex((elem) => elem.id === idToEdit);
      expenses[idExpense].value = myState.value;
      expenses[idExpense].description = myState.description;
      expenses[idExpense].currency = myState.currency;
      expenses[idExpense].method = myState.method;
      expenses[idExpense].tag = myState.tag;
      dispatch(updateExpense(expenses));
      dispatch(setEditor({ editor: false, idToEdit: 0 }));
    } else {
      let idLastExpense = 0;
      if (expenses.length !== 0) {
        idLastExpense = expenses[expenses.length - 1].id + 1;
      }
      myState.id = idLastExpense === 0 ? 0 : idLastExpense;
      dispatch(savingExpense(myState));
    }
    this.setState({
      id: undefined,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            id="value"
            name="value"
            data-testid="value-input"
            value={ value }
            // value={ editor === false ? value : '' } //apenas um teste
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies
            .map((curr) => <option key={ curr } value={ curr }>{ curr }</option>)}
        </select>

        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => this.saveMyExpenses(this.state) }
        >
          {/* {editor === false ? 'Adicionar despesa' : () => this.getFields} */}
          {editor === false ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
