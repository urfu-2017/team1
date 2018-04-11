'use strict';

const retricon = require('retricon-without-canvas');
const base64 = require('base64-stream');
const streamToString = require('stream-to-string');
const streamToPromise = require('stream-to-promise');

const fs = require('fs');
const path = require('path');


/**
 * @param {String} strForHash - произвольная строка
 * @param {Object} opts - см библиотеку retricon
 * @return {Stream}
 */
function generateAvatar(strForHash, opts) {
    return retricon(strForHash, opts).pngStream();
}

/**
 * @param {Stream} stream
 * @return {Promise}
 */
function encodeToBase64(stream) {
    return streamToString(stream.pipe(base64.encode()));
}

/**
 * @param {Stream} stream
 * @param {String} pathToSave
 * @returns {Promise}
 */
function saveToDisk(stream, pathToSave) {
    const resultPath = path.resolve(__dirname, pathToSave);

    return streamToPromise(stream.pipe(fs.createWriteStream(resultPath))).then(() => resultPath);
}

/**
 * @param {String} usedId
 * @param {Object} opts - необязательный
 * (https://www.npmjs.com/package/retricon-without-canvas)
 * @return {Promise}
 */
module.exports.getPictureInBase64 = (usedId, opts = retricon.style.github) => {
    const stream = generateAvatar(usedId, opts);

    return encodeToBase64(stream);
};

/**
 * @param {String} usedId
 * @param {Object} opts - необязательный
 * (P.S width = height = pixelSize * tiles)
 * (см https://www.npmjs.com/package/retricon-without-canvas)
 * @param {String} pathToSave - (абсолютный/относительный).png
 * @return {Promise}
 */
module.exports.getPathToGeneratedPicture = (pathToSave, usedId, opts = retricon.style.github) => {
    const stream = generateAvatar(usedId, opts);

    return saveToDisk(stream, pathToSave);
};
