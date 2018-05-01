'use strict';

const getMetadata = require('./metadata');
const emoji = require('node-emoji');
const escape = require('html-escape');
const marked = require('marked');
const cloudinary = require('cloudinary');


module.exports = async body => {
    if (body.operationName === 'CreateMessage') {
        const { variables } = body;
        let text = variables.text;
        variables.metadata = await getMetadata(text);
        text = escape(text);
        variables.text = emoji.emojify(marked(text));
        return body;
    }
    if (body.operationName === 'UpdateUserAvatar') {
        const { variables } = body;
        let avatarData = variables.avatarUrl;
        const promise = new Promise(resolve => {
            cloudinary.uploader.upload(avatarData, data => {
                resolve(data);
            });
        });
        const data = await promise;
        variables.avatarUrl = data.secure_url;
        return body;
    }

    return null;
};
