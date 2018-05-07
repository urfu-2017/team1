import React from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import Reply from 'material-ui/svg-icons/content/reply';

import {ReplyPreview} from '../../styles/messages';
import stripHtml from '../../lib/stripHtml';


export default ({ message, resetReply }) => (
    message && message.sender  // какой-то костыль, но проверка state не работает
        ? <ReplyPreview>
            <p className="replyPreview__sender">{message.sender.name}</p>
            <Reply className="replyPreview__reply" />
            <Close className="replyPreview__close-button" onClick={resetReply} />
            <p className="replyPreview__message">{stripHtml(message.text)}</p>
        </ReplyPreview>
        : <div />
);
