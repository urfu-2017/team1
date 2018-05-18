import {graphql, compose} from 'react-apollo';
import {GetLocalState, UpdateCurrentChatId} from '../graphql/localState';


export default compose(
    graphql(GetLocalState.query, {
        props: GetLocalState.map
    }),
    graphql(UpdateCurrentChatId.mutation, {
        props: UpdateCurrentChatId.map
    })
);
