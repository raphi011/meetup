import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid} from 'react-flexbox-grid/lib/index';
import injectTapEventPlugin from 'react-tap-event-plugin';

import HeaderBar from './components/HeaderBar';
import './styles/global.scss';

injectTapEventPlugin();


const App = props =>
  <MuiThemeProvider >
    <div>
      <HeaderBar />
      <Grid>
        <main>
          {props.children}
        </main>
      </Grid>
    </div>
  </MuiThemeProvider>;

App.propTypes = {
  children: React.PropTypes.object
};

export default App;
