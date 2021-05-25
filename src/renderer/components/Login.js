import React from 'react';
const { ipcRenderer } = require('electron')

const Login = ({redirect}) => {
    
    const handleLogIn = () => {
        redirect('app')
        window.localStorage.setItem('page', 'app');
        ipcRenderer.send('fetchServerlist', 'servers')
        ipcRenderer.send('getBotInfo', 'bot')
    }

    return (
        <div>
            <input id="token" type="text" ></input>
            <button onClick={handleLogIn}>Log in</button>
        </div>
    );
}


export default Login