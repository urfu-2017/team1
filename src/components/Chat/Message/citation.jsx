import React from 'react';
import renderMap from './mapForReply';

import stripHtml from '../../../lib/stripHtml';

export default ({ message }) => {
    return(
    <div className="messageBlock__citation">
        <a href={`#${message.id}`}>
            <p className="messageBlock__citation-sender">{message.sender.name}</p>
            <div className="messageBlock__citation-wrapper">
                {message.pictures && message.pictures.length &&
                <img className="messageBlock__citation-picture" src={message.pictures[0]}/>}
                {message.map && renderMap(message.map)}
                <span className="messageBlock__citation-text">{stripHtml(message.text)}</span>
            </div>
        </a>
    </div>
)};
