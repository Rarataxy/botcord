import React from 'react';
const { ipcRenderer } = require('electron')
import './MessageArea.less'
import Message from './Message'

export class MessageArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            channel: '',
            messages: []
        }
    }

    render() {
        return (
            <div className={'message-area'}>
                {this.state.messages.map(msg => {
                    return (<Message key={msg.nonce} message={msg}/>)
                })}
            </div>
        );
    }

    componentDidMount() {
        ipcRenderer.on('changeChannel', (event, args) => {
            this.setState({channel: args, messages: []})
        })
        ipcRenderer.on('incomingMessage', (event, args) => {
            let list = [...this.state.messages, args]
            this.setState({messages: list});
        })
    }
}