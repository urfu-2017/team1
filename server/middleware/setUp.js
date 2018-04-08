'use strict';

module.exports = () => (req, res, next) => {
    const user = req.user;
    let chats = getChats(user);
    for(let chat of chats) {
        
    }
};

function getChats(user) {
    // сходить в базу и достать
    return [
        {
            title: 'title1',
            picture: 'picture1',
            usersIds: [1, 2],
            id: 'ID_1'
        },
        {
            title: 'title2',
            picture: 'picture2',
            usersIds: [1, 2],
            id: 'ID_2'
        }];
}
