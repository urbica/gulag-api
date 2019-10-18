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
  },
  create: async (activity) => {
    const query = `
      INSERT INTO camp_activities(title, id)
      VALUES($1, $2)
      RETURNING id, title;
    `;
    // TODO: remove this hardcode
    const newActivity = await db.query(query, [activity, 14]);

    return newActivity.rows[0];
  }
};
