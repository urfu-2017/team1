import React from 'react';
import {graphql} from 'react-apollo';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Close from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search';
import {Header} from '../../styles/messages';
import {UpdateChatTitle} from '../../graphql/mutations';
import {chatTitle_ql} from '../../graphql/fragments';
import withLocalState from '../../lib/withLocalState';
import {clearStyles, searchStyles, searchHintStyles} from '../../styles/chats';


@graphql(UpdateChatTitle.mutation, { props: UpdateChatTitle.map })
export default class ChatHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            searchText: ''
        };
    }

    componentWillReceiveProps(props) {
        const { editorOpened, loading, chat, searchOpened } = props;
        editorOpened && !loading && this.setState({ title: chat.title});
        !editorOpened && !searchOpened && this.setState({searchText: ''});
    }

    handleChange = event => this.setState({ title: event.target.value });

    handleSearchText = event => this.setState({searchText: event.target.value});

    clearSearchText = () => this.setState({ searchText: '' });

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

    searchHeader = () => {
        const {editorOpened, searchOpened, toggleSearch, handleSearchText} = this.props;
        return ( 
            <React.Fragment>
                { searchOpened &&
                    <React.Fragment>
                        <TextField
                            hintText="Поиск по истории сообщений"
                            onChange={this.handleSearchText}
                            value={this.state.searchText}
                            inputStyle={searchStyles}
                            hintStyle={searchHintStyles}
                            underlineFocusStyle={searchStyles}
                        />
                        <div className="header__buttons">
                            <input
                                type="button"
                                value="ПОИСК"
                                className="search"
                                onClick={() => handleSearchText(this.state.searchText) }
                            />
                            <FlatButton 
                                secondary={true} 
                                label="Отмена" 
                                onClick={() => { toggleSearch(); handleSearchText(''); } } 
                            />
                        </div>
                    </React.Fragment>
                }
                {!searchOpened && !editorOpened &&
                    <Search onClick={toggleSearch} className="search__icon"/>}
            </React.Fragment>)
    }

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
        const { chat, editorOpened, loading, searchOpened, findMessages } = this.props;
        return (
            <Header searchOpened={searchOpened}>
                {
                    loading && 'Загрузка...' ||
                    !searchOpened && (chat.groupchat &&
                    this.groupChatHeader(chat.title, editorOpened) ||
                    this.personalChatHeader(chat.title))
                }
                {this.searchHeader()}
            </Header>
        );
    }
}
