const db = require('../db');

// create table periods (
//   id serial primary key,
//   year integer NOT NULL,
//   title jsonb NOT NULL,
//   description jsonb NOT NULL
// );

module.exports = {
  getAll: async () => {
    const query = `
      SELECT *
      FROM periods;
    `;
    const result = await db.query(query);
    return result.rows;
  },

  get: async (periodId) => {
    const query = `
      SELECT *
      FROM periods
      WHERE id = $1;
    `;
    const result = await db.query(query, [periodId]);
    return result.rows[0];
  },

  create: async ({ year, title, description }) => {
    const query = `
      INSERT INTO periods(year, title, description)
      VALUES($1, $2, $3)
      RETURNING *;
    `;
    const result = await db.query(query, [year, title, description]);
    return result.rows[0];
  },

  del: async (periodId) => {
    const query = `
      DELETE FROM periods
      WHERE id = $1;
    `;
    const result = await db.query(query, [periodId]);
    return result;
  },

  update: async ({ year, title, description }, periodId) => {
    const query = `
      UPDATE periods
      SET year=$1, title=$2, description=$3
      WHERE id = $4
      RETURNING *;
    `;
    const result = await db.query(query, [year, title, description, periodId]);
    return result.rows[0];
  },

  updateAll: async (periods) => {
    const query = `
      UPDATE periods p
      SET
        year = (upd.j->>'year')::INTEGER,
        title = upd.j->'title',
        description = upd.j->'description'
      FROM (SELECT json_array_elements ($1::JSON) j) upd
      WHERE
        p.id = (upd.j->>'id')::INTEGER
      RETURNING id, year, title, description;
    `;
    const result = await db.query(query, [periods]);
    return result.rows;
  }
};
