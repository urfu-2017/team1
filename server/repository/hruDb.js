'use strict';
const request = require('request-promise-native');
// TODO: exceptions and return codes


/*
    Usage:
        const creds = new DatabaseCredentials('uri', 'token');
        await put(creds, 'key', 'value');
 */


// since there are multiple DBs with different tokens
exports.DatabaseCredentials = class DatabaseCredentials {
    constructor(...params) {
        [this.apiUri, this.apiToken] = params;
    }
};


// parameters of HTTP request
class _RequestOptions {
    constructor(credentials, key) {
        this.uri = `${credentials.apiUri + key}/`;
        this.headers = {
            Authorization: credentials.apiToken,
        };
    }

    setAll() {
        this.uri += 'all';

        return this;
    }

    setContentType(type = 'text/plain') {
        this.headers['Content-Type'] = type;

        return this;
    }

    setBody(body) {
        this.body = body;

        return this;
    }

    setQuery(queryObj) {
        this.qs = queryObj;

        return this;
    }
}


exports.put = async (credentials, key, str) => {
    const options = new _RequestOptions(credentials, key)
        .setContentType()
        .setBody(str);

    return await request.put(options);
};


exports.post = async (credentials, key, str) => {
    const options = new _RequestOptions(credentials, key)
        .setContentType()
        .setBody(str);

    return await request.post(options);
};


exports.get = async (credentials, key) => {
    const options = new _RequestOptions(credentials, key);

    return await request(options);
};


/*
Объект restrictions:
*  from     - моложе указанного таймстемпа (new Date().getTime())
*  to       - старше указанного таймстемпа (new Date().getTime())
*  sort     – упорядоченные по дате (date, по умолчанию) или по алфавиту (alph)
*  limit    – в указанном количестве (по умолчанию, Infinity)
*  offset   – с отступом от начала выборки (по умолчанию, 0)
*/
exports.getAll = async (credentials, key, restrictions) => {
    const options = new _RequestOptions(credentials, key)
        .setQuery(restrictions)
        .setAll();

    return await request(options);
};


exports.delete = async (credentials, key) => {
    const options = new _RequestOptions(credentials, key);

    return await request.delete(options);
};
