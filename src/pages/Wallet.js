import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <h2>TrybeWallet</h2>
        <Header />
        <WalletForm />
        <Table />
      </>
    );
  }
}

export default Wallet;
