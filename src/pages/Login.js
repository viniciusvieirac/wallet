import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions/userActions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabledButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validadeForm);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    dispatch(login(this.state));
    history.push('/carteira');
  };

  validadeForm = () => {
    const SIX = 6;
    const { email, password } = this.state;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (emailRegex.test(email) && password.length >= SIX) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  };

  render() {
    const { email, password, disabledButton } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <div>
            <input
              type="email"
              value={ email }
              name="email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
            <input
              type="password"
              value={ password }
              name="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <button type="submit" disabled={ disabledButton }>Entrar</button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
