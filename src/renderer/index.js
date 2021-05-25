import React from 'react';
import ReactDOM from "react-dom";

import {App} from './App';

const AppMount = () =>{
  return <App />
}
ReactDOM.render(<AppMount />, document.getElementById('app'))