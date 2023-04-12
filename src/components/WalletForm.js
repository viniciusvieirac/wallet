import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseThunk } from '../redux/actions/expensesActions';
import { getWallet } from '../redux/actions/walletActions';

class WalletForm extends Component {
  state = {
    inputValue: '',
    inputDescription: '',
    inputCurrencie: 'USD',
    inputMethod: 'Dinheiro',
    inputCategory: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getWallet());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const {
      inputValue,
      inputDescription,
      inputCurrencie,
      inputMethod,
      inputCategory } = this.state;
    const expenses = {
      value: inputValue,
      description: inputDescription,
      currencie: inputCurrencie,
      method: inputMethod,
      category: inputCategory,
    };
    dispatch(expenseThunk(expenses));
    this.setState({
      inputValue: '',
      inputDescription: '',
    });
  };

  render() {
    const { currencies, loading } = this.props;

    const { inputValue,
      inputDescription,
      inputCurrencie,
      inputMethod,
      inputCategory } = this.state;

    if (loading) return '';
    return (
      <div>
        <form>
          <input
            type="number"
            value={ inputValue }
            name="inputValue"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
          <input
            type="inputDescription"
            value={ inputDescription }
            name="inputDescription"
            data-testid="description-input"
            onChange={ this.handleChange }

          />
          <select
            name="inputCurrencie"
            value={ inputCurrencie }
            data-testid="currency-input"
            onChange={ this.handleChange }

          >
            {currencies.map((currency, index) => (
              <option key={ index }>{currency}</option>
            ))}
          </select>
          <select
            name="inputMethod"
            value={ inputMethod }
            data-testid="method-input"
            onChange={ this.handleChange }

          >
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
          <select
            name="inputCategory"
            value={ inputCategory }
            data-testid="tag-input"
            onChange={ this.handleChange }

          >
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
          <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
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
