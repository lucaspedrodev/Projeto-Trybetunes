import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

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
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{guardaNome.artistName}</h2>
        <h3 data-testid="album-name">{guardaNome.collectionName}</h3>
        <div>
          {guardaMusica
            .filter((filtra) => filtra.kind)
            .map((event) => (
              <MusicCard
                key={ event.trackId }
                trackId={ event.trackId }
                trackName={ event.trackName }
                previewUrl={ event.previewUrl }
                event={ event }
              />
            ))}
        </div>
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
