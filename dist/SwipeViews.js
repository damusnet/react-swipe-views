(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SwipeViews = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
'use strict';

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

      return React.createElement(
        'div',
        { className: 'SwipeViewsContainer' },
        React.createElement(
          'header',
          { className: 'SwipeViewsHeader' },
          React.createElement(
            'div',
            { className: 'SwipeViewsTabs' },
            React.createElement(
              'ul',
              null,
              this.props.children.map(function (child, index) {
                var className = index === _this.state.selectedIndex ? 'active' : '';
                return React.createElement(
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
            React.createElement('div', { className: 'SwipeViewsInk', style: swipeViewsInkStyle })
          )
        ),
        React.createElement(
          'div',
          {
            className: 'SwipeViews',
            style: swipeViewsStyle,
            onTouchMove: this._handleTouchMove.bind(this),
            onTouchEnd: this._handleTouchEnd.bind(this)
          },
          this.props.children.map(function (child, index) {
            return React.createElement(
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
      var selectedIndex = this.state.selectedIndex;
      var translation = selectedIndex * this.state.pageWidthPerCent;
      this.setState({
        selectedIndex: selectedIndex,
        translation: translation,
        clientX: null,
        animate: true
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
})(React.Component);

exports['default'] = SwipeViews;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGFtaWVuL1NpdGVzL3JlYWN0LXN3aXBlLXZpZXdzL3NyYy9Td2lwZVZpZXdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztBQ0FBLFlBQVksQ0FBQzs7SUFFUSxVQUFVO0FBRWxCLFdBRlEsVUFBVSxDQUVqQixLQUFLLEVBQUU7MEJBRkEsVUFBVTs7QUFHM0IsK0JBSGlCLFVBQVUsNkNBR3JCLEtBQUssRUFBRTtBQUNiLFFBQUksQ0FBQyxLQUFLLEdBQUc7QUFDWCxtQkFBYSxFQUFFLENBQUM7QUFDaEIsaUJBQVcsRUFBRSxDQUFDO0FBQ2QsYUFBTyxFQUFFLElBQUk7QUFDYixhQUFPLEVBQUUsSUFBSTtBQUNiLGVBQVMsRUFBRSxNQUFNLENBQUMsVUFBVTtBQUM1QixzQkFBZ0IsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTTtLQUNuRCxDQUFDO0dBQ0g7O1lBWmtCLFVBQVU7O2VBQVYsVUFBVTs7V0FjdkIsa0JBQUc7OztBQUNQLFVBQU0sa0JBQWtCLEdBQUc7QUFDekIsYUFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsR0FBRztBQUN4QyxrQkFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEdBQUc7QUFDeEMsMEJBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLE1BQU07T0FDeEQsQ0FBQztBQUNGLFVBQU0sZUFBZSxHQUFHO0FBQ3RCLGlCQUFTLEVBQUUsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUk7QUFDekQsMEJBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLE1BQU07QUFDdkQs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RUFBRSxXQUFXO0FBQ3hCLGVBQU8sRUFBRSxJQUFJO0FBQ2IsZUFBTyxFQUFFLElBQUk7T0FDZCxDQUFDLENBQUM7S0FDSjs7O1dBRVkseUJBQUc7QUFDZCxVQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztBQUM3QyxVQUFJLFdBQVcsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztBQUM5RCxVQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1oscUJBQWEsRUFBRSxhQUFhO0FBQzVCLG1CQUFXLEVBQUUsV0FBVztBQUN4QixlQUFPLEVBQUUsSUFBSTtBQUNiLGVBQU8sRUFBRSxJQUFJO09BQ2QsQ0FBQyxDQUFDO0tBQ0o7OztTQXhJa0IsVUFBVTtHQUFTLEtBQUssQ0FBQyxTQUFTOztxQkFBbEMsVUFBVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN3aXBlVmlld3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZEluZGV4OiAwLFxuICAgICAgdHJhbnNsYXRpb246IDAsXG4gICAgICBjbGllbnRYOiBudWxsLFxuICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgIHBhZ2VXaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICBwYWdlV2lkdGhQZXJDZW50OiAxMDAgLyB0aGlzLnByb3BzLmNoaWxkcmVuLmxlbmd0aFxuICAgIH07XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc3dpcGVWaWV3c0lua1N0eWxlID0ge1xuICAgICAgd2lkdGg6IHRoaXMuc3RhdGUucGFnZVdpZHRoUGVyQ2VudCArICclJyxcbiAgICAgIG1hcmdpbkxlZnQ6IHRoaXMuc3RhdGUudHJhbnNsYXRpb24gKyAnJScsXG4gICAgICB0cmFuc2l0aW9uUHJvcGVydHk6IHRoaXMuc3RhdGUuYW5pbWF0ZSA/ICdhbGwnIDogJ25vbmUnXG4gICAgfTtcbiAgICBjb25zdCBzd2lwZVZpZXdzU3R5bGUgPSB7XG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC0nICsgdGhpcy5zdGF0ZS50cmFuc2xhdGlvbiArICclKScsXG4gICAgICB0cmFuc2l0aW9uUHJvcGVydHk6IHRoaXMuc3RhdGUuYW5pbWF0ZSA/ICdhbGwnIDogJ25vbmUnLFxuICAgICAgd2lkdGg6IHRoaXMucHJvcHMuY2hpbGRyZW4ubGVuZ3RoICogMTAwICsgJyUnXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN3aXBlVmlld3NDb250YWluZXJcIj5cbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJTd2lwZVZpZXdzSGVhZGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTd2lwZVZpZXdzVGFic1wiPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbi5tYXAoKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSAoaW5kZXggPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRJbmRleCA/ICdhY3RpdmUnIDogJycpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnU3dpcGVWaWV3c1RhYiAnICsgY2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9oYW5kbGVDbGljay5iaW5kKHRoaXMsIGluZGV4KX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2NoaWxkLnByb3BzLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN3aXBlVmlld3NJbmtcIiBzdHlsZT17c3dpcGVWaWV3c0lua1N0eWxlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cIlN3aXBlVmlld3NcIlxuICAgICAgICAgIHN0eWxlPXtzd2lwZVZpZXdzU3R5bGV9XG4gICAgICAgICAgb25Ub3VjaE1vdmU9e3RoaXMuX2hhbmRsZVRvdWNoTW92ZS5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uVG91Y2hFbmQ9e3RoaXMuX2hhbmRsZVRvdWNoRW5kLmJpbmQodGhpcyl9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbi5tYXAoKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIlN3aXBlVmlld1wiXG4gICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOiB0aGlzLnN0YXRlLnBhZ2VXaWR0aFBlckNlbnQgKyAnJSd9fVxuICAgICAgICAgICAgICAgIG9uU2Nyb2xsPXt0aGlzLl9oYW5kbGVTY3JvbGwuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjaGlsZC5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBfaGFuZGxlVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgdmFyIGNsaWVudFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xuICAgIHZhciBkeCA9IChjbGllbnRYIC0gdGhpcy5zdGF0ZS5jbGllbnRYKTtcbiAgICB2YXIgZHhQZXJDZW50ID0gZHggLyAodGhpcy5zdGF0ZS5wYWdlV2lkdGggKiB0aGlzLnByb3BzLmNoaWxkcmVuLmxlbmd0aCkgKiAxMDA7XG4gICAgdmFyIHRyYW5zbGF0aW9uID0gdGhpcy5zdGF0ZS50cmFuc2xhdGlvbiAtIGR4UGVyQ2VudDtcbiAgICB2YXIgbWF4VHJhbnNsYXRpb24gPSB0aGlzLnN0YXRlLnBhZ2VXaWR0aFBlckNlbnQgKiAodGhpcy5wcm9wcy5jaGlsZHJlbi5sZW5ndGggLSAxKTtcbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRJbmRleDtcbiAgICB2YXIgcHJldmlvdXNUcmFuc2xhdGlvbiA9IHNlbGVjdGVkSW5kZXggKiB0aGlzLnN0YXRlLnBhZ2VXaWR0aFBlckNlbnQ7XG4gICAgdmFyIHRpcHBpbmdQb2ludCA9IHRoaXMuc3RhdGUucGFnZVdpZHRoUGVyQ2VudCAqIDAuMztcblxuICAgIGlmICghdGhpcy5zdGF0ZS5jbGllbnRYKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNsaWVudFg6IGNsaWVudFhcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0cmFuc2xhdGlvbiA8IDApIHtcbiAgICAgIHRyYW5zbGF0aW9uID0gMDtcbiAgICB9IGVsc2UgaWYgKHRyYW5zbGF0aW9uID4gbWF4VHJhbnNsYXRpb24pIHtcbiAgICAgIHRyYW5zbGF0aW9uID0gbWF4VHJhbnNsYXRpb247XG4gICAgfVxuXG4gICAgaWYgKGR4ID4gMCAmJiB0cmFuc2xhdGlvbiA8IHByZXZpb3VzVHJhbnNsYXRpb24gLSB0aXBwaW5nUG9pbnQpIHtcbiAgICAgIHNlbGVjdGVkSW5kZXggLT0gMTtcbiAgICB9IGVsc2UgaWYgKGR4IDwgMCAmJiB0cmFuc2xhdGlvbiA+IHByZXZpb3VzVHJhbnNsYXRpb24gKyB0aXBwaW5nUG9pbnQpIHtcbiAgICAgIHNlbGVjdGVkSW5kZXggKz0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkSW5kZXg6IHNlbGVjdGVkSW5kZXgsXG4gICAgICB0cmFuc2xhdGlvbjogdHJhbnNsYXRpb24sXG4gICAgICBjbGllbnRYOiBjbGllbnRYLFxuICAgICAgYW5pbWF0ZTogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIF9oYW5kbGVDbGljayhzZWxlY3RlZEluZGV4KSB7XG4gICAgdmFyIHRyYW5zbGF0aW9uID0gc2VsZWN0ZWRJbmRleCAqIHRoaXMuc3RhdGUucGFnZVdpZHRoUGVyQ2VudDtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkSW5kZXg6IHNlbGVjdGVkSW5kZXgsXG4gICAgICB0cmFuc2xhdGlvbjogdHJhbnNsYXRpb24sXG4gICAgICBjbGllbnRYOiBudWxsLFxuICAgICAgYW5pbWF0ZTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgX2hhbmRsZVRvdWNoRW5kKCkge1xuICAgIHZhciBzZWxlY3RlZEluZGV4ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEluZGV4O1xuICAgIHZhciB0cmFuc2xhdGlvbiA9IHNlbGVjdGVkSW5kZXggKiB0aGlzLnN0YXRlLnBhZ2VXaWR0aFBlckNlbnQ7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZEluZGV4OiBzZWxlY3RlZEluZGV4LFxuICAgICAgdHJhbnNsYXRpb246IHRyYW5zbGF0aW9uLFxuICAgICAgY2xpZW50WDogbnVsbCxcbiAgICAgIGFuaW1hdGU6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIF9oYW5kbGVTY3JvbGwoKSB7XG4gICAgdmFyIHNlbGVjdGVkSW5kZXggPSB0aGlzLnN0YXRlLnNlbGVjdGVkSW5kZXg7XG4gICAgdmFyIHRyYW5zbGF0aW9uID0gc2VsZWN0ZWRJbmRleCAqIHRoaXMuc3RhdGUucGFnZVdpZHRoUGVyQ2VudDtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGVkSW5kZXg6IHNlbGVjdGVkSW5kZXgsXG4gICAgICB0cmFuc2xhdGlvbjogdHJhbnNsYXRpb24sXG4gICAgICBjbGllbnRYOiBudWxsLFxuICAgICAgYW5pbWF0ZTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==
