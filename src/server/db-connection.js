'use strict';

require('dotenv').config();

const Scaphold = require('./db/scaphold');

const connection = new Scaphold('https://' + process.env.API_URL);

module.exports = connection;
