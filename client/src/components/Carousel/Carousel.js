import React, { Component } from 'react';
import Item from './../Item/Item';
import './carousel.css';
import chunk from 'lodash/chunk';

const ITEMS_PER_PAGE = 4;

class Carousel extends Component {
  constructor() {
    super();

    this.state = {
      availablePages: [],
      activePage: [],
      currentIndex: 0,
      maxIndex: null
    };
  }

  setInitialView = (items) => {
    const availablePages = chunk(items, ITEMS_PER_PAGE);
    const maxIndex = availablePages.length;

    this.setState({
      activePage: availablePages[this.state.currentIndex],
      availablePages,
      maxIndex,
    })
  }

  handleNavigation = (event) => {
    if (event.target.className === 'nav-next') {
      this.showNextPage();
    } else if (event.target.className === 'nav-before') {
      this.showPreviousPage();
    }
  }

  showNextPage = () => {
    let { availablePages, currentIndex } = this.state;

    if (currentIndex === availablePages.length - 1) {
      currentIndex = 0;
      this.setState({
        currentIndex,
        activePage: availablePages[currentIndex],
      })
      return;
    }

    currentIndex = currentIndex + 1;
    this.setState({
      currentIndex,
      activePage: availablePages[currentIndex],
    });
  }

  showPreviousPage = () => {
    let { availablePages, currentIndex } = this.state;

    if (currentIndex === 0) {
      currentIndex = availablePages.length - 1;
      this.setState({
        currentIndex,
        activePage: availablePages[currentIndex],
      })
      return;
    }

    currentIndex = currentIndex - 1;
    this.setState({
      currentIndex,
      activePage: availablePages[currentIndex],
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.availablePages.length) {
      this.setInitialView(nextProps.items);
    }
  }

  render() {
    const { activePage } = this.state;
    return (
      <section className="Carousel-container-outer">
        <button className="nav-before" onClick={this.handleNavigation} />
        {!!activePage.length &&
          <div className="Carousel-container-inner">
            <header>
              <h1>Top recommendations for you</h1>
              <div className="Carousel-breadcrumbs"></div>
            </header>
            <div className="content">
              {activePage.map(
                item => <Item key={item.uuid} data={item.itemData} name={item.name} />
              )}
            </div>
          </div>
        }
        <button className="nav-next" onClick={this.handleNavigation} />
      </section>
    );
  }
}

export default Carousel;
