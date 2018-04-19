const getUrls = require('get-urls');
const scrape = require('html-metadata');

async function getMetadata(message) {
    const urls = Array.from(getUrls(message));
    let url = '';
    if (urls !== []) {
        url = urls[0];
    }

    const metadata = await scrape(url);
    return {
        'ogdata': metadata.openGraph
    };
}

module.exports = { getMetadata };