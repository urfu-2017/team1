import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {MessageWrapper} from '../../styles/message';
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
export default class Message extends React.PureComponent {
    static propTypes = {
        isFromSelf: PropTypes.bool,
        message: PropTypes.object,
        sender: PropTypes.object
    };

    static defaultProps = { isFromSelf: false, message: {}, sender: {} };

    static formatDate = new Intl.DateTimeFormat('ru', {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long'
    }).format;

    render() {
        const { loading, error, message, user, isFromSelf } = this.props;
        // небольшой костыль: optimistic response присваивает сообщениям
        // рандомный отрицательный id, чтобы не хранить лишнее поле
        const delivered = isFromSelf ? (message.id < 0 ? '  ' : ' ✓') : '';
        const ogdata = message.metadata && message.metadata.ogdata || {};
        const createdAt = Message.formatDate(new Date(message.createdAt));
        return (
            <MessageWrapper isFromSelf={isFromSelf}>
                <div className="messageBlock">
                    <img src={user && user.avatarUrl} width="30px" />
                    <span>{user && user.name + delivered}</span>
                    {/*TODO: у сообщения есть также поле modifiedAt, равное null, если оно не менялось */}
                    <div className="messageBlock__time">{createdAt}</div>
                    <div
                        className="messageBlock__text"
                        isFromSelf={isFromSelf}
                        dangerouslySetInnerHTML={{ __html: message.text }}
                    />
                    {ogdata && ogdata.url && Object.keys(ogdata).length !== 0 &&
                    <div className="metadata">
                        <a href={ogdata.url} className="metadata-container">
                            { ogdata.image && <img className="metadata-container__img"
                                                   src={ogdata.image.url} alt={ogdata.title} /> }
                            <div className="metadata-container__title">{ogdata.title}</div>
                        </a>
                    </div>}
                </div>
            </MessageWrapper>
        );
    }
}
