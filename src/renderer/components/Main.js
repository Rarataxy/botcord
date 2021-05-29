import React, {useState} from 'react';

import Login from './Login'
import {Client} from './Client'

const Main = () => {
    const [page, redirect] = useState(window.localStorage.getItem('page'))

    if (page === 'app') {
      return <Client />
    } else {
      return <Login redirect={redirect}/>
    }
}

export default Main
