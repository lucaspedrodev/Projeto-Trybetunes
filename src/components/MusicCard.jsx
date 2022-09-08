import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checado: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.favoritadas();
  }

  favoritadas = async () => {
    const { trackId } = this.props;
    const favorite = await getFavoriteSongs();
    this.setState({
      checado: favorite.filter((e) => trackId === e.trackId).length !== 0,
    });
  };

  handleClick = async () => {
    const { checado } = this.state;
    const { event } = this.props;
    this.setState({
      loading: true,
      checado: !checado,
    });
    await addSong(event);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    console.log(trackId);
    const { checado, loading } = this.state;
    return (
      <div>
        <ul>
          {loading && <Carregando />}
          <li key={ trackName }>
            {trackName}
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>
            <label htmlFor="Favoritas">
              Favorita
              <input
                type="checkbox"
                onChange={ () => this.handleClick(trackId) }
                data-testid={ `checkbox-music-${trackId}` }
                checked={ checado }
              />
            </label>
          </li>
        </ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
};

export default MusicCard;
