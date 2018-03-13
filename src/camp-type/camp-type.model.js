const db = require('../db');

// create table camp_types (
//   id serial not null primary key,
//   title jsonb not null,
//   description jsonb not null
// );

const getAll = () => db.query('SELECT * FROM camp_types').then(result => result.rows);

module.exports = {
  getAll
};
