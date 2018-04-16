import React from 'react';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import ChatWindow from './ChatWindow';


// const getHelloWorld = gql`query {
//                 getHelloWorld(id: "SGVsbG9Xb3JsZDoy") {
//                     text
//                 }
//             }`;
//
//
// const Hw = () => (
//     <Query query={getHelloWorld}>{
//         ({ loading, error, data }) => {
//             if (loading) return <p>Loading...</p>;
//             if (error) return <p>Error :(</p>;
//
//             return <p>{data.getHelloWorld.text}</p>;
//         }
//     }</Query>
// );

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ChatWindow />
            </div>
        );
    }
}


// class HelloWorld extends React.Component {
//     static propTypes = {
//         data: PropTypes.shape({
//             loading: PropTypes.bool,
//             error: PropTypes.object,
//             HelloWorld: PropTypes.object
//         }).isRequired
//     };
//
//     render() {
//         if (this.props.data.loading) {
//             return (<div>Loading</div>);
//         }
//
//         if (this.props.data.error) {
//             console.error(this.props.data.error);
//             return (<div>An unexpected error occurred</div>);
//         }
//
//         return (
//             <div>
//                 <p>Rendered</p>
//                 <p>{this.props.data.getHelloWorld.text}</p>
//             </div>
//         );
//     }
// }
//
// const HelloWorldWithData = graphql(getHelloWorld)(HelloWorld);
//
//
// export default class App extends React.Component {
//
//     render() {
//         return (
//             <div>
//                 <HelloWorldWithData/>
//             </div>
//         );
//     }
// }



