'use strict';

import React from 'react';
import { Link } from 'react-router';
import SwipeViews from 'react-swipe-views';
import Gist from './Gist.js';

export default class App extends React.Component {

  render() {
    return (
      <SwipeViews>
        <div title={<Link to="intro">Intro</Link>}>
          <h1>A React component for binded Tabs and Swipeable Views</h1>
          <p>See <a href="http://developer.android.com/design/patterns/swipe-views.html">
          Swipe Views</a> on the Android Design Patterns website to understand the desired effect.</p>
          <p>This demo is best viewed on a touch enabled device (real or emulated).</p>
          <p style={{textAlign: 'center'}}><a href="https://github.com/damusnet/react-swipe-views"><button>Download</button></a></p>
        </div>
        <div title={<Link to="code">Code</Link>}>
          <Gist />
        </div>
        <div title={<Link to="thanks">Thanks</Link>}>
          <ul id="thanks">
            <li><a href="https://twitter.com/davidbruant">David Bruant</a> for making me believe in JavaScript</li>
            <li><a href="http://facebook.github.io/react/">React</a> for being awesome</li>
            <li><a href="http://babeljs.io/">Babel</a> for removing so much pain from transpiling/compiling/bundling</li>
            <li><a href="https://github.com/gaearon">Dan Abramov</a> for all the useful ressources, in this case <a href="https://github.com/gaearon/react-hot-boilerplate">React Hot Boilerplate</a></li>
            <li><a href="https://github.com/TheSeamau5">Hassan Hayat</a>'s <a href="https://github.com/TheSeamau5/swipe-pages">Swipe Pages WebComponent</a> for inspiration</li>
            <li><a href="https://github.com/ferrannp">Ferran Negre</a> for helping me debug</li>
          </ul>
          <p style={{textAlign: 'center'}}><Link to="intro"><button>Back to Intro</button></Link></p>
        </div>
      </SwipeViews>
    );
  }

}
