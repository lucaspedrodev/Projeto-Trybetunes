import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      guardaMusica: [],
      guardaNome: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.reqMusic();
  }

  reqMusic = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const separaMusic = await getMusics(id);
    this.setState({
      guardaMusica: separaMusic,
    });
    const nome = separaMusic[0];
    this.setState({
      guardaNome: nome,
    });
  };

  handleClick = async (trackID) => {
    this.setState({
      loading: true,
    });
    await addSong(trackID);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { guardaMusica, guardaNome, loading } = this.state;
    console.log(guardaMusica);
    return (
      <div data-testid="page-album">
        <Header />
        <h2
          data-testid="artist-name"
        >
          { guardaNome.artistName }
        </h2>
        <h3
          data-testid="album-name"
        >
          { guardaNome.collectionName }
        </h3>
        <ul>
          {loading && <Carregando />}
          {guardaMusica.map((music) => (
            music.kind && (
              <li
                key={ music.trackName }
              >
                { music.trackName }
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  <code>audio</code>
                </audio>
                <label htmlFor="Favoritas">
                  Favorita
                  <input
                    type="checkbox"
                    onClick={ () => this.handleClick(music.trackID) }
                    data-testid={ `checkbox-music-${music.trackId}` }
                  />
                </label>
              </li>
            )))}
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default Album;
