// import React from 'react';

// import {ServerList} from './ServerList'
// import {LeftPanel} from './LeftPanel'
// import {MessageArea} from './MessageArea'
// import './Main.less'


// export class Main extends React.Component {
//     constructor(props) {
//         super(props)
//     }
    
//     render() {
//         return (
//             <div className={'main'}>
//                 <ServerList />
//                 <LeftPanel />
//                 <MessageArea />
//             </div>
//         );
//     }
// }

import React, {useState} from 'react';

import Login from './Login'
import {Client} from './Client'

const Main = () => {
    const [page, redirect] = useState(window.localStorage.getItem('page'))

    if (page === 'app') {
      return <Client />
    } else {
      return <Login redirect={redirect}/>
    }
}

export default Main
