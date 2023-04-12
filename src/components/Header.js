import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log(expenses);
    const totalField = expenses.reduce((acc, curr) => {
      acc += Number(curr.value) * Number(curr.exchangeRates[curr.currencie].ask);
      return acc;
    }, 0);
    return (
      <div>
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
