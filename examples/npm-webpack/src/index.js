'use strict';

import React from 'react';
import App from './components/App';

require('../../../lib/react-swipe-views.css');
require('./main.css');

React.initializeTouchEvents(true);

React.render(
  <App />,
  document.getElementById('root')
);
