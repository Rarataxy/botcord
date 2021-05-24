import React from 'react';
import {render} from 'react-dom';

import {App} from './App';

const { ipcRenderer } = require('electron')
ipcRenderer.send('fetchServerlist', 'servers')
ipcRenderer.send('getBotInfo', 'bot')

render(
  <App />,
  document.getElementById('app')
);
