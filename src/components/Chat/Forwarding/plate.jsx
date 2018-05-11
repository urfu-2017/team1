import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ChatSelector from './chatSelector';


export default ({ messages, cancel, messagesController }) => (
    <React.Fragment>
        <ChatSelector
            messages={messages}
            cancel={cancel}
            messagesController={messagesController}
        />
        <FlatButton
            label="Отмена"
            secondary={true}
            onClick={cancel} />
    </React.Fragment>
);
