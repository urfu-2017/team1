'use strict';
const getMetadata = require('./metadata');
const emoji = require('node-emoji');
const escape = require('html-escape');
const marked = require('marked');


module.exports = async body => {
    if (body.operationName !== 'CreateMessage') {
        return null;
    }
    const { variables } = body;
    let text = variables.text;
    variables.metadata = await getMetadata(text);
    text = escape(text);
    variables.text = emoji.emojify(marked(text));
    return body;
};
