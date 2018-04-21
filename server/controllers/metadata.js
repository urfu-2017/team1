const getUrls = require('get-urls');
const scrape = require('html-metadata');

async function getMetadata(message) {
    const urls = Array.from(getUrls(message));
    let metadata = {};

    const url = urls && urls[0];
    if (url) {
        metadata = await scrape(url);
    }

    return {
        ogdata: metadata && metadata.openGraph
    };
}

module.exports = { getMetadata };
