const db = require('../db');

// type Period = {
//   id: number,
//   year: number,
//   title: string,
//   description: string
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

module.exports = {
  getAll,
  get,
  create
};
