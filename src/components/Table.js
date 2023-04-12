import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions/expensesActions';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <div>
          <tr>

            <th> Descrição </th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>

          {expenses?.map((exp) => {
            const {
              id,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates } = exp;
            const exchange = Number(exchangeRates[currency].ask);
            const valueConverted = Number(value) * exchange;
            const { name } = exchangeRates[currency];
            return (

              <tbody key={ id }>
                <tr>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{name}</td>
                  <td>{exchange.toFixed(2)}</td>
                  <td>{valueConverted.toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleClick(id) }
                    >
                      Excluir
                    </button>

                  </td>
                </tr>

              </tbody>

            );
          })}
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
