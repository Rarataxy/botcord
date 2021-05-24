import React from 'react';

import {ServerList} from './ServerList'
import {LeftPanel} from './LeftPanel'
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
                <LeftPanel />
                <MessageArea />
            </div>
        );
    }
}