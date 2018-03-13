const db = require('../db');

// create table camp_regions (
//   id serial not null primary key,
//   title jsonb not null
// );

const getAll = () => db.query('SELECT * FROM camp_regions').then(result => result.rows);

module.exports = {
  getAll
};
