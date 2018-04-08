'use strict';

require('dotenv').config();

const HruRepository = require('./model/hru-repository');
const DbCredentials = require('./model/hru-requester/db-credentials');

const credentials = new DbCredentials(process.env.HRUDB_URL, process.env.HRUDB_TOKEN);
const connection = new HruRepository(credentials);

module.exports = connection;
