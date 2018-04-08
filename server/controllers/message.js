'use strict';

const dbConnection = require('../db-connection');


module.exports.saveNewMessage = (req, res) => {
    // где будет chatId?
    console.info(req.body);
    res.sendStatus(201);
};
