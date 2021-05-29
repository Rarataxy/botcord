import React from 'react';
import './message.less';

const Message = (props) => {
    let timestamp = new Date(props.message.timestamp);
    const message = <div className="message-wrapper" key={props.message.id}>
        <img src={props.message.author.avatar} alt="icon" className="user-icon"/>
        <div className="message-contents">
            <div className="message-header">
                <span style={{color: props.message.member.displayHex}} className="display-name">{props.message.member.nickname || props.message.author.username}</span>
                <span className="timestamp">{new Intl.DateTimeFormat('en-GB').format(timestamp)}</span>
            </div>
            <div className="message">{props.message.content}</div>
        </div>
    </div>
    return (message)
}

export default Message