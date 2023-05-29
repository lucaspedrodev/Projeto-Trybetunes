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

  async componentDidMount() {
    this.pegaUsuario();
    const data = await getUser();
    this.setState({
      nameValue: data.name,
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
        {loading ? <Carregando /> : (
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
        )}

      </div>
    );
  }
}

export default Header;
