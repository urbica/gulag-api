const db = require('../db');

// create table camp_locations (
//   id serial primary key,
//   geom jsonb,
//   description jsonb,
//   camp_id integer
// );

module.exports = {
  create: async (location, campId) => {
    const query = `
      INSERT INTO camp_locations(geom, description, camp_id)
      VALUES($1, $2, $3)
      RETURNING id, geom AS geometry, description;
    `;
    const result = await db.query(query, [location.geometry, location.description, campId]);

    return result.rows[0];
  },

  update: async (location) => {
    const { id, geometry, description } = location;
    const query = `
      UPDATE camp_locations
      SET
        geom=$1,
        description=$2
      WHERE id=$3
      RETURNING id, geom AS geometry, description;
    `;
    const updatedLocation = await db.query(query, [geometry, description, id]);

    return updatedLocation.rows[0];
  }
};
