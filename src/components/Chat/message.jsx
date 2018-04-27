import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import emoji from 'node-emoji';
import marked from 'marked';

import {MessageWrapper, Text, Time} from '../../styles/message';
import {GetUser} from '../../graphqlQueries/queries';


@graphql(
    GetUser.query,
    {
        options: ({ message: { sender } }) => ({
            variables: { userId: sender.id }
        }),
        props: GetUser.map
    }
)
export default class Message extends React.Component {
    static propTypes = {
        isFromSelf: PropTypes.bool,
        message: PropTypes.object,
        sender: PropTypes.object
    };

    static defaultProps = { isFromSelf: false, message: {}, sender: {} };

    // Кэшируем, чтобы не парсить при каждом рендере
    static formatText = text => emoji.emojify(marked(text));

    formattedText = null;

    render() {
        const { loading, error, message, user, isFromSelf } = this.props;
        // небольшой костыль: optimistic response присваивает сообщениям
        // рандомный отрицательный id, чтобы не хранить лишнее поле
        const delivered = message.id < 0 ? '  ' : ' ✓';
        // TODO:
        if (this.formattedText === null) {
            this.formattedText = Message.formatText(message.text + delivered);
        }
        return (
            <MessageWrapper>
                <span>{user && user.name}</span>
                <Text
                    isFromSelf={isFromSelf}
                    dangerouslySetInnerHTML={{ __html: this.formattedText }}/>
                {/*TODO: у сообщения есть также поле modifiedAt, равное null, если оно не менялось */}
                <Time>{message.createdAt}</Time>
            </MessageWrapper>
        );
    }
}
