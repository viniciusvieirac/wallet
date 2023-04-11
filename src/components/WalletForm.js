import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWallet } from '../redux/actions/walletActions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getWallet());
  }

  render() {
    const { currencies, loading } = this.props;
    if (loading) return '';
    return (
      <div>
        <form>
          <input type="number" data-testid="value-input" />
          <input type="text" data-testid="description-input" />
          <select data-testid="currency-input">
            {currencies.map((currency, index) => (
              <option key={ index }>{currency}</option>
            ))}
          </select>
          <select data-testid="method-input">
            <option value="Dinheiro">
              Dinheiro
            </option>
            <option value="Cartão de crédito">
              Cartão de crédito
            </option>
            <option value="Cartão de débito">
              Cartão de débito
            </option>
          </select>
          <select data-testid="tag-input">
            <option value="Alimentação">
              Alimentação
            </option>
            <option value="Lazer">
              Lazer
            </option>
            <option value="Trabalho">
              Trabalho
            </option>
            <option value="Transporte">
              Transporte
            </option>
            <option value="Saúde">
              Saúde
            </option>
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  loading: state.wallet.loading,
});

export default connect(mapStateToProps)(WalletForm);
