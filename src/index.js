import {AppContainer} from 'react-hot-loader';
import React from 'react';
import {render} from 'react-dom';
import App from './App';

const rootEl = document.getElementById('root');

require('./index.html');

render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(
      <AppContainer>
        <App />
      </AppContainer>,
      rootEl
    );
  });
}
