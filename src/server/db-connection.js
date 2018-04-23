'use strict';

require('dotenv').config();

const GraphqlApi = require('./db/graphqlApi');

const connection = new GraphqlApi(process.env.HTTP_API_URL);

module.exports = connection;
