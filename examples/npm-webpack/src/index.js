'use strict';

import React from 'react';
import App from './components/App';

require('./main.css');
require('../../../src/SwipeViews.css');

React.initializeTouchEvents(true);

React.render(
  <App />,
  document.getElementById('root')
);
