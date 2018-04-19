import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


// А это мутация - запрос на изменение данных
// Как и HelloWorld, Message состоит из одного поля text

// Как и в прошлый раз, scaphold сгенерировал нам набор методов для работы с типом

// Тип CreateMessageInput (not null) тоже сгенерирован автоматически
// Он описывает данные, необходимые для создания сообщения
// в нашем случае - это объект вида { text: 'some text' }
// он попадает в createMessage с помощью переменной $msg - мы вернёмся к ней позже
const SEND_MESSAGE_ql = gql`
mutation CreateMessage($msg: CreateMessageInput!) {
    createMessage(input: $msg) {
        changedMessage {
            text
            id
        }
    }
}
`;
// По завершении запроса сервер возвращает сохранённые данные:
// В нашем случае это text и id, запрошенные с помощью changedMessage
// Обрати внимание, что мы не передавали id, но сервер сгенерировал его и вернул нам
// Но можно ничего не получать


export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };
    }

    // Привязываем значение инпута к полю - это react
    _handleChange = e => {
        this.setState({ message: e.target.value });
    };

    render() {
        // Mutation похож на Query, но устройство его внутренней функции сложнее
        return (
            <Mutation mutation={SEND_MESSAGE_ql}>{
                (addMessage) =>  // принимаем колбэк, который возьмёт на себя отправку запроса
                    <input
                        type="text"
                        value={this.state.message}
                        onKeyPress={e => {
                            if (e.key !== 'Enter') {
                                return;
                            }
                            e.preventDefault();
                            // Зовём полученную ранее addMessage - это единственная строка в этом методе, специфичная для apollo
                            addMessage({ variables: { msg: { text: this.state.message } } });
                            // Здесь variables - это параметры (переменные) запроса
                            // msg - это переменная $msg из запроса, а её значение - объект, совпадающий с CreateMessageInput
                            this.setState({ message: '' });
                        }}
                        onChange={this._handleChange}
                    />
            }</Mutation>
        );
    }
}
