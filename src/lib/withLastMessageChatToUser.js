import React from 'react';
import { Query } from 'react-apollo';
import { GetUserLastMessageChatToUser } from '../graphql/queries';


const { Provider, Consumer } = React.createContext({});
export const withLastMessageChatToUser = Decorated => {
    return (props) => {
        const { currentUser } = props;
        return <Query query={GetUserLastMessageChatToUser.query(currentUser.id)} fetchPolicy='network-only'>
            {response => {
                const { allLastMessageChatToUsers } = GetUserLastMessageChatToUser.map(response);
                return <Decorated {...props} allLastMessageChatToUsers={allLastMessageChatToUsers} />
            }}
        </Query>;
    }
}
