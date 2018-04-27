'use strict';

module.exports = body => {
    if (body.operationName !== 'CreateMessage') {
        return null;
    }
    // body.variables.text += ' ✓';
    return body;
};
