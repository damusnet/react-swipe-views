'use strict';

import React from 'react';

function loadGist(element, gistId) {
  var callbackName = 'gist_callback';
  window[callbackName] = function (gistData) {
      delete window[callbackName];
      var html = '<link rel="stylesheet" href="' + gistData.stylesheet + '"></link>';
      html += gistData.div;
      element.innerHTML = html;
  };
  var script = document.createElement('script');
  script.setAttribute('src', 'https://gist.github.com/' + gistId + '.json?callback=' + callbackName);
  document.body.appendChild(script);
}

export default class Gist extends React.Component {

  componentDidMount() {
    var element = React.findDOMNode(this.refs.gist);
    loadGist(element, 'e9a28f91a3e4e4e6d9d3');
  }

  render() {
    return (
      <div ref="gist">
        <a href="https://gist.github.com/damusnet/e9a28f91a3e4e4e6d9d3">Online Gist Example</a>
      </div>
    );
  }

}
