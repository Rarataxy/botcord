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

    fetchChannellist = (id) => {
        ipcRenderer.send('fetchChannellist', id)
    }

    render() {
        return (
            <div className="guilds">
                <div className="dms server">
                    <div className="server-icon"></div>
                </div>
                <div className="separator"></div>
                <div className='server-list'>
                    {this.state.serverlist.map(server =>{
                        return (
                            <div key={server.id} id={server.id} className='server'>
                                <div className="server-icon-wrapper">
                                    <img onClick={this.fetchChannellist.bind(this, server.id)} className='server-icon' src={server.icon} alt={server.name} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

    componentDidMount() {
        ipcRenderer.on('serverlist', (event, args) => {
            this.setState({serverlist: args})
        })
    }
}