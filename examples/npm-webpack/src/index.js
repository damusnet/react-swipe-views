'use strict';

import React from 'react';
import { default as Router, Route, DefaultRoute, Redirect } from 'react-router';
import App from './components/App';

require('../../../lib/react-swipe-views.css');
require('./main.css');
require('babel-core/polyfill');

React.initializeTouchEvents(true);

const routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="root" handler={App} />
    <Route name="intro" path="/intro" handler={App}/>
    <Route name="code" path="/code" handler={App}/>
    <Route name="thanks" path="/thanks" handler={App}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(
    <Handler />,
    document.getElementById('root')
  );
});
