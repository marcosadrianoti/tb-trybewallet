import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <h2>TrybeWallet</h2>
        <Header />
        <WalletForm />
      </>
    );
  }
}

export default Wallet;
