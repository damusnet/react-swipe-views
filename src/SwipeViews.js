'use strict';

import React from 'react';

export default class SwipeViews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      translation: 0,
      clientX: null,
      animate: true,
      pageWidth: window.innerWidth,
      pageWidthPerCent: 100 / this.props.children.length
    };
  }

  render() {
    const swipeViewsInkStyle = {
      width: this.state.pageWidthPerCent + '%',
      marginLeft: this.state.translation + '%',
      transitionProperty: this.state.animate ? 'all' : 'none'
    };
    const swipeViewsStyle = {
      transform: 'translateX(-' + this.state.translation + '%)',
      transitionProperty: this.state.animate ? 'all' : 'none',
      width: this.props.children.length * 100 + '%'
    };

    return (
      <div className="SwipeViewsContainer">
        <header className="SwipeViewsHeader">
          <div className="SwipeViewsTabs">
            <ul>
              {this.props.children.map((child, index) => {
                let className = (index === this.state.selectedIndex ? 'active' : '');
                return (
                  <li
                    key={index}
                    className={'SwipeViewsTab ' + className}
                    onClick={this._handleClick.bind(this, index)}
                  >
                    {child.props.title}
                  </li>
                );
              })}
            </ul>
            <div className="SwipeViewsInk" style={swipeViewsInkStyle} />
          </div>
        </header>
        <div
          className="SwipeViews"
          style={swipeViewsStyle}
          onTouchMove={this._handleTouchMove.bind(this)}
          onTouchEnd={this._handleTouchEnd.bind(this)}
        >
          {this.props.children.map((child, index) => {
            return (
              <div
                className="SwipeView"
                key={index}
                style={{width: this.state.pageWidthPerCent + '%'}}
                onScroll={this._handleScroll.bind(this)}
              >
                {child.props.children}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  _handleTouchMove(event) {
    var clientX = event.changedTouches[0].clientX;
    var dx = (clientX - this.state.clientX);
    var dxPerCent = dx / (this.state.pageWidth * this.props.children.length) * 100;
    var translation = this.state.translation - dxPerCent;
    var maxTranslation = this.state.pageWidthPerCent * (this.props.children.length - 1);
    var selectedIndex = this.state.selectedIndex;
    var previousTranslation = selectedIndex * this.state.pageWidthPerCent;
    var tippingPoint = this.state.pageWidthPerCent * 0.3;

    if (!this.state.clientX) {
      return this.setState({
        clientX: clientX
      });
    }

    if (translation < 0) {
      translation = 0;
    } else if (translation > maxTranslation) {
      translation = maxTranslation;
    }

    if (dx > 0 && translation < previousTranslation - tippingPoint) {
      selectedIndex -= 1;
    } else if (dx < 0 && translation > previousTranslation + tippingPoint) {
      selectedIndex += 1;
    }

    this.setState({
      selectedIndex: selectedIndex,
      translation: translation,
      clientX: clientX,
      animate: false
    });
  }

  _handleClick(selectedIndex) {
    var translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex: selectedIndex,
      translation: translation,
      clientX: null,
      animate: true
    });
  }

  _handleTouchEnd() {
    var selectedIndex = this.state.selectedIndex;
    var translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex: selectedIndex,
      translation: translation,
      clientX: null,
      animate: true
    });
  }

  _handleScroll() {
    var selectedIndex = this.state.selectedIndex;
    var translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex: selectedIndex,
      translation: translation,
      clientX: null,
      animate: true
    });
  }

}
