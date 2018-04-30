const { Message } = require('../../../schemas/message');
const ChatManager = require('../../../managers/chat');

const cloudinary = require('cloudinary');

class UploadController {
    static async avatar(req, res) {
        const { avatarData } = req.body;
        cloudinary.uploader.upload(avatarData, async data => {
            const { user } = req;
            user.avatar = data.secure_url;
            await user.save();
            res.status(200).send({ avatar: user.avatar });
        });
    }

    static async sendPicture(req, res) {
        console.log('sendPicture');

        const { user } = req;
        const chatId = req.params.id;
        const chat = await ChatManager.findChatById(chatId);
        if (!chat) {
            res.status(404).send({});
            return;
        }
        if (chat.contacts.find(contact => contact.userId === user._id) != null) {
            res.status(400).send({ error: 'Слыш, ты рамсы попутал? Тебе сюда нельзя' });
            return;
        }

        const { imageData } = req.body;


        console.log(user, chatId, chat, imageData);

        cloudinary.uploader.upload(imageData, async data => {
            const imageLink = data.secure_url;

            const sender = {
                userId: user._id,
                name: user.name,
                avatar: user.avatar
            };
            let message = new Message(Object.assign({}, { sender, picture: imageLink }));
            const savedChat = await ChatManager.addMessageToChat(chat, message);
            message = savedChat.messages.find(m => m._id === message._id);

            console.log(message);

            req.ioServer.in(chat._id).emit('message', {
                message
            });

            res.status(200).send(message);
        });
    }
}

module.exports = { UploadController };
