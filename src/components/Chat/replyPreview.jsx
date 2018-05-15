import React from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import Reply from 'material-ui/svg-icons/content/reply';

import {ReplyPreview} from '../../styles/messages';
import renderMap from './Message/mapForReply';
import stripHtml from '../../lib/stripHtml';


export default ({ message, resetReply }) => {
    console.info('message', message)
    console.info('map', message.map)
    return (
    message && message.sender  // какой-то костыль, но проверка state не работает
        ? <ReplyPreview>
            <p className="replyPreview__sender">{message.sender.name}</p>
            <Close className="replyPreview__close-button" onClick={() => resetReply()}/>
            <div className="replyPreview__wrapper">
                <Reply className="replyPreview__reply"/>
                {message.pictures && message.pictures.length &&
                <img className="replyPreview__picture" src={message.pictures[0]}/>}
                {message.map && renderMap(message.map)}
                <p className="replyPreview__message">{stripHtml(message.text)}</p>
            </div>
        </ReplyPreview>
        : <div/>
)};
