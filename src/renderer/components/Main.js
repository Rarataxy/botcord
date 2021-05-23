import React from 'react';

import {ServerList} from './ServerList'
import {ChannelList} from './ChannelList'
import {MessageArea} from './MessageArea'
import './Main.less'


export class Main extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className={'main'}>
                <ServerList />
                <ChannelList />
                <MessageArea />
            </div>
        );
    }
}