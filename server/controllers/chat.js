'use strict';

const Chat = require('../model/chat');
const dbConnection = require('../db-connection');

module.exports.saveChat = socket => async (req, res) => {
    const { title, usersIds, creatorId } = req.body.chat;
    const chat = Chat.create(title, usersIds, creatorId)
    
    try {
        await dbConnection.saveChat(chat);
        console.log('успех');
        res.sendStatus(201);
    } catch (error) {
        console.log('ошибка');
        res.sendStatus(500);
        return;
    }

    //это сообщеие появится в чате через сокет
    socket.emit('user', {
        chat: {
            title: 'Chat1',
            picture: 'picture1',
            usersIds: [],
            id: `${Math.random()}-8812-4f37-9221-0176447b9ee1`,
            messages: [],
            lastMessage: {
                content: {
                    text: 'message text',
                    attachments: [],
                    pictures: []
                },
                sender: {
                    name: 'user1',
                    avatar: 'path-to-avatar.jpeg',
                    id: 'ALPHANUMERIC_ID'
                }
            }
        }
    });
    
    //это не появится, но из за того что creatorId и currentUserId совпадают
    //я явным образом сохраняю на клиенте, сообщение которое он создает
    socket.emit('user', {
        chat
    }); 
};
