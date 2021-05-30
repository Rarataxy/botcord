import React, {useState, useEffect} from 'react';
const { ipcRenderer } = require('electron')
import './Login.less'


const Login = ({redirect}) => {
    const [error, passError] = useState('')

    const handleLogIn = () => {
        let token = document.getElementById('token').value
        ipcRenderer.send('login', token)
    }

    useEffect(() => {
        ipcRenderer.on('handleLogin', (event, args) => {
            if (args === 'ok') {
                redirect('app')
                window.localStorage.setItem('page', 'app');
                ipcRenderer.send('fetchServerlist', 'servers')
                ipcRenderer.send('getBotInfo', 'bot')
            } else {
                passError(args)
            }
        })
    });

    return (
        <div className="login-page">
            <div className="login">
                <input placeholder="Input your bot token here" id="token" type="text" ></input>
                <button onClick={handleLogIn}>Log in</button>
                <div className="error">{error}</div>
            </div>
        </div>
    );
}


export default Login