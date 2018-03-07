import React, { Component } from 'react';
import Item from './../Item/Item';
import './carousel.css';

class Carousel extends Component {
  constructor(props) {
    super();

    this.state = {
      activePage: [],
      currentIndex: 0,
      maxIndex: null
    };
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

  rateItem = (id) => {
    this.props.rateItem && this.props.rateItem(id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activePage: nextProps.items[this.state.currentIndex],
      availablePages: nextProps.items,
      maxIndex: nextProps.items.length,
    });
  }

  render() {
    const { activePage, availablePages, currentIndex } = this.state;
    return (
      <section className="Carousel-container-outer">
        <button className="nav-before" onClick={this.handleNavigation} />
        {!!this.state.activePage.length &&
          <div className="Carousel-container-inner">
            <header>
              <h1>Top recommendations for you</h1>
              <div className="Carousel-breadcrumbs">
                <div className="breadcrumb-container">
                  {availablePages.map((page, index) =>
                    <span key={index} className={index === currentIndex ? 'active' : null}/>)
                  }
                </div>
              </div>
            </header>
            <div className="content">
              {activePage.map(item =>
                <Item
                  key={item.uuid}
                  data={item.itemData}
                  name={item.name}
                  id={item.uuid}
                  rateItem={this.props.rateItem} />
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
