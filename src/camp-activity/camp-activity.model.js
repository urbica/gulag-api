const db = require('../db');

// create table camp_activities (
//   id serial not null primary key,
//   title jsonb not null
// );

module.exports = {
  getAll: async () => {
    const query = `
      SELECT *
      FROM camp_activities;
    `;
    const result = await db.query(query);

    return result.rows;
  }
};
