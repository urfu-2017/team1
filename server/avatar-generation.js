'use strict';

const retricon = require('retricon-without-canvas');
const base64 = require('base64-stream');
const toString = require('stream-to-string')

const fs = require('fs');


/**
 * @param {String} strForHash
 * @param {Object} opts - (P.S width = height = pixelSize * tiles)
 * (https://www.npmjs.com/package/retricon-without-canvas)
 * @return {Stream}
 */
function generateAvatar(strForHash, opts = { pixelSize: 20, tiles: 5 }) {
    return retricon(strForHash, opts).pngStream();
}

async function encodeToBase64(stream) {
    return await toString(stream.pipe(base64.encode()));
}

function saveToDisck(stream, pathToSave = 'check.png') {
    stream.pipe(fs.createWriteStream(pathToSave));
}
