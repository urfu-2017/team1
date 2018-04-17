import React from 'react';
import gql from 'graphql-tag'; // какая-то неведомая штука, позволяющая прикольно писать запросы в gql`query...`
import { Query, Mutation, graphql, compose } from 'react-apollo'; // штуковины, позволяющие писать Ql запросы в компонентах
import PropTypes from 'prop-types';


// объявляем запрос, который будем использовать потом
const GET_HELLO_WORLD_ql = gql`
query {
    getHelloWorld(id: "SGVsbG9Xb3JsZDoy") {
        text
    }
}`;
// В схеме есть тип HelloWorld, который выглядит так:
// type HelloWorld {
//      id: ID!
//      text: String!  // ! означает not null
// }
// Смысл запроса: graphql автоматически сгенерил нам для типа HelloWorld метод getHelloWorld
// Получаем поле текст записи типа HelloWorld, у которой id равен SGVsbG9Xb3JsZDoy
// Но можно получить сразу несколько полей, или даже вложенные объекты и массивы

/*
    Следующие примеры делают одно и то же разными способами:
*/


class HelloWorld1 extends React.Component {
    // определяем поле data
    // Его свойства меняются по мере изменения состояния запроса
    // loading, error, ... есть и другие
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            HelloWorld: PropTypes.object
        }).isRequired
    };

    // Просто обращаемся к props.data
    render() {
        if (this.props.data.loading) {
            return (<div>Loading...</div>);
        }

        if (this.props.data.error) {
            return (<div>Error</div>);
        }

        return (
            <div>
                <p>Rendered</p>
                <p>{this.props.data.getHelloWorld.text}</p>
                {/* getHelloWorld - совпадает с именем "метода" в запросе выше */}
                {/* а text - имя того поля, которое мы запрашивали */}
            </div>
        );
    }
}

// Однако класс HelloWorld1 ничего не знает про graphql, а его props.data пуст
// Поэтому создаём на его основе новый, передавая graphql наш запрос, а затем навешивая его на класс
const HelloWorld1WithData = graphql(GET_HELLO_WORLD_ql)(HelloWorld1);
// Как только компонент будет создан, apollo ЕДИНОЖДЫ выполнит запрос и заполнит наш props.data

// Чтобы навесить на один объект несколько запросов, используем compose:
/*
    const SomeClassWithData = compose(
        graphql(QUERY_ONE),
        graphql(QUERY_TWO)
    )(SomeClass);
*/


// А можно получить данные прямо на месте с помощью компонента Query
// Его тело - это функция, которая принимает состояние запроса
const HelloWorld2 = () => (
    <Query query={GET_HELLO_WORLD_ql}>{
        ({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <p>{data.getHelloWorld.text}</p>;
        }
    }</Query>
);

/*
    Можно добавить дополнительные параметры:

    <Query query={GET_HELLO_WORLD_ql}
        pollInterval={1000} >

    pollInterval говорит, что запрос будет выполняться каждые 1000 мс, обновляя данные
    При этом, если запрос завершится с ошибкой, apollo оставит старое значение
    Есть и другие параметры

    Функции graphql() тоже можно передавать конфигурационный объект со всеми этими параметрами
*/


// а теперь то же самое в форме класса
class HelloWorld3 extends React.Component {
    render() {
        return (
            <Query
                query={GET_HELLO_WORLD_ql}
                pollInterval={5000}
            >{
                ({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return (
                        <p>{data.getHelloWorld.text}</p>
                    );
                }
            }</Query>
        )
    }
}
// здесь я поставил большой pollInterval, чтобы не жрать БД


// Итак, все 3 компонента выведут одно и то же
export default class App extends React.Component {

    render() {
        return (
            <div>
                <HelloWorld1WithData />
                <HelloWorld2 />
                <HelloWorld3 />
            </div>
        );
    }
}

// Следующий шаг - комплексный пример
// Лучше начать с components/ChatWindow/message, затем перейти к input и закончить в index
