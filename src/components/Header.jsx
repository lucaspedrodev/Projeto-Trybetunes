import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      nameValue: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.pegaUsuario();
    this.setState({
      nameValue: localStorage.getItem('user'),
    });
  }

  pegaUsuario = async () => {
    await getUser();
    this.setState({
      loading: false,
    });
  };

  render() {
    const { nameValue, loading } = this.state;
    return (
      <div>
        <header data-testid="header-component" />
        <p>olá</p>
        <p data-testid="header-user-name">
          { nameValue }
        </p>
        {loading && <Carregando />}
      </div>
    );
  }
}

export default Header;
