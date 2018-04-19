const { parse } = require('url');

const next = require('next');
const server = require('express')();


function main() {
    const app = next({ dir: './src', dev: process.env.NODE_ENV !== 'production' });

    const render = pageName => (req, res) => app.render(req, res, `/${pageName}`);
    const handleRequest = (req, res) =>
        app.getRequestHandler()(req, res, parse(req.url, true));

    server.use((req,res,nextMiddleware) => {

        req.scapholdUrl = 'us-west-2.api.scaphold.io/graphql/kilogram-test';

        nextMiddleware();
    });   

    app.prepare().then(() => {
        server
            .get('*', handleRequest)
            .listen(3000, () => console.log('Listening on http://localhost:3000'));
    });
}


main();
