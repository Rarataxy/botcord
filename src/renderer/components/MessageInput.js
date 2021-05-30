import React, {useEffect} from 'react'
import './MessageInput.less'
const { ipcRenderer } = require('electron')

const MessageInput = (props) => {

    useEffect(() => {
        let messageInput = document.getElementById('message-input')
        messageInput.addEventListener('keydown', (key) => {
            if (key.key != 'Enter') return
            key.preventDefault()
            ipcRenderer.send('sendMessage', messageInput.textContent)
            messageInput.textContent = null
        })
    });

    let messageinput = <div className="text-area">
        <div className="message-input-wrapper scrollable-container scroll-on-hover">
            <div id="message-input" contentEditable='true' data-text={'Message #' + props.channel}></div>
        </div>
    </div>
    return (messageinput)
}

export default MessageInput 