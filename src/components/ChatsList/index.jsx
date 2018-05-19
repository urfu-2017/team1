import React from 'react';

import ChatPreview from './chatPreview';
import {List} from 'material-ui/List';
import {Divider, Subheader} from 'material-ui';
import PropTypes from 'prop-types';


export default class ChatsList extends React.Component {
    static propTypes = {
        chatsFilter: PropTypes.func
    };

    static defaultProps = {
        chatsFilter: () => true
    };

    render() {
        const { chats, chatsFilter, onChatClick } = this.props;

        return (
            <List>
                {chats.length ?
                    chats.filter(chatsFilter).map((chat, i) => (
                        <React.Fragment key={chat.id}>
                            <ChatPreview
                                onChatClick={onChatClick}
                                chat={chat}
                            />
                            {(i < chats.length - 1) && <Divider inset={true}/>}
                        </React.Fragment>
                    )) :
                    <Subheader>
                        Вы не состоите ни в одном чате
                    </Subheader>}
            </List>
        );
    }
}
