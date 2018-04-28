'use strict';

require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const fetch = require('isomorphic-unfetch');

const router = express.Router();


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


module.exports = requestsInterceptor => {
    // Turns out that the most JS libs are just plain bad...
    // Hence the own simple implementation
    const proxy = async (req, res) => {
        // TODO: use streams
        let body = await requestsInterceptor(req.body) || req.body;
        const resp = await fetch(process.env.HTTP_API_URL, {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const json = await resp.json();
        res.json(json);
    };

    router.use('/http', proxy);

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

// router.ws('/ws', wsProxy);

    return router;
};

