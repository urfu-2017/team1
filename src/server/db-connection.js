'use strict';

require('dotenv').config();

const Scaphold = require('./repository/scaphold')

const connection = new Scaphold('https://us-west-2.api.scaphold.io/graphql/kilogram_team1');

module.exports = connection;