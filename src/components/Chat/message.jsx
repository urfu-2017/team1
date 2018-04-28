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

    static formatText = text => emoji.emojify(marked(text));

    // Кэшируем, чтобы не парсить при каждом рендере
    formattedText = null;

    render() {
        const { loading, error, message, user, isFromSelf } = this.props;
        // небольшой костыль: optimistic response присваивает сообщениям
        // рандомный отрицательный id, чтобы не хранить лишнее поле
        const delivered = isFromSelf ? (message.id < 0 ? '  ' : ' ✓') : '';
        // TODO:
        if (this.formattedText === null) {
            this.formattedText = Message.formatText(message.text + delivered);
        }
        const ogdata = message.metadata && message.metadata.ogdata || {};
        return (
            <MessageWrapper isFromSelf={isFromSelf}>
                <div className="messageBlock">
                    {/*TODO: у сообщения есть также поле modifiedAt, равное null, если оно не менялось */}
                    <div className="mrssageBlock__time">{message.createdAt}</div>
                    <div
                        className="messageBlock__text"
                        isFromSelf={isFromSelf}
                        dangerouslySetInnerHTML={{ __html: this.formattedText }}
                    />
                    { ogdata && Object.keys(ogdata).length !== 0 &&
                    <div className="metadata">
                        <a href={ogdata.url} className="metadata-container">
                            <img className="metadata-container__img" src={ogdata.image.url} alt="{ogdata.title}" />
                            <div className="metadata-container__title">{ogdata.title}</div>
                        </a>
                    </div>}
                </div>
            </MessageWrapper>
        );
    }
}
