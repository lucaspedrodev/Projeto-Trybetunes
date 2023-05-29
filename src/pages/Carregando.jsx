import React, { Component } from 'react';
import './carregando.css';

class Carregando extends Component {
  render() {
    return (
      <div className="loader">
        <span>
          <div className="bar bar1" />
          <div className="bar bar2" />
          <div className="bar bar3" />
          <div className="bar bar4" />
          <div className="bar bar5" />
          <div className="bar bar6" />
          <div className="bar bar7" />
          <div className="bar bar8" />

        </span>
      </div>
    );
  }
}

export default Carregando;
