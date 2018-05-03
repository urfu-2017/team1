const getUrls = require('get-urls');
const scrape = require('html-metadata');


const REQUEST_TIMEOUT = 7000;


const getMetadata = async message => {
    const urls = Array.from(getUrls(message));
    let metadata = {};

    const url = urls && urls[0];
    if (url) {
        metadata = await scrape(url);
    }

    return {
        ogdata: metadata && metadata.openGraph
    };
};


module.exports = message => new Promise((resolve, reject) => {
    setTimeout(() => reject(), REQUEST_TIMEOUT);
    getMetadata(message).then(resolve);
}).catch(() => null);
