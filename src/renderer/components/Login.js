import React, {useState, useEffect} from 'react';
const { ipcRenderer } = require('electron')
import './Login.less'


const Login = ({redirect}) => {
    const [error, passError] = useState('')
    const [errClass, addErrClass] = useState('')

    const handleLogIn = () => {
        let token = document.getElementById('token').value
        ipcRenderer.send('login', token)
    }

    useEffect(() => {
        token.addEventListener('keydown', key => {
            if (key.key != 'Enter') return
            handleLogIn()
        })

        ipcRenderer.on('handleLogin', (event, args) => {
            if (args === 'ok') {
                redirect('app')
                window.localStorage.setItem('page', 'app');
                ipcRenderer.send('fetchServerlist', 'servers')
                ipcRenderer.send('getBotInfo', 'bot')
            } else {
                addErrClass('error')
                passError(<span id='error-message'>{'- ' + args}</span>)
                token.value = ''
            }
        })
    });

    return (
        <div className="login-page">
            <div className="login">
                <h5>Welcome back</h5>
                <p>Log in with your bot token to start</p>
                {/* <div className="error">{error}</div> */}
                <div className="login-content">
                    <span className={errClass} id="login-label">TOKEN {error}</span>
                    <input className={errClass} id="token" type="text" ></input>
                    <button onClick={handleLogIn}>Log in</button>
                </div>
            </div>
        </div>
    );
}


export default Login