import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './Header.module.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalField = expenses.reduce((acc, curr) => {
      acc += Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask);
      return acc;
    }, 0);
    return (
      <div className={ style.headerMain }>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ totalField.toFixed(2)}</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
