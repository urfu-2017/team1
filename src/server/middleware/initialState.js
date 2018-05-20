require('dotenv').config();
const initialState = require('../../initialState');


initialState.localState.serverUrl = process.env.URL;


module.exports = (req, res, next) => {
    req.state = JSON.parse(JSON.stringify(initialState));
    next();
};
