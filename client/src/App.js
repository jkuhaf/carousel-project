import React, { Component } from 'react';
import Carousel from './components/Carousel/Carousel';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { currentPage: 1, items: [] };
  }

  componentDidMount() {
    this.callApi()
      .then(response => this.setState({
        items: response,
        currentPage: this.state.currentPage + 1,
      }))
      .catch(error => console.log(error));
  }

  callApi = async(page = 1, amount = 16) => {
    const response = await fetch(`/items?page=${page}&amt=${amount}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  render() {
    return (
      <main className="App">
        {!this.state.items.length ?
          <h3 className="loading-message">Loading&hellip;</h3> : ''
        }
        <Carousel
          callback={this.callApi}
          items={this.state.items}
        />
      </main>
    );
  }
}

export default App;
