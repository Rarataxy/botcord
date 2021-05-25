import React from 'react';
const { ipcRenderer } = require('electron')
import './Login.less'


const Login = ({redirect}) => {
    
    const handleLogIn = () => {
        redirect('app')
        window.localStorage.setItem('page', 'app');
        ipcRenderer.send('fetchServerlist', 'servers')
        ipcRenderer.send('getBotInfo', 'bot')
    }

    return (
        <div className="login-page">
            <div className="login">
                <input placeholder="Input your bot token here" id="token" type="text" ></input>
                <button onClick={handleLogIn}>Log in</button>
            </div>
        </div>
    );
}


export default Login