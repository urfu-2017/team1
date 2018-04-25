'use strict';

require('dotenv').config();
const express = require('express');
const proxy = require('http-proxy-middleware');
const WebSocket = require('ws');


const router = express.Router();
const expressWs = require('express-ws')(router);

router.use('/http', proxy({
    target: process.env.HTTP_API_URL,
    changeOrigin: true
}));

// // Well, unfortunately this doesn't seem to work, so it's much easier just to write it from scratch
// router.use('/ws', proxy({
//     target: process.env.WS_API_URL,
//     changeOrigin: false,
//     ws: true,
//     logLevel: 'debug',
//     headers: {
//         'Sec-WebSocket-Protocol': 'graphql-ws'
//     }
// }));

const wsProxy = (sock, req) => {
    const remote = new WebSocket(process.env.WS_API_URL, ['graphql-ws']);
    let queue = [];

    sock.on('message', msg => {
        queue.push(msg);
    });

    remote.on('open', () => {
        sock.on('message', msg => {
            remote.send(msg);
        });
        while (queue && queue.length) {
            remote.send(queue.shift());
        }
        queue = null;
    });

    remote.on('message', data => {
        sock.send(data);
    });

    remote.on('error', error => {
        sock.close();
    });

    sock.on('close', () => {
        remote.close();
    });

    sock.on('error', error => {
        console.log('Sock error');
    });
};

// router.ws('/ws', wsProxy);


module.exports = router;
