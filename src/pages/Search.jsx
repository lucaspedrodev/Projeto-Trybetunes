import React, { Component } from 'react';
import Header from '../components/Header';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      artista: '',
      artistaValido: true,
      lista: [],
      guardaArtista: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
      () => {
        const dois = 2;
        const valueLength = value.length;
        if (valueLength >= dois) {
          this.setState({
            isButtonDisabled: false,
          });
        } else {
          this.setState({
            isButtonDisabled: true,
          });
        }
      },
    );
  };

  handleclick = async () => {
    const { artista } = this.state;
    this.setState({
      loading: true,
      guardaArtista: artista,
    });
    const album = await searchAlbumsAPI(artista);
    this.setState({
      artista: '',
      loading: false,
      lista: album,
    });
  };

  render() {
    const { isButtonDisabled, artista, loading, lista, guardaArtista } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <Carregando />
        ) : (
          <form>
            <input
              data-testid="search-artist-input"
              placeholder="Nome do artista/musica"
              value={ artista }
              name="artista"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
              onClick={ this.handleclick }
            >
              Pesquisar
            </button>
          </form>
        )}
        {lista.length > 0 && (
          <h3>{`Resultado de álbuns de: ${guardaArtista}`}</h3>
        )}
        <ul>
          {lista.map((album) => (
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
              key={ album.releaseDate }
            >
              <li>
                <img src={ album.artworkUrl100 } alt={ album.artistName } />
                <h2>{album.artistName}</h2>
                <p>{album.collectionName}</p>
              </li>
            </Link>
          ))}
          {lista.length === 0 && !artista && <p>Nenhum álbum foi encontrado</p>}
        </ul>
      </div>
    );
  }
}

export default Search;
