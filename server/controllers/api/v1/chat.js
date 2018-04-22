'use strict';


class ChatController {
    static async post(req, res) {
        console.log(req.body);
    }
}

module.exports = { ChatController };
