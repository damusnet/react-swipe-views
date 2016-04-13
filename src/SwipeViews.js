import React from 'react';

Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" && 
    isFinite(value) && 
    Math.floor(value) === value;
};

export default class SwipeViews extends React.Component {

  constructor(props) {
    super(props);
    const selectedIndex = this.props.selectedIndex || 0;
    const numChildren = React.Children.count(this.props.children)
    const pageWidthPerCent = 100 / numChildren;
    const translation = selectedIndex * pageWidthPerCent;
    this.state = {
      selectedIndex,
      pageWidthPerCent,
      translation,
      clientX: null,
      animate: true,
      pageWidth: window.innerWidth,
    };
  }

  componentDidMount() {
    this._selectIndex();
  }

  componentWillReceiveProps(nextProps) {
    this._selectIndex(parseInt(nextProps.selectedIndex, 10));
  }

  render() {
    const swipeViewsInkStyle = {
      width: this.state.pageWidthPerCent + '%',
      marginLeft: this.state.translation + '%',
      transitionProperty: this.state.animate ? 'all' : 'none',
    };
    const swipeViewsStyle = {
      transform: 'translateX(-' + this.state.translation + '%)',
      WebkitTransform: 'translateX(-' + this.state.translation + '%)',
      transitionProperty: this.state.animate ? 'all' : 'none',
      WebkitTransitionProperty: this.state.animate ? 'all' : 'none',
      width: React.Children.count(this.props.children) * 100 + '%',
    };

    return (
      <div className="SwipeViewsContainer">
        <header className="SwipeViewsHeader">
          <div className="SwipeViewsTabs">
            <ul>
              {React.Children.map(this.props.children, (child, index) => {
                const className = (index === this.state.selectedIndex ? 'active' : '');
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
          {React.Children.map(this.props.children, (child, index) => {
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

  _selectIndex(selectedIndex) {
    if (Number.isInteger(selectedIndex)) {
      const translation = selectedIndex * this.state.pageWidthPerCent;
      return this.setState({
        selectedIndex,
        translation,
        clientX: null,
        animate: true,
      });
    }
    if (!this.context.router) {
      return null;
    }
    React.Children.map(this.props.children, (child, index) => {
      const to = child.props.title.props.to;
      const isActive = this.context.router.isActive(to);
      if (isActive) {
        const translation = index * this.state.pageWidthPerCent;
        return this.setState({
          selectedIndex: index,
          translation,
          clientX: null,
          animate: true,
        });
      }
    });
  }

  _transitionTo(selectedIndex) {
    if (this.props.onIndexChange) {
      this.props.onIndexChange(selectedIndex);
    }
    if (!this.context.router) {
      return null;
    }
    const child = React.Children.map(this.props.children, child => child)[selectedIndex];
    const to = child.props.title.props.to;
    if (!this.context.router.isActive(to)) {
      this.context.router.transitionTo(to);
    }
  }

  _handleTouchMove(event) {
    const clientX = event.changedTouches[0].clientX;
    const dx = (clientX - this.state.clientX);
    const numChildren = React.Children.count(this.props.children)
    const dxPerCent = dx / (this.state.pageWidth * numChildren) * 100;
    let translation = this.state.translation - dxPerCent;
    const maxTranslation = this.state.pageWidthPerCent * (numChildren - 1);
    let selectedIndex = this.state.selectedIndex;
    const previousTranslation = selectedIndex * this.state.pageWidthPerCent;
    const tippingPoint = this.state.pageWidthPerCent * 0.3;

    if (!this.state.clientX) {
      return this.setState({
        clientX,
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
      selectedIndex,
      translation,
      clientX,
      animate: false,
    });
  }

  _handleClick(selectedIndex, event) {
    const translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex,
      translation,
      clientX: null,
      animate: true,
    });
    if (event.target.localName === 'li') {
      this._transitionTo(selectedIndex);
    }
  }

  _handleTouchEnd() {
    const selectedIndex = this.state.selectedIndex;
    const translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex,
      translation,
      clientX: null,
      animate: true,
    }, this._transitionTo(selectedIndex));
  }

  _handleScroll() {
    const selectedIndex = this.state.selectedIndex;
    const translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex,
      translation,
      clientX: null,
      animate: true,
    });
  }

}

SwipeViews.contextTypes = {
  router: React.PropTypes.func,
};

SwipeViews.propTypes = {
  children: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
  onIndexChange: React.PropTypes.func,
};
