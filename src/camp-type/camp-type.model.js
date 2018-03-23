const db = require('../db');

// create table camp_types (
//   id serial not null primary key,
//   title jsonb not null,
//   description jsonb not null
// );

module.exports = {
  getAll: async () => {
    const query = `
      SELECT *
      FROM camp_types;
    `;
    const result = await db.query(query);

    return result.rows;
  }
};
