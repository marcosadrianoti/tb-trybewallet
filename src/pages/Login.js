import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    isValideEmail: false,
    isValidePassword: false,
  };

  validationEmail = (e) => {
    const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    this.setState({
      email: e.target.value,
      isValideEmail: reg.test(e.target.value),
    });
  };

  validationPassword = (e) => {
    const minLength = 6;
    this.setState({
      isValidePassword: e.target.value.length >= minLength,
    });
  };

  saveEmail = (email) => {
    const { dispatch, history } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, isValideEmail, isValidePassword } = this.state;

    return (
      <>
        <div>Login</div>
        <input type="email" data-testid="email-input" onChange={ this.validationEmail } />
        <input
          type="password"
          data-testid="password-input"
          onChange={ this.validationPassword }
        />
        <button
          type="button"
          disabled={ !(isValideEmail === true && isValidePassword === true) }
          onClick={ () => this.saveEmail(email) }
        >
          Entrar
        </button>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
