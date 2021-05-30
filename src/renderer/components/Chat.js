import React, {useState, useEffect} from 'react';
const { ipcRenderer } = require('electron')
import './Chat.less'
import {MessageArea} from './MessageArea'
import MessageInput from './MessageInput'


export class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            channel: ''
        }
    }

    render() {
        let chat
        if (this.state.channel != '') {
            chat = [<MessageArea key={this.state.channel.id}/>,
            <MessageInput key={this.state.channel.name} channel={this.state.channel.name}/>]
        } else {
            chat = <div></div>
        }

        return (
            <div className="chat">
                <div className="channel-header">
                    <span id="chanel-title">{this.state.channel.name}</span>
                </div>
                {chat}
            </div>
        );
    }

    componentDidMount() {
        ipcRenderer.on('changeChannel', (event, args) => {
            this.setState({channel: args})
        })
    }
}

// const Chat = (props) => {
//     const [channel, changeChannel] = useState('')

//     useEffect(()=> {
//         ipcRenderer.on('changeChannel', (event, args) => {
//             // this.setState({channel: args})
//             changeChannel(args)
//         })
//     })

//     return (
//         <div className="chat">
//                 <div className="channel-header">
//                     <span id="chanel-title">{channel.name}</span>
//                 </div>
// {/* 
                    // {channel === '' ? 
                    // [<MessageArea key={this.state.channel.id}/>,
                    // <MessageInput key={this.state.channel.name} channel={this.state.channel.name}/>]
                    // : <div></div> } */}

//                 {()=> {
//                     if (channel != '') {
//                         return (
//                             <MessageArea key={channel.id}/>,
//                             <MessageInput key={channel.name} channel={channel.name}/>
//                         )
//                     }
//                 }}
//         </div>
//     )
// }
// export default Chat