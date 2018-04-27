export default function makeRequestOptions(options) {
    if (options.body) {
        options.body = JSON.stringify(options.body);
    }
    return Object.assign({}, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }, options);
}
