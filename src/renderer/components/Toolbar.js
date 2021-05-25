const remote = require('electron').remote;
// import remote from 'electron'
import React from 'react';

import './Toolbar.less';


export class Toolbar extends React.Component {
  render() {
    return (
      <div className={'toolbar'}>
        <div id="close" className={'close toolbar-btn'}>
          <svg width="12px" height="12px" viewBox="0 0 12 12">
            <polygon fill="#b9bbbe" fillRule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon>
          </svg>
        </div>
        <div id="maximize" className={'minmax toolbar-btn'}>
          <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
            <rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="#b9bbbe"></rect>
          </svg>
        </div>
        <div id="minimize" className={'minmax toolbar-btn'}>
          <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
            <rect fill="#b9bbbe" width="10" height="1" x="1" y="6"></rect>
          </svg>
        </div>
      </div>
    );
  }
  componentDidMount() {
    document.getElementById('minimize').addEventListener('click', () => {
      remote.getCurrentWindow().minimize();
    });
  
    document.getElementById('maximize').addEventListener('click', () => {
        const currentWindow = remote.getCurrentWindow()
        currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize()
    });
    
    document.getElementById('close').addEventListener('click', () => {
        window.localStorage.clear();
        remote.app.quit();
    });
  }
}