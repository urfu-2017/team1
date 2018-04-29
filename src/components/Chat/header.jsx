import React from 'react';
import {graphql} from 'react-apollo';

import {Header} from '../../styles/messages';
import {UpdateChatTitle} from '../../graphqlQueries/mutations';
import {chatTitle_ql} from '../../graphqlQueries/fragments';


@graphql(UpdateChatTitle.mutation, { props: UpdateChatTitle.map })
export default class ChatHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: 'some' };
    }

    componentWillReceiveProps(props) {
        const { editorOpened, loading, chat } = props;
        editorOpened && !loading && this.setState({ title: chat.title });
    }

    handleChange = event => this.setState({ title: event.target.value });

    handleSubmit = event => {
        const title = this.state.title;
        if (title.trim().length === 0) {
            return;
        }
        if (event.key === 'Enter') {
            event.preventDefault();

            const chatId = this.props.chat.id;
            this.props.updateChatTitle({ title, chatId },
                { update: this.updateCache });

            this.props.toggleEditor();
        }
    };

    updateCache = (cache, { data: { updateChat } }) => {
        cache.writeFragment({
            id: updateChat.id,
            fragment: chatTitle_ql,
            data: {
                id: updateChat.id,
                title: updateChat.title,
                __typename: 'Chat'
            }
        });
    };

    groupChatHeader = (title, editorOpened) => {
        const switcher = editorOpened ? '✖\t' : '✎\t';
        const prefix = (
            <span onClick={this.props.toggleEditor}>
                {switcher + (!editorOpened ? title : '')}
            </span>
        );

        return (
            <React.Fragment>
                {prefix}
                {editorOpened &&
                    <input value={this.state.title}
                           size={title.length}
                           onChange={this.handleChange}
                           onKeyPress={this.handleSubmit}
                           autoFocus
                           onFocus={e => e.target.select()}
                    />
                }
            </React.Fragment>
        );
    };

    personalChatHeader = title => {
        return (
            <span>
                {title}
            </span>
        );
    };

    render() {
        const { chat, editorOpened, loading } = this.props;
        return (
            <Header>
                {loading && 'Загрузка...' ||
                chat.groupchat && this.groupChatHeader(chat.title, editorOpened) ||
                this.personalChatHeader(chat.title)}
            </Header>
        );
    }
}
