export default function makeRequestOptions(options) {
    return Object.assign({}, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    }, options);
}
