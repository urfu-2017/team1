/*
*   Usage:
*       const creds = new DatabaseCredentials('uri', 'token');
*       await put(creds, 'key', 'value');
*/

'use strict';

const request = require('request-promise-native');

const DbError = require('./db-error');


// parameters of HTTP request
class _RequestOptions {
    constructor(credentials, key) {
        this.uri = `${credentials.apiUri + key}/`;
        this.headers = {
            Authorization: credentials.apiToken
        };
        this.resolveWithFullResponse = true;
    }

    appendAll() {
        this.uri += 'all';

        return this;
    }

    withContentType(type = 'text/plain') {
        this.headers['Content-Type'] = type;

        return this;
    }

    withBody(body) {
        this.body = body;

        return this;
    }

    withQuery(queryObj) {
        this.qs = queryObj;

        return this;
    }
}


const _handleRequest = async request => {
    const response = await request;
    if (response.statusCode === 404) {
        return null;
    } else if (response.statusCode >= 300) {
        throw new DbError('Database request failed', response.statusCode);
    }

    return response.body;
};


exports.put = async (credentials, key, str) => {
    const options = new _RequestOptions(credentials, key)
        .withContentType()
        .withBody(str);

    return await _handleRequest(request.put(options));
};


exports.post = async (credentials, key, str) => {
    const options = new _RequestOptions(credentials, key)
        .withContentType()
        .withBody(str);

    return await _handleRequest(request.post(options));
};


exports.get = async (credentials, key) => {
    const options = new _RequestOptions(credentials, key);

    return await _handleRequest(request(options));
};


/*
Объект restrictions:
*  from     - моложе указанного таймстемпа (new Date().getTime())
*  to       - старше указанного таймстемпа (new Date().getTime())
*  sort     – упорядоченные по дате (date, по умолчанию) или по алфавиту (alph)
*  limit    – в указанном количестве (по умолчанию, Infinity)
*  offset   – с отступом от начала выборки (по умолчанию, 0)
*/
exports.getAll = async (credentials, key, restrictions = null) => {
    const options = new _RequestOptions(credentials, key)
        .withQuery(restrictions)
        .appendAll();

    return await _handleRequest(request(options));
};


exports.delete = async (credentials, key) => {
    const options = new _RequestOptions(credentials, key);

    return await _handleRequest(request.delete(options));
};
