const botWeatherId = '92098d13-6542-4c72-83df-033468ed235b';

export default async function isChatWithWeatherBot(chatId) {
    const url = `api/rest/chats/${chatId}`;
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
        credentials: 'same-origin'
    };

    return fetch(url, options)
        .then(response => response.json())
        // .then(chat => {
        //     console.log(`id: ${chat.usersIds}`);
        //
        //     return chat;
        // })
        .then(chat => chat.usersIds.includes(botWeatherId));
}
