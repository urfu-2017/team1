import React from 'react';
import { Query, compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Input from './input';
import Message from './message';


// Так можно получить ВСЕ сообщения
// Возможно, есть более изящный способ (должен быть)
// Здесь я просто воспользовался внутренней структурой базы, не нужно вникать в запрос
const GET_MESSAGES_ql = gql`
query {
    viewer {
        allMessages {
            edges {
                node {
                    id
                    createdAt
                    text
                }
            }
        }
    }
}
`;


// А эта штука - запрос на получение значения, хранящегося на клиенте
// Обрати внимание на директиву @client рядом с полем some_key - этим полем мы и будем манипулировать
// До первого запроса some_key имеет дефолтное значение; оно прописано в make-apollo-client при создании кэша:
/*
    defaults: {
        some_key: 'some_value'
    }
 */
const someKeyQuery = gql`
query someKeyQuery {
    some_key @client
}
`;
// someKeyQuery тоже сгенерирован автоматически, но можно определить кастомную логику


// А так some_key можно менять (тоже @client):
const someKeyMutation = gql`
  mutation someKeyMutation($some_key: String!) {
    changeSomeKey(some_key: $some_key) @client {
      some_key
    }
  }
`;
// changeSomeKey описан в ../resolvers/index



// Декоратор как в питоне
// Эквивалентно compose(...)(ChatWindow)
@compose(
    graphql(someKeyQuery, { name: 'someKey' }),  // Здесь name позволяет обращаться к полю через this.props.someKey.some_key
    graphql(someKeyMutation)
)
export default class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    _getMessages() {
        // Исполняем запрос
        // На самом деле, обновлять сообщения по таймауту неправильно
        // Тем более, что в запросе мы получаем все сообщения
        // (хотя, возможно, работает кэш, а, если с последнего запроса ничего не поменялось,
        // сервер просто отдаёт 304)
        // Правильный способ - subscriptions, до которых я ещё не добрался
        // Они позволят серверу просто пушить нам сообщения из чатов, на которые мы подпишемся
        return (
            <Query
                query={GET_MESSAGES_ql}
                pollInterval={50000}
            >{
                ({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return (
                        <div>
                            {ChatWindow._mapTextToMessages(data.viewer.allMessages.edges)}
                        </div>
                    );
                }
            }</Query>
        );
    }

    // Хэндлер для изменения значения
    changeSome = val => {
        this.props.mutate({
            variables: { some_key: val }  // Здесь опять значения переменных запроса
        });
    };

    static _mapTextToMessages(messages) {
        return messages.map(
            (msg, i) => <Message text={msg.node.text} key={i.toString()}/>
        );
    }

    render() {
        return (
            <div>
                <div>
                    {this._getMessages()}
                </div>
                <Input/>
                <br />
                {/* По клику вызываем хэндлер и устанавливаем для some_key новое значение
                    Никаких редьюсеров и switch-case
                 */}
                <button onClick={() => this.changeSome('value1')}>Change1</button>
                <button onClick={() => this.changeSome('value2')}>Change2</button>
                <p>Current value is {this.props.someKey.some_key}</p>
            </div>
        );
    }
}
