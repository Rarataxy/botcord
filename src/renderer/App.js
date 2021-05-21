import React from 'react';

import {Toolbar} from './components/Toolbar';
import {Main} from './components/Main';

import './app.less';

export class App extends React.Component {
  render() {
    return [
      <Toolbar/>,
      <Main />
    ];
  }
}

