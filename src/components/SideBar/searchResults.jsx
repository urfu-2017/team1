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
        if (!forceRefetch)
            options.context = { debounceKey: 'searchMessages' };
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
        return messageText && messageText.search(regexp);
    };

    render() {
        const { loading, error, searchMessages, searchText } = this.props;
        if (error) return <p>Error</p>;
        const searchRegexp = new RegExp(searchText, 'i');

        return (
            <List>
                <Subheader>
                    {loading ? 'Поиск...' :
                    searchMessages.length ? `Результаты поиска (${searchMessages.length}):` :
                    'Ничего не найдено :('}
                </Subheader>
                {!loading && searchMessages.map((message, index) => (
                    <SearchResultsStyles key={message.id}>
                        <MessagePreview
                            message={message}
                            goToMessage={this.goToMessage}
                            selected={this.state.selectedMessageId === message.id}
                            searchText={searchText}
                            matchPosition={this.getMatchPosition(message.rawText, searchRegexp)}/>
                        {(index < searchMessages.length - 1) &&
                        <Divider inset={true}/>}
                    </SearchResultsStyles>
                ))}
            </List>
        );
    }
}
