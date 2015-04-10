(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'react'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.React);
    global.SwipeViews = mod.exports;
  }
})(this, function (exports, module, _react) {
  'use strict';

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _React = _interopRequire(_react);

  var SwipeViews = (function (_React$Component) {
    function SwipeViews(props) {
      _classCallCheck(this, SwipeViews);

      _get(Object.getPrototypeOf(SwipeViews.prototype), 'constructor', this).call(this, props);
      this.state = {
        selectedIndex: 0,
        translation: 0,
        clientX: null,
        animate: true,
        pageWidth: window.innerWidth,
        pageWidthPerCent: 100 / this.props.children.length
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
      value: function componentWillReceiveProps() {
        this._selectIndex();
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
          transitionProperty: this.state.animate ? 'all' : 'none',
          width: this.props.children.length * 100 + '%'
        };

        return _React.createElement(
          'div',
          { className: 'SwipeViewsContainer' },
          _React.createElement(
            'header',
            { className: 'SwipeViewsHeader' },
            _React.createElement(
              'div',
              { className: 'SwipeViewsTabs' },
              _React.createElement(
                'ul',
                null,
                this.props.children.map(function (child, index) {
                  var className = index === _this.state.selectedIndex ? 'active' : '';
                  return _React.createElement(
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
              _React.createElement('div', { className: 'SwipeViewsInk', style: swipeViewsInkStyle })
            )
          ),
          _React.createElement(
            'div',
            {
              className: 'SwipeViews',
              style: swipeViewsStyle,
              onTouchMove: this._handleTouchMove.bind(this),
              onTouchEnd: this._handleTouchEnd.bind(this)
            },
            this.props.children.map(function (child, index) {
              return _React.createElement(
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
      value: function _selectIndex() {
        var _this2 = this;

        if (!this.context.router) {
          return null;
        }
        this.props.children.map(function (child, index) {
          var to = child.props.title.props.to;
          var isActive = _this2.context.router.isActive(to);
          if (isActive) {
            var translation = index * _this2.state.pageWidthPerCent;
            _this2.setState({
              selectedIndex: index,
              translation: translation,
              clientX: null,
              animate: true
            });
          }
        });
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
      value: function _handleClick(selectedIndex) {
        var translation = selectedIndex * this.state.pageWidthPerCent;
        this.setState({
          selectedIndex: selectedIndex,
          translation: translation,
          clientX: null,
          animate: true
        });
      }
    }, {
      key: '_handleTouchEnd',
      value: function _handleTouchEnd() {
        var _this3 = this;

        var selectedIndex = this.state.selectedIndex;
        var translation = selectedIndex * this.state.pageWidthPerCent;
        this.setState({
          selectedIndex: selectedIndex,
          translation: translation,
          clientX: null,
          animate: true
        }, function () {
          if (_this3.context.router) {
            var child = _this3.props.children[selectedIndex];
            var to = child.props.title.props.to;
            _this3.context.router.transitionTo(to);
          }
        });
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
  })(_React.Component);

  module.exports = SwipeViews;

  SwipeViews.contextTypes = {
    router: _React.PropTypes.func
  };
});
