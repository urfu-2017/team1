'use strict';

require('dotenv').config({ path: '../.env' });

const DbCredentials = require('./model/hru-requester/db-credentials');
const HruRepository = require('./model/hru-repository');
const HruRequester = require('./model/hru-requester/hrudb-rest');
const User = require('./model/user');
const Chat = require('./model/chat');
const Message = require('./model/message');

const creds = new DbCredentials(process.env.HRUDB_URL, process.env.HRUDB_TOKEN);
const db = new HruRepository(creds);


const saveEntities = async ({ users, chats, messages }) => {
    const promises = [
        ...users.map(u => db.saveUser(u)),
        ...chats.map(c => db.saveChat(c)),
        ...messages.map(msgInfo => db.saveMessage(msgInfo.message, msgInfo.chatId))
    ];
    await Promise.all(promises);
};


const clearDb = async ({ users, chats, messages }) => {
    const promises = [
        ...users.map(u => HruRequester.delete(creds, `user_${u.id}`)),
        ...chats.map(c => HruRequester.delete(creds, `chat_${c.id}`)),
        ...messages.map(msgInfo => HruRequester.delete(creds, `messages_${msgInfo.chatId}`))
    ];
    await Promise.all(promises);
};


// fake objects, wrong creation pattern

// Создаём фейковые объекты
const user1 = new User({ name: 'one', avatar: '', id: 10, chatsIds: [100, 101] });
const user2 = new User({ name: 'two', avatar: '', id: 11, chatsIds: [100, 101] });

const chat1 = new Chat({ title: 'chat1', id: 100, usersIds: [10, 11] });
const chat2 = new Chat({ title: 'chat2', id: 101, usersIds: [10, 11] });

const message1 = new Message({ content: 'message1', senderId: 10 });
const message2 = new Message({ content: 'message2', senderId: 11 });

// Складываем их в структуру
const entities = {
    users: [user1, user2],
    chats: [chat1, chat2],
    messages: [
        {
            message: message1,
            chatId: chat1.id
        },
        {
            message: message2,
            chatId: chat1.id
        }
    ]
};


const main = async () => {
    // Сохраняем в бд
    await saveEntities(entities);

    // Делаем свои дела
    const user = await db.getUser(user1.id);
    const chats = await db.getUserChats(user.id);
    const messages = await db.getMessages(chats[0].id);
    console.log(messages);

    // Очищаем бд
    await clearDb(entities);
};

main()
    .then(() => console.log('Done.'))
    .catch(() => console.log('Finished with error :('));
