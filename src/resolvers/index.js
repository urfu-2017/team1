export default {
    Mutation: {
        updateCurrentChatId: (_, { id }, { cache }) => {
            const data = {
                currentChatId: id
            };
            cache.writeData({ data });
            return data;
        }
    }
};
