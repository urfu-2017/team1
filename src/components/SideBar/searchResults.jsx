import React from 'react';
import {Divider, List, Subheader} from 'material-ui';
import {graphql} from 'react-apollo';

import MessagePreview from './messagePreview';
import {SearchResults as SearchResultsStyles} from '../../styles/searchResults';
import {SearchMessages} from '../../graphql/queries';


@graphql(SearchMessages.query, {
    options: ({ currentUserId, searchText, forceRefetch }) => {
        const options = {
            variables: SearchMessages.variables(currentUserId, searchText),
            fetchPolicy: 'network-only'
        };
        if (!forceRefetch) {
            options.context = { debounceKey: 'searchMessages' };
        }
        return options;
    },
    props: SearchMessages.map
})
export default class SearchResults extends React.PureComponent {
    state = { selectedMessageId: '' };

    goToMessage = (chat, messageId) => {
        this.props.selectChat(chat);
        window.location.hash = messageId;
        this.setState({ selectedMessageId: messageId });
    };


    getMatchPosition = (messageText, regexp) => {
        if (typeof messageText !== 'string') {
            return -1;
        }
        return messageText.search(regexp);
    };

    render() {
        const { loading, error, searchMessages, searchText } = this.props;
        if (error) {
            return <p>Error</p>;
        }
        const searchRegexp = new RegExp(searchText, 'i');
        const messages = searchMessages
            ? searchMessages
                .map(message => [message, this.getMatchPosition(message.rawText, searchRegexp)])
                .filter(([_, matchPosition]) => matchPosition >= 0)
            : [];

        return (
            <List>
                <Subheader>
                    {loading ? 'Поиск...' :
                        messages.length ? `Результаты поиска (${messages.length}):` :
                            'Ничего не найдено :('}
                </Subheader>
                {!loading && messages
                    .map(([message, matchPosition], index) => (
                        <SearchResultsStyles key={message.id}>
                            <MessagePreview
                                message={message}
                                goToMessage={this.goToMessage}
                                selected={this.state.selectedMessageId === message.id}
                                searchText={searchText}
                                matchPosition={matchPosition}/>
                            {(index < messages.length - 1) &&
                            <Divider inset={true}/>}
                        </SearchResultsStyles>
                    ))}
            </List>
        );
    }
}
