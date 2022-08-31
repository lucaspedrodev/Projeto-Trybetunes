import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class login extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      inputValue: '',
      loading: false,
    };
  }

  // history push

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      const tres = 3;
      const valueLength = value.length;
      if (valueLength >= tres) {
        this.setState({
          isButtonDisabled: false,
        });
      } else {
        this.setState({
          isButtonDisabled: true,
        });
      }
    });
  };

  handleclick = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { inputValue } = this.state;
      await createUser({ name: inputValue });
      this.setState({ loading: false });
    });
  };

  render() {
    const { isButtonDisabled, loading, inputValue } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Nome:
            <input
              value={ inputValue }
              name="inputValue"
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleclick }
          >
            Entrar
          </button>
          {loading ? <Carregando /> && (<Redirect to="/search" />) : !loading}
          {loading && <Carregando /> }
          {(!loading && isButtonDisabled) && (<Redirect to="/search" />)}
        </form>
      </div>
    );
  }
}

export default login;
