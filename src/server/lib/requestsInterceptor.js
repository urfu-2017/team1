'use strict';

const getMetadata = require('./metadata');
const emoji = require('node-emoji');
const escape = require('html-escape');
const marked = require('marked');
const cloudinary = require('cloudinary');

const savePictureOnCloudinary = async (srcInBase64) => {
    const promise = new Promise(resolve => {
        cloudinary.uploader.upload(srcInBase64, data => {
            resolve(data);
        });
    });
    const data = await promise;

    return data.secure_url;
};


module.exports = async body => {
    if (body.operationName === 'CreateMessage') {
        const { variables } = body;
        let { text, pictures } = variables;
        variables.metadata = await getMetadata(text);
        text = escape(text);
        variables.text = emoji.emojify(marked(text));
        if (pictures) {
            pictures[0] = await savePictureOnCloudinary(pictures[0]);
        }

        return body;
    }
    if (body.operationName === 'UpdateUserAvatar') {
        const { variables } = body;
        variables.avatarUrl = await savePictureOnCloudinary(variables.avatarUrl);
        return body;
    }
    if (body.operationName === 'UpdateChatPicture') {
        const { variables } = body;
        variables.picture = await savePictureOnCloudinary(variables.picture);
        return body;
    }

    return null;
};
