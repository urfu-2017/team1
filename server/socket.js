const ChatManager = require('./managers/chat');

const socketHandlers = io => {
    io.on('connection', socket => {
        socket.on('room', async room => {
            try {
                await ChatManager.findChatById(room);
                socket.join(room);
            } catch (err) {
                console.log(`Wrong chat ${room}`); // eslint-disable-line no-console
            }
        });
    });
};

module.exports = { socketHandlers };
