import React, {useState, useEffect}from 'react';
import ReactDOM from "react-dom";

import {App} from './App';
import Login from './components/Login'


const AppMount = () =>{
  const [page, redirect] = useState(window.localStorage.getItem('page'))

  if (page === 'app') {
    return <App />
  } else {
    return <Login redirect={redirect}/>
  }
}
ReactDOM.render(<AppMount />, document.getElementById('app'))