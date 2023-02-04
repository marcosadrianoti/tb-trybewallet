import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  calculateTotal = (expenses) => {
    let grandTotal = 0;
    console.log('header', expenses);
    expenses.forEach((expense) => {
      const currencies = expense.exchangeRates;
      const expenseCurrency = expense.currency;
      const myCurrency = currencies[expenseCurrency];
      const { ask } = myCurrency;
      const myValue = Number(expense.value) * ask;
      grandTotal += Number(myValue);
    });
    return grandTotal.toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.calculateTotal(expenses) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
