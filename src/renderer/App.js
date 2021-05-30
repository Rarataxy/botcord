import React from 'react';

import {Toolbar} from './components/Toolbar';
import Main from './components/Main';
import './app.less';

const { ipcRenderer } = require('electron')

export class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return [
      <Toolbar key={'toolbar'}/>,
      <Main key={'main'} />
    ];
  }
}
