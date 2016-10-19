import {AppContainer} from 'react-hot-loader';
import React from 'react';
import {render} from 'react-dom';
import Routes from './Routes';

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Routes />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./Routes', () => {
    render(
      <AppContainer>
        <Routes />
      </AppContainer>,
      rootEl
    );
  });
}
