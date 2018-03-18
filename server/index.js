const { parse } = require('url');

const next = require('next');
const server = require('express')();

const app = next({ dev: process.env.NODE_ENV !== 'production' });

const render = pageName => (req, res) => app.render(req, res, `/${pageName}`);
const handleRequest = (req, res) =>
    app.getRequestHandler()(req, res, parse(req.url, true));

app.prepare().then(() => {
    server
        .get('*', handleRequest)
        .listen(3000, () => console.log('Listening on http://localhost:3000'));
});