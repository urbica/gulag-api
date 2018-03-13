const db = require('../db');

// create table camp_activities (
//   id serial not null primary key,
//   title jsonb not null
// );

const getAll = () => db.query('SELECT * FROM camp_activities').then(result => result.rows);

module.exports = {
  getAll
};
