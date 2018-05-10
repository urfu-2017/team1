import React from 'react';
import {graphql} from 'react-apollo';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Close from 'material-ui/svg-icons/navigation/close';
import {Header} from '../../styles/messages';
import {UpdateChatTitle} from '../../graphqlQueries/mutations';
import {chatTitle_ql} from '../../graphqlQueries/fragments';
import withLocalState from '../../lib/withLocalState';


@graphql(UpdateChatTitle.mutation, { props: UpdateChatTitle.map })
export default class ChatHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
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

            if (this.props.chat.title !== title) {
                const chatId = this.props.chat.id;
                this.props.updateChatTitle({ title, chatId },
                    { update: this.updateCache });
            }

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
        const switcher = editorOpened ?
            <Close className="header__img" /> :
            <ModeEdit className="header__img" />;
        const prefix = (
            <React.Fragment>
                {switcher}
                <span> {!editorOpened ? title : ''} </span>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                <Header onClick={this.props.toggleEditor}>
                    {prefix}
                    {editorOpened &&
                        <input
                            value={this.state.title}
                            size={title.length}
                            style={{ outline: "none", border: "none" }}
                            onChange={this.handleChange}
                            onKeyPress={this.handleSubmit}
                            autoFocus
                            onFocus={e => e.target.select()}
                        />
                    }
                </Header>
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
