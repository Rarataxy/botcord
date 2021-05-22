import React from 'react';
const { ipcRenderer } = require('electron')
import './ServerList.less'

export class ServerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverlist: []
        }
    }

    render() {
        return (
            <div className={'server-list'}>
                {this.state.serverlist.map(server =>{
                    return <div ip={server.toString()} className={'server'}>server</div>
                })}
                {/* {console.log(this.state.serverlist)} */}
            </div>
        );
    }

    componentDidMount() {
        ipcRenderer.on('serverlist', (event, args) => {
            this.setState({serverlist: args})
        })
        console.log('bruh');
    }
}