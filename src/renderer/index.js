import React from 'react';
import {render} from 'react-dom';

import {App} from './App';

const { ipcRenderer } = require('electron')
ipcRenderer.send('fetchServerlist', 'servers')

render(
  <App />,
  document.getElementById('app')
);
