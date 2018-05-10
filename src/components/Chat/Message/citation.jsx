import React from 'react';

import stripHtml from '../../../lib/stripHtml';


export default ({ message }) => (
    <div className="messageBlock__citation">
        <a href={`#${message.id}`}>
            <p className="messageBlock__citation-sender">{message.sender.name}</p>
            <div className="messageBlock__citation-wrapper">
                {message.pictures && message.pictures.length &&
                <img className="messageBlock__citation-picture" src={message.pictures[0]}/>}
                <span className="messageBlock__citation-text">{stripHtml(message.text)}</span>
            </div>
        </a>
    </div>
);
