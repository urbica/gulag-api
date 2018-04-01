const db = require('../db');

// create table camp_locations (
//   id serial primary key,
//   geom jsonb,
//   description jsonb,
//   type_id integer,
//   activity_id integer,
//   region_id integer,
//   camp_id integer
// );

module.exports = {
  create: async (location, campId) => {
    const query = `
      INSERT INTO camp_locations(geom, description, type_id, activity_id, region_id, camp_id)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await db.query(query, [
      location.geometry,
      location.properties.description,
      location.properties.type_id,
      location.properties.activity_id,
      location.properties.region_id,
      campId
    ]);

    return result.rows[0];
  },
  update: async locations => locations
};
