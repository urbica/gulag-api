const db = require('../db');

// create table camp_statistics (
//   id serial primary key,
//   year integer,
//   prisoners_count integer,
//   location_id integer
// );

module.exports = {
  create: async (stat, locationId) => {
    const { year, prisonersCount } = stat;
    const query = `
      INSERT INTO camp_statistics(year, prisoners_count, location_id)
      VALUES($1, $2, $3)
      RETURNING id, year, prisoners_count AS "prisonersCount";
    `;
    const result = await db.query(query, [year, prisonersCount, locationId]);

    return result.rows[0];
  },

  update: async (stat) => {
    const { year, prisonersCount, id } = stat;
    const query = `
      UPDATE camp_statistics
      SET
        year=$1,
        prisoners_count=$2
      WHERE id=$3
      RETURNING id, year, prisoners_count AS "prisonersCount";
    `;
    const result = await db.query(query, [year, prisonersCount, id]);

    return result.rows[0];
  },

  delete: async (id) => {
    const query = `
      DELETE FROM camp_statistics
      WHERE camp_statistics.id = $1
      RETURNING location_id AS "campLocationId", id AS "statId";
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
};
