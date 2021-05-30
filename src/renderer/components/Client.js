import React from 'react';

import {ServerList} from './ServerList'
import {LeftPanel} from './LeftPanel'
import {Chat} from './Chat'
import './Client.less'


export class Client extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className={'main'}>
                <ServerList />
                <LeftPanel />
                <Chat />
            </div>
        );
    }
}