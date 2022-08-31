import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search"> Procurar </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favoritos </Link>
        <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        <p>olá</p>
        <p data-testid="header-user-name">
          { nameValue }
        </p>
        {loading && <Carregando />}
      </header>
    );
  }
}

export default Header;
