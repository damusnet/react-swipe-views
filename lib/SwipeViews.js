'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

'use strict';

var SwipeViews = (function (_React$Component) {
  function SwipeViews(props) {
    _classCallCheck(this, SwipeViews);

    _get(Object.getPrototypeOf(SwipeViews.prototype), 'constructor', this).call(this, props);
    var selectedIndex = this.props.selectedIndex || 0;
    var pageWidthPerCent = 100 / this.props.children.length;
    var translation = selectedIndex * pageWidthPerCent;
    this.state = {
      selectedIndex: selectedIndex,
      pageWidthPerCent: pageWidthPerCent,
      translation: translation,
      clientX: null,
      animate: true,
      pageWidth: window.innerWidth
    };
  }

  _inherits(SwipeViews, _React$Component);

  _createClass(SwipeViews, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._selectIndex();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._selectIndex(parseInt(nextProps.selectedIndex));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var swipeViewsInkStyle = {
        width: this.state.pageWidthPerCent + '%',
        marginLeft: this.state.translation + '%',
        transitionProperty: this.state.animate ? 'all' : 'none'
      };
      var swipeViewsStyle = {
        transform: 'translateX(-' + this.state.translation + '%)',
        WebkitTransform: 'translateX(-' + this.state.translation + '%)',
        transitionProperty: this.state.animate ? 'all' : 'none',
        WebkitTransitionProperty: this.state.animate ? 'all' : 'none',
        width: this.props.children.length * 100 + '%'
      };

      return _react2['default'].createElement(
        'div',
        { className: 'SwipeViewsContainer' },
        _react2['default'].createElement(
          'header',
          { className: 'SwipeViewsHeader' },
          _react2['default'].createElement(
            'div',
            { className: 'SwipeViewsTabs' },
            _react2['default'].createElement(
              'ul',
              null,
              this.props.children.map(function (child, index) {
                var className = index === _this.state.selectedIndex ? 'active' : '';
                return _react2['default'].createElement(
                  'li',
                  {
                    key: index,
                    className: 'SwipeViewsTab ' + className,
                    onClick: _this._handleClick.bind(_this, index)
                  },
                  child.props.title
                );
              })
            ),
            _react2['default'].createElement('div', { className: 'SwipeViewsInk', style: swipeViewsInkStyle })
          )
        ),
        _react2['default'].createElement(
          'div',
          {
            className: 'SwipeViews',
            style: swipeViewsStyle,
            onTouchMove: this._handleTouchMove.bind(this),
            onTouchEnd: this._handleTouchEnd.bind(this)
          },
          this.props.children.map(function (child, index) {
            return _react2['default'].createElement(
              'div',
              {
                className: 'SwipeView',
                key: index,
                style: { width: _this.state.pageWidthPerCent + '%' },
                onScroll: _this._handleScroll.bind(_this)
              },
              child.props.children
            );
          })
        )
      );
    }
  }, {
    key: '_selectIndex',
    value: function _selectIndex(selectedIndex) {
      var _this2 = this;

      if (Number.isInteger(selectedIndex)) {
        var translation = selectedIndex * this.state.pageWidthPerCent;
        return this.setState({
          selectedIndex: selectedIndex,
          translation: translation,
          clientX: null,
          animate: true
        });
      }
      if (!this.context.router) {
        return null;
      }
      this.props.children.map(function (child, selectedIndex) {
        var to = child.props.title.props.to;
        var isActive = _this2.context.router.isActive(to);
        if (isActive) {
          var translation = selectedIndex * _this2.state.pageWidthPerCent;
          return _this2.setState({
            selectedIndex: selectedIndex,
            translation: translation,
            clientX: null,
            animate: true
          });
        }
      });
    }
  }, {
    key: '_transitionTo',
    value: function _transitionTo(selectedIndex) {
      if (this.props.onIndexChange) {
        this.props.onIndexChange(selectedIndex);
      }
      if (!this.context.router) {
        return null;
      }
      var child = this.props.children[selectedIndex];
      var to = child.props.title.props.to;
      if (!this.context.router.isActive(to)) {
        this.context.router.transitionTo(to);
      }
    }
  }, {
    key: '_handleTouchMove',
    value: function _handleTouchMove(event) {
      var clientX = event.changedTouches[0].clientX;
      var dx = clientX - this.state.clientX;
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
  }, {
    key: '_handleClick',
    value: function _handleClick(selectedIndex, event) {
      var translation = selectedIndex * this.state.pageWidthPerCent;
      this.setState({
        selectedIndex: selectedIndex,
        translation: translation,
        clientX: null,
        animate: true
      });
      if (event.target.localName === 'li') {
        this._transitionTo(selectedIndex);
      }
    }
  }, {
    key: '_handleTouchEnd',
    value: function _handleTouchEnd() {
      var selectedIndex = this.state.selectedIndex;
      var translation = selectedIndex * this.state.pageWidthPerCent;
      this.setState({
        selectedIndex: selectedIndex,
        translation: translation,
        clientX: null,
        animate: true
      }, this._transitionTo(selectedIndex));
    }
  }, {
    key: '_handleScroll',
    value: function _handleScroll() {
      var selectedIndex = this.state.selectedIndex;
      var translation = selectedIndex * this.state.pageWidthPerCent;
      this.setState({
        selectedIndex: selectedIndex,
        translation: translation,
        clientX: null,
        animate: true
      });
    }
  }]);

  return SwipeViews;
})(_react2['default'].Component);

exports['default'] = SwipeViews;

SwipeViews.contextTypes = {
  router: _react2['default'].PropTypes.func
};
module.exports = exports['default'];
