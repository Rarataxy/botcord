import React from 'react'
const { ipcRenderer } = require('electron')
import './UserPanel.less'

export class UserPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bot: {
                avatar: '',
                username: ''
            },
            status: ''
        }
    }

    changeStatus(newStatus) {
        ipcRenderer.send('changeStatus', newStatus)
    }

    render () {
        return (
            <div className="user-panel">
                <img className="user-avatar" src={this.state.bot.avatar} alt="icon" />
                <div className="user-info text-overflow">
                    <span id="user-name">{this.state.bot.username}</span>
                    <span id="status">{this.state.status}</span>
                    {/* <span onClick={() => {this.changeStatus('sugoma sussus')}} id="status">{this.state.status}</span> */}
                </div>
            </div>
        )
    }
    
    componentDidMount() {
        ipcRenderer.on('getBotInfo', (event, args) => {
            this.setState({bot: args[0], status: args[1]})
        })
        ipcRenderer.on('changeStatus', (event, args) => {
            this.setState({status: args})
        })
    }
}