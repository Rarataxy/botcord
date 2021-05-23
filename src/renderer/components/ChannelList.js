import React from 'react';
const { ipcRenderer } = require('electron')
import './ChannelList.less'

export class ChannelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [],
            serverName: ''
        }
    }
    render() {
        return (
            <div className={'channel-section'}>
                <div className='server-name '>
                    <span className='text-overflow'>{this.state.serverName}</span>
                </div>
                <div className="channel-list">
                {this.state.channels.map(channel => {
                    return (
                        <div id={channel.id} className='channel'>
                            <span className='text-overflow'>{channel.name}</span>
                        </div>
                    )
                })}
                </div>
            </div>
        );
    }

    componentDidMount() {
        ipcRenderer.on('fetchChannellist', (event, args) => {
            this.setState({ channels: args[0], serverName: args[1]})
        })
    }
}