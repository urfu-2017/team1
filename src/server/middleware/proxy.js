'use strict';

require('dotenv').config();
const express = require('express');
const proxy = require('http-proxy-middleware');

const router = express.Router();
router.use('/http', proxy({
    target: process.env.HTTP_API_URL,
    changeOrigin: true
}));

router.use('/ws', proxy({
    target: process.env.WS_API_URL,
    changeOrigin: true,
    ws: true
}));


module.exports = router;
