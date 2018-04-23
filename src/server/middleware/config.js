'use strict';


module.exports = (req, res, next) => {
    req.state = {};
    req.httpUrl = 'http://localhost:3000/proxy/http';
    req.wsUrl = 'http://localhost:3000/proxy/ws';
    next();
};
