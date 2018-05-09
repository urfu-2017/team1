const initialState = require('../../initialState');


module.exports = (req, res, next) => {
    req.state = { ...initialState };
    next();
};
