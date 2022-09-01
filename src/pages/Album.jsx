import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      guardaMusica: [],
      guardaNome: {},
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

  render() {
    const { guardaMusica, guardaNome } = this.state;
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
