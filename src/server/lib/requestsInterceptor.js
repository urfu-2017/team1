'use strict';
const getMetadata = require('./metadata');


module.exports = async body => {
    if (body.operationName !== 'CreateMessage') {
        return null;
    }
    body.variables.metadata = await getMetadata(body.variables.text);
    return body;
};
