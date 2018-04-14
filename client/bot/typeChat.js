const botWeatherId = '537bb8f3-d803-4331-b32f-a9ffcb4d3e50';

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
