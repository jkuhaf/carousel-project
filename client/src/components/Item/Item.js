import React, { Component } from 'react';
import './item.css';
import playImage from './play.svg';
import photoImage from './photo.svg';

class Item extends Component {
  getTrailer = (data) => {
    try {
      const key = data.trailers ? data.trailers[0].key : data.youtubeVideos[0].key;
      return `https://www.youtube.com/watch?v=${key}`;
    } catch(error) {
      return false;
    }
  }

  handleFavorite = () => {
    const { rateItem, id } = this.props;
    rateItem && rateItem(id);
  }

  render() {
    const { data, name } = this.props;
    return (
      <div className="Item-container">
        <div
          className="Item"
          style={{ backgroundImage: `url(${data.image || photoImage})` }}
        >
          {this.getTrailer(data) &&
            <a
              href={this.getTrailer(data)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={playImage} alt={`Play video for ${name}`} />
            </a>
          }
          <button className="favorite" onClick={this.handleFavorite} />
        </div>
        <div className="Item-details">
          <h2>{name}</h2>
          <h3>{data.definingInfo}</h3>
        </div>
      </div>
    );
  }
}

export default Item;
