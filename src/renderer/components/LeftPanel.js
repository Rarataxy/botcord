import React from 'react';

import {UserPanel} from './UserPanel'
import {ChannelList} from './ChannelList'

export class LeftPanel extends React.Component {
    render() {
        return (
            <div className="channel-area">
                <ChannelList key='channel-list'/>
                <UserPanel key='user-panel'/>
            </div>
        )
    }
}