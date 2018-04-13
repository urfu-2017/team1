'use strict';

module.exports = url => (req, res, next) => {
    req.serverURL = url;
    req.chatSocketPrefix = 'now';
    req.newChatsSocketPrefix = 'user';
    next();
};
