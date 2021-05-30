import React from 'react'
import Message from './Message'
import './MessageArea.less';
const { ipcRenderer } = require('electron')

export class MessageArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
        this._isMounted = false;
    }

    render() {
        return (
            <div className="message-area scrollable-container">
                <div className="spacer"></div>
                <div className="messages-wrapper">
                    {this.state.messages.map(msg => {
                        return (<Message key={msg.id} message={msg}/>)
                    })}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this._isMounted = true
        ipcRenderer.on('incomingMessage', (event, args) => {
            let list = [...this.state.messages, args]
            this._isMounted ? this.setState({messages: list}) : ''
        })
    }

    componentWillUnmount(){
        this._isMounted = false
    }
}