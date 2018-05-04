import React from 'react';
import {graphql} from 'react-apollo';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Close from 'material-ui/svg-icons/navigation/close';
import {Header} from '../../styles/messages';
import {UpdateChatTitle} from '../../graphqlQueries/mutations';
import {chatTitle_ql} from '../../graphqlQueries/fragments';


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
            <Close className="header__img" style={{color: '#fff'}}/> :
            <ModeEdit className="header__img" style={{color: '#fff'}}/>;
        const prefix = (
            <div className="header__editor"
                onClick={this.props.toggleEditor}
<<<<<<< 0dcee9116265153799b7f493cc6a37aec680cdff
<<<<<<< e5fc3fb7e1c8d2d9c84aad1d1afc8ede303a9dcc
                style={{ fontSize: "16px" }}>
=======
                style={{ fontSize: "16px" }} >
>>>>>>> change design
                {switcher + (!editorOpened ? title : '')}
            </span>
=======
            >
                {switcher}
                <span> {!editorOpened ? title : ''} </span>
            </div>
>>>>>>> editing styles
        );

        return (
            <React.Fragment>
                {prefix}
                {editorOpened &&
<<<<<<< e5fc3fb7e1c8d2d9c84aad1d1afc8ede303a9dcc
                <input
                    value={this.state.title}
                    size={title.length}
                    style={{ outline: "none", border: "none" }}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                    autoFocus
                    onFocus={e => e.target.select()}
                />
=======
                    <input
                        value={this.state.title}
                        size={title.length}
                        style={{ outline: "none", border: "none" }}
                        onChange={this.handleChange}
                        onKeyPress={this.handleSubmit}
                        autoFocus
                        onFocus={e => e.target.select()}
                    />
>>>>>>> change design
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
<<<<<<< 0dcee9116265153799b7f493cc6a37aec680cdff
<<<<<<< e5fc3fb7e1c8d2d9c84aad1d1afc8ede303a9dcc
            <Header style={{ height: "65px" }}>
=======
            <Header style={{height: "65px"}}>
>>>>>>> change design
=======
            <Header>
>>>>>>> editing styles
                {loading && 'Загрузка...' ||
                chat.groupchat && this.groupChatHeader(chat.title, editorOpened) ||
                this.personalChatHeader(chat.title)}
            </Header>
        );
    }
}
