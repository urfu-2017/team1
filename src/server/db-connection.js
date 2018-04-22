'use strict';

require('dotenv').config();

const Scaphold = require('./db/scaphold');

const connection = new Scaphold(process.env.HTTP_API_URL);

module.exports = connection;
