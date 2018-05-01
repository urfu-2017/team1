const { Message } = require('../../../schemas/message');
const ChatManager = require('../../../managers/chat');
const { getMetadata } = require('../../../lib/metadata');

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
        const { user } = req;
        const { imageData, chatId } = req.body;
        const chat = await ChatManager.findChatById(chatId);
        if (!chat) {
            res.status(404).send({});
            return;
        }
        if (chat.contacts.find(contact => contact.userId === user._id) != null) {
            res.status(400).send({ error: 'Слыш, ты рамсы попутал? Тебе сюда нельзя' });
            return;
        }
        cloudinary.uploader.upload(imageData, async data => {
            const imageLink = data.secure_url;
            const sender = {
                userId: user._id,
                name: user.name,
                avatar: user.avatar
            };
            const stubMessage = '(Неудачная попытка кинуть вместо картинки фигню)';
            let message = new Message(Object.assign(
                {},
                { sender, picture: imageLink, message: stubMessage, metadata: await getMetadata('stub') }
            ));
            const savedChat = await ChatManager.addMessageToChat(chat, message);
            message = savedChat.messages.find(m => m._id === message._id);

            req.ioServer.in(savedChat._id).emit('message', {
                message
            });

            res.status(200).send(message);
        });
    }
}

module.exports = { UploadController };
