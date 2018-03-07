import React, { Component } from 'react';
import './item.css';
import playImage from './play.svg';

class Item extends Component {
  getTrailer = (data) => {
    if (!data.trailers || !data.trailers.length) {
      return false;
    }

    return `https://www.youtube.com/watch?v=${data.trailers[0].key}`;
  }

  render() {
    const { data, name } = this.props;
    return (
      <div
        className="Item"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        {this.getTrailer(data) &&
          <a
            href={this.getTrailer(data)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={playImage} alt={`Play trailer for ${name}`} />
          </a>
        }
      </div>
    );
  }
}

export default Item;
