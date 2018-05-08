import {graphql, compose} from 'react-apollo';
import {GET_CURRENT_CHAT_ID_ql, UpdateCurrentChatId} from '../graphqlQueries/localState';


// export default compose(
//     graphql(GET_CURRENT_CHAT_ID_ql, { name: 'localState' }),
//     graphql(UpdateCurrentChatId.query, {
//         props: UpdateCurrentChatId.map
//     })
// );


import React from 'react';


export const { Provider: ChatUpdateProvider, Consumer: ChatUpdateConsumer } = React.createContext({});
export const { Provider: ChatIdProvider, Consumer: ChatIdConsumer } = React.createContext({});

export const withLocalState = Decorated => {
    return (props) => (
        <ChatUpdateConsumer>
            {
                updateCurrentChatId => (<ChatIdConsumer>
                    {currentChatId => (
                        <Decorated {...props} localState={{ currentChatId }}
                                   updateCurrentChatId={updateCurrentChatId}/>)}
                </ChatIdConsumer>)
            }
        </ChatUpdateConsumer>
    );
};
