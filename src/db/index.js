const { Pool } = require('pg');
const bluebird = require('bluebird');

const db = new Pool({
  poolSize: 20,
  Promise: bluebird
});

module.exports = db;
