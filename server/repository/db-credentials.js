'use strict';


// since there are multiple DBs with different tokens
module.exports = class {
    constructor(apiUri, apiToken) {
        this.apiUri = apiUri;
        this.apiToken = apiToken;
    }
};
