const getUrls = require('get-urls');
const scrape = require('html-metadata');


const REQUEST_TIMEOUT = 7000;


const getMetadata = async message => {
    const urls = Array.from(getUrls(message));
    let allMetadata = {};
    let metadata = {};
    const url = urls && urls[0];
    if (url) {
        allMetadata = await scrape(url);
    }
    if (allMetadata.openGraph && allMetadata.openGraph.url) {
        metadata = allMetadata.openGraph;
    }
    else {
        metadata = allMetadata.general;
    }
    
    return {
        ogdata: metadata
    };
};


module.exports = message => new Promise((resolve, reject) => {
    setTimeout(() => reject(), REQUEST_TIMEOUT);
    getMetadata(message).then(resolve);
}).catch(() => null);
