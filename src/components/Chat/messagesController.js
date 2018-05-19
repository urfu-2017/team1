import { 
    CreateMessage, 
    CreateChatAndUserLink, 
    UpdateChatAndUserLink, 
    UpdateLastMessageChat 
} from '../../graphql/mutations';
import { GetLastMessageChatToUser } from '../../graphql/queries';

export default class MessagesController {
    constructor(apolloClient, getState) {
        this.apolloClient = apolloClient;
        this.getState = getState;

        this.isLastMessageChatInProgress = false;
    }

    async createMessage(chatId, message, update) {
        const state = this.getState();
        const messageData = await this.apolloClient.mutate({
            mutation: CreateMessage.mutation,
            variables: message,
            optimisticResponse: CreateMessage.optimisticResponse(
                    message, state.citedMessage, [...state.selectedMessages.values()]),
            update: (cache, data) => {
                this.updateChatLastMessage(chatId, data.data.createMessage);
                update(cache, data);
            }
        });
    }

    async updateChatLastMessage(chatId, message) {
        if (typeof message.id === 'string') {
            // Apollo-вские subscribtion хреново работают с вложенными структурами
            // поэтому обновляем modifiedAt чтобы subscription подхватывал измения
            this.apolloClient.mutate({
                mutation: UpdateLastMessageChat.mutation,
                variables: { messageId: message.id, chatId, modifiedAt: new Date() }
            })
        }
    }

    async updateLastMessageChatToUser(userId, chatId, message) {
        if (!this.isUpdateLastMessageChatUpdateInProgress) {
            this.isUpdateLastMessageChatUpdateInProgress = true;
            const data = await this.apolloClient.query({
                query: GetLastMessageChatToUser.query(userId, chatId),
                variables: { userId, chatId }
            });
            const lastMessageChatToUser = GetLastMessageChatToUser.map(data).allLastMessageChatToUsers[0];
            let mutationVariables = { userId, chatId, messageId: message.id };
            if (lastMessageChatToUser) {
                mutationVariables = { ...mutationVariables, id: lastMessageChatToUser.id };
            }
            this.apolloClient.mutate({
                mutation: (lastMessageChatToUser == null ? CreateChatAndUserLink : UpdateChatAndUserLink).mutation,
                variables: mutationVariables
            }).finally(() => {
                this.isUpdateLastMessageChatUpdateInProgress = false;
            });
        }
    }
}
