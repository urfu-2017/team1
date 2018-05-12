import {CreateMessage} from '../../graphql/mutations';


export default class MessagesController {
    constructor(apolloClient, getState) {
        this.apolloClient = apolloClient;
        this.getState = getState;
    }

    async createMessage(message, update) {
        const state = this.getState();
        await this.apolloClient.mutate({
            mutation: CreateMessage.mutation,
            variables: message,
            optimisticResponse: CreateMessage.optimisticResponse(
                    message, state.citedMessage, [...state.selectedMessages.values()]),
            update
        });
    }
}
