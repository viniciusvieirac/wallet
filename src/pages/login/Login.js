/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from './Login.module.css';
import image from '../../images/undraw_savings_re_eq4w.svg';
import { login } from '../../redux/actions/userActions';

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
      <div className={ style.mainLogin }>
        <div className={ style.leftLogin }>
          <img src={ image } alt="vasco" className={ style.leftImage } />
        </div>
        <div className={ style.rightLogin }>

          <form className={ style.formsContainer } onSubmit={ this.handleSubmit }>
            <div className={ style.cardLogin }>
              <div className={ style.textfield }>
                <h1>TrybeWallet</h1>
                <label htmlFor="email">Digite seu email:</label>
                <input
                  type="email"
                  id="email"
                  value={ email }
                  name="email"
                  placeholder="Email"
                  data-testid="email-input"
                  onChange={ this.handleChange }
                />
              </div>
              <div className={ style.textfield }>
                <label htmlFor="password">Digite sua senha:</label>
                <input
                  type="password"
                  value={ password }
                  name="password"
                  id="password"
                  data-testid="password-input"
                  placeholder="Senha"
                  onChange={ this.handleChange }
                />
              </div>
              <button
                className={ style.buttonLogin }
                type="submit"
                disabled={ disabledButton }
              >
                Entrar

              </button>

            </div>

          </form>
        </div>
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
