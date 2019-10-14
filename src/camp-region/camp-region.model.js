const db = require('../db');

// create table camp_regions (
//   id serial not null primary key,
//   title jsonb not null
// );

module.exports = {
  getAll: async () => {
    const query = `
      SELECT *
      FROM camp_regions;
    `;
    const result = await db.query(query);

    return result.rows;
  },
  update: async (region, id) => {
    const query = `
      UPDATE camp_regions
      SET title=$1
      WHERE id=$2
      RETURNING id, title;
    `;
    const result = await db.query(query, [region, id]);

    return result.rows[0];
  }
};
