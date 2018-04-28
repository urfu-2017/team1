import {graphql, compose} from 'react-apollo';
import {GET_CURRENT_CHAT_ID_ql, UpdateCurrentChatId} from '../graphqlQueries/localState';


export default compose(
    graphql(GET_CURRENT_CHAT_ID_ql, { name: 'localState' }),
    graphql(UpdateCurrentChatId.query, {
        props: UpdateCurrentChatId.map
    })
);
