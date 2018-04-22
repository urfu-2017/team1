const router = require('express').Router();
const apiV1Router = require('./v1/routes');

router.use('/v1', apiV1Router);

module.exports = router;
