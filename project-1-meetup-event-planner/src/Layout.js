import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'sprint-js/sprint';

import './styles/global.scss';

injectTapEventPlugin();

import HeaderBar from './components/HeaderBar';

const App = props =>
  <MuiThemeProvider >
    <div>
      <HeaderBar />
      <div className="page-content">
        {props.children}
      </div>
    </div>
  </MuiThemeProvider>;

App.propTypes = {
  children: React.PropTypes.any
};

export default App;
