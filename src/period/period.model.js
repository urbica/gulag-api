const db = require('../db');

// type Period = {
//   id: number,
//   year: number,
//   title: json,
//   description: json
// }

const getAll = () => db.query('SELECT * FROM periods').then(result => result.rows);

const get = periodId =>
  db.query('SELECT * FROM periods WHERE id = $1', [periodId]).then(result => result.rows[0]);

const create = period =>
  db
    .query('INSERT INTO periods(year, title, description) VALUES($1, $2, $3) RETURNING *', [
      period.year,
      period.title,
      period.description
    ])
    .then(result => result.rows[0]);

const del = periodId =>
  db.query('DELETE FROM periods WHERE id = $1', [periodId]).then(result => result);

const update = (periodId, newPeriod) =>
  db
    .query('UPDATE periods SET year=$1, title=$2, description=$3 WHERE id = $4 RETURNING *', [
      newPeriod.year,
      newPeriod.title,
      newPeriod.description,
      periodId
    ])
    .then(result => result.rows[0]);

module.exports = {
  getAll,
  get,
  create,
  del,
  update
};
