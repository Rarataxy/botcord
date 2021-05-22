import React from 'react';
const { ipcRenderer } = require('electron')
import './MessageArea.less'

export class MessageArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            serverlist: undefined
        }
    }

    componentDidMount() {
        ipcRenderer.send('fetchServerlist', 'ping')
        ipcRenderer.on('fetchServerlist', (event, args) => {
            this.setState({serverlist: args})
        })
    }

    render() {
        return (
            <div className={'message-area'}>
                <p>{this.state.serverlist}</p>
            </div>
        );
    }
}