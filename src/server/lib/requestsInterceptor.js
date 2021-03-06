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

const delayForDeleteMessage = ms => new Promise(_ => setTimeout(_, ms));

const stripHtmlregex = /(<([^>]+)>)/ig;
const stripHtml = text => text.replace(stripHtmlregex, '');

module.exports = async body => {
    if (body.operationName === 'CreateMessage') {
        const { variables } = body;
        let { text, pictures } = variables;
        variables.metadata = await getMetadata(text);
        text = escape(text);
        text = emoji.emojify(marked(text));
        variables.text = text;
        variables.rawText = stripHtml(text);
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
    if (body.operationName === 'DeleteMessage') {
        const { lifeTimeInSeconds } = body.variables;
        await delayForDeleteMessage(lifeTimeInSeconds * 1000);

        return body;
    }

    return null;
};
