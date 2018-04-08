'use strict';

module.exports.saveNewMessage = (req, res) => {
    console.info(req.body);
    res.sendStatus(201);
};
