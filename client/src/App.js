import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import Carousel from './components/Carousel/Carousel';
import './App.css';

const ITEMS_PER_PAGE = 4;

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      items: [],
      futureItems: [],
    };
  }

  getItems = async(page = 1, amount = 16) => {
    const response = await fetch(`/items?page=${page}&amt=${amount}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  rateItem = async(id) => {
    const response = await fetch(`/items/${id}`, {
      body: {
        rating: 'like' || null
      },
      method: 'POST',
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    this.replaceItem(id);
  }

  replaceItem = async(id) => {
    let futureItems;
    let currentPage;

    if (!this.state.futureItems.length) {
      futureItems = await this.getItems(this.state.currentPage);
      currentPage = this.state.currentPage + 1;
    } else {
      futureItems = this.state.futureItems;
      currentPage = this.state.currentPage;
    }

    const newItem = futureItems.shift();
    const filteredItemList = flatten(this.state.items).filter(item => item.uuid !== id);
    const updatedItemList = [ ...filteredItemList, newItem ];

    this.setState({
      futureItems,
      items: chunk(updatedItemList, ITEMS_PER_PAGE),
      currentPage,
    });
  }

  async componentDidMount() {
    const items = await this.getItems();
    this.setState({
      items: chunk(items, ITEMS_PER_PAGE),
      currentPage: this.state.currentPage + 1
    });
  }

  render() {
    return (
      <main className="App">
        {!this.state.items.length ?
          <h3 className="loading-message">Loading&hellip;</h3> : ''
        }
        <Carousel
          rateItem={this.rateItem}
          items={this.state.items}
        />
      </main>
    );
  }
}

export default App;
