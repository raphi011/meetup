import React from 'react';
import {Layout, Content} from 'react-mdl';

import 'sprint-js/sprint';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import './styles/global.scss';



import HeaderBar from './components/HeaderBar';

const App = props =>
  <div className="mdl-layout mdl-layout--no-drawer-button mdl-js-layout mdl-layout--fixed-header">
    <Layout fixedHeader>
      <HeaderBar />
      <Content>
        <div className="page-content">
          {props.children}
        </div>
      </Content>
    </Layout>
  </div>;

App.propTypes = {
  children: React.PropTypes.any
};

export default App;
