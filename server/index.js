const { parse } = require('url');

const next = require('next');
const server = require('express')();

const app = next({ dev: process.env.NODE_ENV !== 'production' });

const render = pageName => (req, res) => app.render(req, res, `/${pageName}`);
const handleRequest = (req, res) =>
  app.getRequestHandler()(req, res, parse(req.url, true));

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  server
    .get('*', handleRequest)
    .listen(port, () => console.log(`Listening on http://localhost:${port}`));
});
